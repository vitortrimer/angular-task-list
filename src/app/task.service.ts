import { Injectable } from '@angular/core';
import { Task } from './model/task.model';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqService: WebRequestService) { }

  //Lists actions
  createList(title:string) {
    return this.webReqService.post('lists', { title });
  }

  getLists() {
    return this.webReqService.get('lists');
  }

  //Tasks actions
  createTask(title: string, listId: string) {
    return this.webReqService.post(`lists/${listId}/tasks`, { title });
  }

  getTasks(listId: string) {
    return this.webReqService.get(`lists/${listId}/tasks`);
  }

  completeTask(task: Task) {
    return this.webReqService.patch(`lists/${task._listId}/tasks/${task._id}`, { completed: !task.completed })
  }
}
