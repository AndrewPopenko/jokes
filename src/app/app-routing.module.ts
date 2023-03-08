import { RouterModule, Routes } from "@angular/router";
import { MainViewComponent } from "./views/main-view/main-view.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JokeComponent } from "./components/joke/joke.component";
import { JokeListComponent } from "./components/joke-list/joke-list.component";

const routes: Routes = [
  {path: '', redirectTo: '/jokes', pathMatch: 'full'},
  {
    path: 'jokes', component: MainViewComponent, children: [
      {path: '', component: JokeListComponent},
      {
        path: 'joke', component: JokeComponent, children: [
          {path: ':id', component: JokeComponent},
        ]
      },
      {path: 'joke-list', component: JokeListComponent}
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}

