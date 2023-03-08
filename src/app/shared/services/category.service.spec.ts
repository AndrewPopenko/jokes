import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';
import { CategoryInterface } from "../interfaces/category.interface";

describe('CategoryService', () => {
  let service: CategoryService;

  const categories: CategoryInterface[] = [
    {
      "id": "b99be362-7044-4bca-aed2-e734f7999e5e",
      "code": "IT",
      "name": "Informatyczne"
    },
    {
      "id": "e451c8bc-667e-4b3a-a38e-c4b782ac3751",
      "code": "ABOUT_JOHNY",
      "name": "O Jasiu"
    },
    {
      "id": "8ad0481c-c85c-4b5e-98e0-77711a65f841",
      "code": "ABOUT_FIREFIGHTERS",
      "name": "O strażakach"
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CategoryService
      ]
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
