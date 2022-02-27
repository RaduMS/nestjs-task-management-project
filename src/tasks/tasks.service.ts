import {Injectable, NotFoundException} from '@nestjs/common';
import { TaskStatus } from "./tasks-status.enum";
import {CreateTaskDto} from "./dto/create-task.dto";
import {GetTaskFilterDto} from "./dto/get-task-filter.dto";
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';

@Injectable()
export class TasksService {

    constructor(
      @InjectRepository(TasksRepository)
      private tasksRepository: TasksRepository
    ) {}

    getTasks(filterDto: GetTaskFilterDto): Promise<TaskEntity[]> {
        return this.tasksRepository.getTasks(filterDto)
    }

    async getTaskByID(id: string): Promise<TaskEntity> {
        const found = await  this.tasksRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        return found;
    }

    createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
        return this.tasksRepository.createTask(createTaskDto)
    }

    async deleteTask(id: string): Promise<void> {
        const result = await this.tasksRepository.delete([id]);

        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID "${id}" was not found`)
        }      console.log(result);
    }

    async updateStatus(id: string, status: TaskStatus): Promise<TaskEntity> {
        const task = await this.getTaskByID(id);

        task.status = status;

        await this.tasksRepository.save(task);

        return task
    }
}
