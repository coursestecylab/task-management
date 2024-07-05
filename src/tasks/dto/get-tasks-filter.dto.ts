import { TaskStatus } from '../task.model';

// Reto
export class GetTasksFilterDto {
  status?: TaskStatus;
  search?: string;
}
