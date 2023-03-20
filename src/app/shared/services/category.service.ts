import { Injectable } from '@angular/core';
import {
  categories,
  CategoryInterface,
} from '../interfaces/category.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  allCategories$: BehaviorSubject<CategoryInterface[]> = new BehaviorSubject<
    CategoryInterface[]
  >([]);

  constructor() {
    this.allCategories$.next(categories);
  }

  getCategoryById(id: string): CategoryInterface {
    return categories?.find((it) => it?.id === id) as CategoryInterface;
  }
}
