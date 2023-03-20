import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { JokeService } from '../../shared/services/joke.service';
import { JokeInterface } from '../../shared/interfaces/joke.interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.less'],
})
export class JokeComponent implements OnInit, OnDestroy {
  id?: string;
  joke?: JokeInterface;

  private destroyed: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jokeService: JokeService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.destroyed))
      .subscribe((params: Params) => {
        this.id = params['id'];
      });
    this.jokeService.currentJoke$
      .pipe(takeUntil(this.destroyed))
      .subscribe((joke) => {
        this.joke = joke;
      });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
