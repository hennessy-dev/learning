import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { Task, TasksService } from './tasks.service';

@Controller('tasks')
export class TaskController {
  constructor(private tasksService: TasksService) {}

  @Get('/:id')
  getTasks(@Param('id') id: any, @Query() query: any) {
    console.log(id);
    console.log(query);
    return this.tasksService.getTasks();
  }

  @Post('/')
  createTasks(@Body() task: Task) {
    return 'Creando... ' + this.tasksService.createTask(task);
  }

  @Put('/')
  updateTasks() {
    return 'Actualizando Tareas';
  }

  @Patch('/')
  updateTaskStatus() {
    return 'Parchese';
  }

  @Delete('/')
  deleteTasks() {
    return 'Borrando Tareas';
  }
}
