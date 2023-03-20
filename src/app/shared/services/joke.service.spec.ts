import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { JokeService } from './joke.service';
import { JokeInterface, jokes } from '../interfaces/joke.interface';

describe('JokeService', () => {
  let service: JokeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JokeService],
    });
    service = TestBed.inject(JokeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return only user jokes', function () {
    const userJokes = service.getUserJokes();
    expect(
      jokes.filter((joke: JokeInterface) => joke.isUserJoke === true)
    ).toEqual(userJokes);
  });

  it('should return next joke', fakeAsync(function () {
    service.nextJoke();
    tick();
    service.currentJoke$.subscribe((joke: JokeInterface) => {
      expect(joke).toEqual(jokes[0]);
    });
  }));

  it('should save joke', fakeAsync(function () {
    service.saveJoke({ category: '123', content: '321' });
    tick();
    service.allJokes$.subscribe((allJokes: JokeInterface[]) => {
      expect(allJokes[allJokes.length - 1]).toEqual({
        id: allJokes[allJokes.length - 1].id,
        isUserJoke: true,
        category: '123',
        content: '321',
      } as JokeInterface);
    });
    service.userJokes$.subscribe((allJokes: JokeInterface[]) => {
      expect(allJokes[allJokes.length - 1]).toEqual({
        id: allJokes[allJokes.length - 1].id,
        isUserJoke: true,
        category: '123',
        content: '321',
      } as JokeInterface);
    });
  }));

  it('should delete joke by id', function () {
    const len = jokes.length;
    service.deleteJokeById(jokes[0].id);
    service.allJokes$.subscribe((allJokes: JokeInterface[]) => {
      expect(allJokes.length).toBeLessThan(len);
    });
  });
});
