import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Request } from 'express';
import { Task } from './entities/task.entity';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Req() req: Request): Promise<Task> {
    const { userId } = req.user as any;
    return await this.taskService.create(createTaskDto, userId);
  }

  @Get()
  async findAll(@Req() req: Request): Promise<Task[]> {
    const { userId } = req.user as any;
    return await this.taskService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: Request): Promise<Task> {
    const { userId } = req.user as any;
    return await this.taskService.findOne(id, userId);
  }

  @Patch('complete/:id')
  async toggleComplete(@Param('id') id: string, @Req() req: Request): Promise<Task> {
    const { userId } = req.user as any;
    return await this.taskService.toggleComplete(id, userId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @Req() req: Request): Promise<Task> {
    const { userId } = req.user as any;
    return await this.taskService.update(id, updateTaskDto, userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request): Promise<Task> {
    const { userId } = req.user as any;
    return await this.taskService.remove(id, userId);
  }
}
