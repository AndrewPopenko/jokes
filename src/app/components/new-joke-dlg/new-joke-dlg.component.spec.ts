import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { NewJokeDlgComponent } from './new-joke-dlg.component';
import { JokeService } from '../../shared/services/joke.service';
import { MatDialogRef } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CategoryService } from '../../shared/services/category.service';

describe('NewJokeDlgComponent', () => {
  let component: NewJokeDlgComponent;
  let fixture: ComponentFixture<NewJokeDlgComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<NewJokeDlgComponent>>;

  const category = {
    id: '8ad0481c-c85c-4b5e-98e0-77711a65f841',
    code: 'ABOUT_FIREFIGHTERS',
    name: 'O strażakach',
  };

  const fakeCategoryService = {
    allCategories$: of([category]),
  };

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj<MatDialogRef<NewJokeDlgComponent>>(
      'MatDialogRef',
      ['close']
    );
    await TestBed.configureTestingModule({
      declarations: [NewJokeDlgComponent],
      imports: [RouterTestingModule],
      providers: [
        JokeService,
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: CategoryService, useValue: fakeCategoryService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewJokeDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all categories', fakeAsync(function () {
    component.ngOnInit();
    tick();
    expect(component.categories).toEqual([category]);
  }));

  it('should call save', function () {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const spy = spyOn(component.jokeService, 'saveJoke').and.callThrough();
    component.newJokeForm.get('content')?.setValue('123');
    component.newJokeForm.get('categorySelect')?.patchValue(category);

    component.save();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
