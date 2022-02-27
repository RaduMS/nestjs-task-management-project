import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {TasksService} from "./tasks.service";
import {CreateTaskDto} from "./dto/create-task.dto";
import {GetTaskFilterDto} from "./dto/get-task-filter.dto";
import {UpdateTaskStatusDto} from "./dto/update-task-status.dto";
import { TaskEntity } from './task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {
    }

    @Get()
    getTasks(@Query() filterDto: GetTaskFilterDto): Promise<TaskEntity[]> {
        console.log('get all tasks');
        return this.tasksService.getTasks(filterDto);
    }

    @Get('/:id')
    getTaskByID(@Param('id') id: string): Promise<TaskEntity> {
        console.log('get task by id');
        return this.tasksService.getTaskByID(id);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<TaskEntity> {
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): Promise<void> {
        return this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body() updateTaskStatusDtp: UpdateTaskStatusDto
    ): Promise<TaskEntity> {
        console.log(id);
        console.log(updateTaskStatusDtp.status);
        return this.tasksService.updateStatus(id, updateTaskStatusDtp.status);
    }
}
