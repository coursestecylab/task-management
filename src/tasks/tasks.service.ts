import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './enums/task-status.enum';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TasksRepository) {}

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const found = await this.taskRepository.repository.findOne({
      where: { id, user },
    });

    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return found;
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async updateTaskStatus(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const result = await this.taskRepository.repository.update(id, {
      status,
      user,
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    const updateTask = await this.taskRepository.repository.findOneBy({ id });

    if (!updateTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return updateTask;
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const result = await this.taskRepository.repository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}
