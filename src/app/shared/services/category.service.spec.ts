import { TestBed } from '@angular/core/testing';
import { CategoryService } from './category.service';
import { categories } from '../interfaces/category.interface';

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryService],
    });
    service = TestBed.inject(CategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return category by id', function () {
    const category = service.getCategoryById(categories[0].id);
    expect(category).toEqual(categories[0]);
  });
});
