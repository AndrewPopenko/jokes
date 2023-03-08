import { Component, OnInit } from '@angular/core';
import { JokeService } from "../../shared/services/joke.service";
import { JokeInterface } from "../../shared/interfaces/joke.interface";
import { CategoryService } from "../../shared/services/category.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ConfirmDlgComponent } from "../confirm-dlg/confirm-dlg.component";
import { NotificationService } from "../../shared/services/notification.service";

@Component({
  selector: 'app-joke-list',
  templateUrl: './joke-list.component.html',
  styleUrls: ['./joke-list.component.less']
})
export class JokeListComponent implements OnInit {
  allJokes: JokeInterface[] = [];

  constructor(
    private jokeService: JokeService,
    private categoryService: CategoryService,
    private notifyService: NotificationService,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.jokeService.userJokes$.subscribe(jokes => this.allJokes = jokes);
  }

  getCategory(categoryId: string = ''): string {
    return this.categoryService.getCategoryById(categoryId)?.name;
  }

  deleteJoke(id: string = ''): void {
    const dialogRef: MatDialogRef<ConfirmDlgComponent> = this.dialog.open(ConfirmDlgComponent, { data: '' });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirmed') {
        this.jokeService.deleteJokeById(id);
        this.notifyService.dlgContext$.next({
          showDlg: true,
          title: 'Sukces',
          text: 'Żart został pomyślnie usunięty.'
        });
      }
    })
  }
}
