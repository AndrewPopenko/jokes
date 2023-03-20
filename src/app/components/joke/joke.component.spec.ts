import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { JokeComponent } from './joke.component';
import { RouterTestingModule } from '@angular/router/testing';
import { JokeService } from '../../shared/services/joke.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('JokeComponent', () => {
  let component: JokeComponent;
  let fixture: ComponentFixture<JokeComponent>;

  const joke = {
    id: 'b99be362-7044-4bca-aed2-e734f7999e5e',
    code: 'IT',
    name: 'Informatyczne',
  };

  const fakeActivatedRoute = {
    params: of({ id: '123' }),
  } as unknown as ActivatedRoute;

  const fakeJokeService = {
    currentJoke$: of(joke),
    getCategoryById: joke,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JokeComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: JokeService, useValue: fakeJokeService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(JokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init values', fakeAsync(function () {
    component.ngOnInit();
    tick();
    expect(component.id).toEqual('123');
    expect(component.joke).toEqual(joke);
  }));

  it('should get category by id', function () {
    const spy = spyOn(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      component.categoryService,
      'getCategoryById'
    ).and.callThrough();

    component.getCategory('b99be362-7044-4bca-aed2-e734f7999e5e');
    expect(spy).toHaveBeenCalledOnceWith(
      'b99be362-7044-4bca-aed2-e734f7999e5e'
    );
  });
});
