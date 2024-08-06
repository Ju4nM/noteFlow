import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TaskService {

  constructor (
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    private userService: UserService
  ) {}

  async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {

    const user: User = await this.userService.findOne(userId);
    const newTask: Task = this.taskRepository.create({ ...createTaskDto, user });

    const taskCreated: Task = await this.taskRepository.save(newTask);
    delete taskCreated.user;
    return taskCreated;
  }

  async findAll(userId: string): Promise<Task[]> {
    const tasks: Task[] = await this.taskRepository.find({
      where: {
        user: {
          id: userId
        }
      },
      order: {
        createdAt: "DESC"
      }
    });
    
    return tasks;
  }

  async findOne(taskId: string, userId: string): Promise<Task> {
    const task: Task = await this.taskRepository.findOne({
      where: {
        id: taskId,
        user: {
          id: userId
        }
      }
    });

    if (!task) throw new HttpException("Tarea no encontrada", HttpStatus.NOT_FOUND);

    return task;
  }

  async update(taskId: string, updateTaskDto: UpdateTaskDto, userId: string): Promise<Task> {
    const target: Task = await this.findOne(taskId, userId);
    const taskUpdated = this.taskRepository.merge(target, updateTaskDto);

    return await this.taskRepository.save(taskUpdated);
  }

  async remove(taskId: string, userId: string): Promise<Task> {
    const target: Task = await this.findOne(taskId, userId);
    await this.taskRepository.remove(target);
    return target;
  }

  async toggleComplete(taskId: string, userId: string): Promise<Task> {
    const target: Task = await this.findOne(taskId, userId);
    target.isCompleted = !target.isCompleted;
    
    return await this.taskRepository.save(target);
  }
}
