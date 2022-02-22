import {Injectable} from '@nestjs/common';
import {TasksModel, TaskStatus} from "./tasks.model";
import { v4 as uuid } from "uuid";
import {CreateTaskDto} from "./dto/create-task.dto";
import {GetTaskFilterDto} from "./dto/get-task-filter.dto";

@Injectable()
export class TasksService {
    private tasks: TasksModel[] = [];

    public getAllTasks(): TasksModel[] {
        return this.tasks;
    }

    public getTaskByID(id: string): TasksModel {
        return this.tasks.find(task => task.id === id);
    }

    public getTasksWithFilters(filtersDto: GetTaskFilterDto): TasksModel[] {
        const {status, search} = filtersDto;
        let tasks = this.getAllTasks();

        if (status) {
            tasks = tasks.filter(task => task.status === status.toUpperCase());
        }

        if (search) {
            tasks = tasks.filter(task => {
                if (task.title.toLowerCase().includes(search.toLowerCase()) || task.description.toLowerCase().includes(search.toLowerCase())) {
                    return true;
                }

                return false;
            })
        }

        return tasks;
    }

    public createTask(createTaskDto: CreateTaskDto): TasksModel {
        const {title, description} = createTaskDto;

        const task: TasksModel = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(task);

        return task;
    }

    public deleteTask(id: string) {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

    public updateStatus(id: string, status: TaskStatus) {
        const task = this.getTaskByID(id);
        task.status = status;
        return task
    }
}
