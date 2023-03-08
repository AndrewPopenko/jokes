import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CategoryService } from "../../shared/services/category.service";
import { CategoryInterface } from "../../shared/interfaces/category.interface";
import { JokeService } from "../../shared/services/joke.service";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-new-joke-dlg',
  templateUrl: './new-joke-dlg.component.html',
  styleUrls: ['./new-joke-dlg.component.less']
})
export class NewJokeDlgComponent implements OnInit {
  selected: string = '';
  newJokeForm: FormGroup = new FormGroup({
    categorySelect: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
  });

  categories: CategoryInterface[] = [];

  constructor(
    private categoryService: CategoryService,
    private jokeService: JokeService,
    private dialogRef: MatDialogRef<NewJokeDlgComponent>,
  ) {}

  ngOnInit(): void {
    this.categoryService.allCategories$.subscribe(
      (categories: CategoryInterface[]) => this.categories = categories);
  }

  save(): void {
    const cat = this.newJokeForm.get('categorySelect')?.value as CategoryInterface;

    this.jokeService.saveJoke({
      category: cat?.id,
      content: this.newJokeForm.get('content')?.value as string,
    });
    this.dialogRef.close();
  }
}
