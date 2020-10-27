import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  taskId: string;
  listId: string;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        if(params.listId && params.taskId) {
          this.listId = params.listId;
          this.taskId = params.taskId;
        } else {
          this.listId = undefined
          this.taskId = undefined
        }
      }
    )
  }

  updateTaskClick(title: string) {
    this.taskService.updateTask(this.listId, this.taskId, title).subscribe(() => {
      this.router.navigateByUrl(`/lists/${this.listId}`);
    })
  }
}
