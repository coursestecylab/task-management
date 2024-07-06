import { TaskStatus } from '../enums/task-status.enum';

export class GetTasksFilterDto {
  status?: TaskStatus;
  search?: string;
}
