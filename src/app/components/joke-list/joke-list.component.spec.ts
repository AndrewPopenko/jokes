import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { JokeListComponent } from './joke-list.component';
import { JokeService } from "../../shared/services/joke.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { of } from "rxjs";
import { NewJokeDlgComponent } from "../new-joke-dlg/new-joke-dlg.component";
import { NotificationService } from "../../shared/services/notification.service";

describe('JokeListComponent', () => {
  let component: JokeListComponent;
  let fixture: ComponentFixture<JokeListComponent>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let dialogRefSpy = jasmine.createSpyObj<MatDialogRef<NewJokeDlgComponent>>('MatDialogRef', [
    'close', 'afterClosed']);

  let joke = {
    "id": "b99be362-7044-4bca-aed2-e734f7999e5e",
    "code": "IT",
    "name": "Informatyczne"
  };

  beforeEach(async () => {
    dialogSpy = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);

    const fakeJokeService = {
      userJokes$: of([joke]),
      getCategoryById: joke,
      deleteJokeById: {}
    };

    await TestBed.configureTestingModule({
      declarations: [ JokeListComponent ],
      providers: [
        NotificationService,
        { provide: JokeService, useValue: fakeJokeService },
        { provide: MatDialog, useValue: dialogSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JokeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all user jokes', fakeAsync(function () {
    component.ngOnInit();
    tick();
    expect(component.allJokes).toEqual([joke]);
  }));

  it('should get category by id', function () {
    // @ts-ignore
    const spy = spyOn(component.categoryService, 'getCategoryById').and.callThrough();

    component.getCategory('b99be362-7044-4bca-aed2-e734f7999e5e');
    expect(spy).toHaveBeenCalledOnceWith('b99be362-7044-4bca-aed2-e734f7999e5e');
  });

  it('should delete joke by id', fakeAsync(function () {
    // @ts-ignore
    const spy = spyOn(component.jokeService, 'deleteJokeById').and.returnValue(null);
    // @ts-ignore
    const spyObs = spyOn(component.notifyService.dlgContext$, 'next').and.callThrough();
    dialogSpy.open.and.returnValue(dialogRefSpy);
    dialogRefSpy.afterClosed.and.returnValue(of('confirmed'));
    component.deleteJoke(joke.id);
    tick();
    expect(dialogSpy.open).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spyObs).toHaveBeenCalledOnceWith({
      showDlg: true,
      title: 'Sukces',
      text: 'Żart został pomyślnie usunięty.'});
  }));
});
