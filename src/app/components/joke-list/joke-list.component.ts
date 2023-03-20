import { Component, OnDestroy, OnInit } from '@angular/core';
import { JokeService } from '../../shared/services/joke.service';
import { JokeInterface } from '../../shared/interfaces/joke.interface';
import { CategoryService } from '../../shared/services/category.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDlgComponent } from '../confirm-dlg/confirm-dlg.component';
import { NotificationService } from '../../shared/services/notification.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-joke-list',
  templateUrl: './joke-list.component.html',
  styleUrls: ['./joke-list.component.less'],
})
export class JokeListComponent implements OnInit, OnDestroy {
  allJokes: JokeInterface[] = [];

  private destroyed: Subject<void> = new Subject<void>();

  constructor(
    private jokeService: JokeService,
    private categoryService: CategoryService,
    private notifyService: NotificationService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.jokeService.userJokes$
      .pipe(takeUntil(this.destroyed))
      .subscribe((jokes) => (this.allJokes = jokes));
  }

  deleteJoke(id = ''): void {
    const dialogRef: MatDialogRef<ConfirmDlgComponent> = this.dialog.open(
      ConfirmDlgComponent,
      { data: '' }
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirmed') {
        this.jokeService.deleteJokeById(id);
        this.notifyService.dlgContext$.next({
          showDlg: true,
          title: 'Sukces',
          text: 'Żart został pomyślnie usunięty.',
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
