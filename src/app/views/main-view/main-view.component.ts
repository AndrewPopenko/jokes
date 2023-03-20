import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JokeService } from '../../shared/services/joke.service';
import { JokeInterface } from '../../shared/interfaces/joke.interface';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NewJokeDlgComponent } from '../../components/new-joke-dlg/new-joke-dlg.component';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.less'],
})
export class MainViewComponent implements OnInit {
  id?: string;
  joke?: JokeInterface;
  isListView = false;
  showDlg = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jokeService: JokeService,
    private notifyService: NotificationService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      this.isListView = event.toString().includes('list');
    });

    this.jokeService.nextJoke();

    this.jokeService.currentJoke$.subscribe((joke) => {
      this.joke = joke;
      this.router.navigate([`joke/${this.joke?.id}`], {
        relativeTo: this.route,
      });
    });

    this.notifyService.dlgContext$.subscribe(
      (content) => (this.showDlg = content.showDlg)
    );
  }

  add(): void {
    const dialogRef: MatDialogRef<NewJokeDlgComponent> = this.dialog.open(
      NewJokeDlgComponent,
      { data: '' }
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== 'closed') {
        this.notifyService.dlgContext$.next({
          showDlg: true,
          text: 'Żart został pomyślnie dodany.',
          title: 'Sukces',
        });
      }
    });
  }

  nextJoke(): void {
    this.jokeService.nextJoke();
    this.router.navigate([`joke/${this.joke?.id}`], { relativeTo: this.route });
  }
}
