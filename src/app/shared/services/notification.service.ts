import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface DlgContext {
  showDlg: boolean;
  title?: string;
  text?: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  dlgContext$: BehaviorSubject<DlgContext> = new BehaviorSubject<DlgContext>({
    showDlg: false,
  });
}
