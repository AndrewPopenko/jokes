import { Component, OnInit } from '@angular/core';
import { DlgContext, NotificationService } from "../../shared/services/notification.service";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.less']
})
export class ToastComponent implements OnInit{

  content: DlgContext = {showDlg: false};
  constructor(private notifyService: NotificationService,) {
  }

  ngOnInit() {
    this.notifyService.dlgContext$.subscribe( context => {
      this.content = context;
    })
  }

  closeDlg(): void {
    this.notifyService.dlgContext$.next({showDlg: false});
  }
}
