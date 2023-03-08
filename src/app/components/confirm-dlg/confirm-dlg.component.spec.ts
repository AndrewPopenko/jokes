import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDlgComponent } from './confirm-dlg.component';
import { MatDialog, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { NewJokeDlgComponent } from "../new-joke-dlg/new-joke-dlg.component";

describe('ConfirmDlgComponent', () => {
  let component: ConfirmDlgComponent;
  let fixture: ComponentFixture<ConfirmDlgComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<NewJokeDlgComponent>>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj<MatDialogRef<NewJokeDlgComponent>>('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [ConfirmDlgComponent],
      imports: [
        MatDialogModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ConfirmDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close modal dialog', () => {
    component.confirm();
    expect(dialogRefSpy.close).toHaveBeenCalledTimes(1);
  })
});
