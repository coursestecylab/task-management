import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './enums/task-status.enum';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TasksRepository) {}

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto);
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepository.repository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  create(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async updateTask(id: string, status: TaskStatus): Promise<Task> {
    const result = await this.taskRepository.repository.update(id, { status });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    const updateTask = await this.taskRepository.repository.findOneBy({ id });

    if (!updateTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return updateTask;
  }

  async remove(id: string): Promise<void> {
    const result = await this.taskRepository.repository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}
