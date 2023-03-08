import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainViewComponent } from './main-view.component';
import { JokeService } from "../../shared/services/joke.service";
import { ActivatedRoute } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { NewJokeDlgComponent } from "../../components/new-joke-dlg/new-joke-dlg.component";

describe('MainViewComponent', () => {
  let component: MainViewComponent;
  let fixture: ComponentFixture<MainViewComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<NewJokeDlgComponent>>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj<MatDialogRef<NewJokeDlgComponent>>('MatDialogRef', ['close']);
    dialogSpy = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [MainViewComponent],
      imports: [RouterTestingModule],
      providers: [
        JokeService,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MatDialog, useValue: dialogSpy }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
