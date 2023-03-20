import { Injectable } from '@angular/core';
import { JokeInterface, jokes } from '../interfaces/joke.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class JokeService {
  currentJoke$: BehaviorSubject<JokeInterface> =
    new BehaviorSubject<JokeInterface>({
      id: '',
      content: '',
      category: '',
    });
  allJokes$: BehaviorSubject<JokeInterface[]> = new BehaviorSubject<
    JokeInterface[]
  >([]);
  userJokes$: BehaviorSubject<JokeInterface[]> = new BehaviorSubject<
    JokeInterface[]
  >([]);
  private currentJokeIndex = -1;

  constructor() {
    this.updateObservables();
  }

  getUserJokes(): JokeInterface[] {
    return jokes.filter((item) => item.isUserJoke);
  }

  nextJoke() {
    if (this.currentJokeIndex >= jokes.length - 1) {
      this.currentJokeIndex = -1;
    }

    this.currentJoke$.next(jokes[++this.currentJokeIndex]);
  }

  saveJoke(joke: JokeInterface): void {
    joke.id = this.generateGuid();
    joke.isUserJoke = true;
    jokes.push(joke);
    this.updateObservables();
  }

  deleteJokeById(id = ''): void {
    const jokeIndex = jokes.findIndex((joke) => joke.id === id);
    jokes.splice(jokeIndex, 1);
    this.updateObservables();
  }

  private updateObservables() {
    this.allJokes$.next(jokes.slice());
    this.userJokes$.next(this.getUserJokes());
  }

  private generateGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}
