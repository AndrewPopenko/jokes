import { Pipe, PipeTransform } from '@angular/core';
import { CategoryService } from '../services/category.service';

@Pipe({
  name: 'category',
})
export class CategoryPipe implements PipeTransform {
  constructor(private categoryService: CategoryService) {}

  transform(value: string | undefined): string {
    if (value === undefined) return '';
    return this.categoryService.getCategoryById(value)?.name;
  }
}
