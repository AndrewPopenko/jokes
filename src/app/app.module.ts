import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainViewComponent } from './views/main-view/main-view.component';
import { AppRoutingModule } from "./app-routing.module";
import { JokeComponent } from './components/joke/joke.component';
import { JokeService } from "./shared/services/joke.service";
import { CategoryService } from "./shared/services/category.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewJokeDlgComponent } from './components/new-joke-dlg/new-joke-dlg.component';
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { JokeListComponent } from './components/joke-list/joke-list.component';
import { ConfirmDlgComponent } from './components/confirm-dlg/confirm-dlg.component';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    JokeComponent,
    NewJokeDlgComponent,
    JokeListComponent,
    ConfirmDlgComponent,
    ToastComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatDividerModule,
    ],
  providers: [
    JokeService,
    CategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
