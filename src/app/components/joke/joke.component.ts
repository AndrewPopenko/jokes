import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { JokeService } from "../../shared/services/joke.service";
import { JokeInterface } from "../../shared/interfaces/joke.interface";
import { CategoryService } from "../../shared/services/category.service";

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.less']
})
export class JokeComponent implements OnInit {
  id?: string;
  joke?: JokeInterface;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jokeService: JokeService,
    private categoryService: CategoryService
  ) {
  }

  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params) => {
        this.id = params['id'];
      });
    this.jokeService.currentJoke$.subscribe(joke => {
      this.joke = joke;
    })
  }

  getCategory(categoryId: string = ''): string {
    return this.categoryService.getCategoryById(categoryId)?.name;
  }
}
