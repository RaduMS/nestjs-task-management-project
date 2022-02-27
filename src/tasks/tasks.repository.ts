import { EntityRepository, Repository } from 'typeorm';
import { TaskEntity } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './tasks-status.enum';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@EntityRepository(TaskEntity)
export class TasksRepository extends Repository<TaskEntity>{

  async getTasks(filterDto: GetTaskFilterDto): Promise<TaskEntity[]> {
    const query = this.createQueryBuilder('task');
    const { status , search } = filterDto;

    if (status) {
      query.andWhere('task.status = :status', {status})
    }

    if (search) {
      query.andWhere('LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)', {
        search: `%${search}%`
      })
    }

    const tasks = await query.getMany();

    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    const {title, description} = createTaskDto;

    const task: TaskEntity = this.create({
      title,
      description,
      status: TaskStatus.OPEN
    });

    await this.save(task);

    return task;
  }

}
