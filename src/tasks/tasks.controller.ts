import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {TasksService} from "./tasks.service";
import {TasksModel, TaskStatus} from "./tasks.model";
import {CreateTaskDto} from "./dto/create-task.dto";
import {GetTaskFilterDto} from "./dto/get-task-filter.dto";
import {UpdateTaskStatusDto} from "./dto/update-task-status.dto";

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {
    }

    @Get()
    getAllTasks(@Query() filterDto: GetTaskFilterDto): TasksModel[] {
        if (Object.keys(filterDto).length) {
            return this.tasksService.getTasksWithFilters(filterDto);
        } else {
            return this.tasksService.getAllTasks();
        }
    }

    @Get('/:id')
    getTaskByID(@Param('id') id: string) {
        return this.tasksService.getTaskByID(id);
    }

    // implementation without DTO
    // @Post()
    // createTask(@Body('title') title: string, @Body('description') description: string): TasksModel {
    //     return this.tasksService.createTask(title, description);
    // }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): TasksModel {
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string) {
        return this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body() updateTaskStatusDtp: UpdateTaskStatusDto
    ): TasksModel {
        console.log(id);
        console.log(updateTaskStatusDtp.status);
        return this.tasksService.updateStatus(id, updateTaskStatusDtp.status);
    }
}
