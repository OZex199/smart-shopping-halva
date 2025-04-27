// src/app/categories/categories.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from './../services/categories.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  newCategoryName: string = '';
  editingCategory: any = null;
  editedName: string = '';

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => console.error(err)
    });
  }

  addCategory() {
    if (this.newCategoryName.trim() !== '') {
      this.categoriesService.addCategory(this.newCategoryName).subscribe(() => {
        this.newCategoryName = '';
        this.loadCategories();
      });
    }
  }

  startEditing(category: any) {
    this.editingCategory = category;
    this.editedName = category.name;
  }

  saveCategory() {
    if (this.editedName.trim() !== '') {
      this.categoriesService.updateCategory(this.editingCategory.id, this.editedName).subscribe(() => {
        this.editingCategory = null;
        this.editedName = '';
        this.loadCategories();
      });
    }
  }

  cancelEditing() {
    this.editingCategory = null;
  }

  deleteCategory(id: number) {
    this.categoriesService.deleteCategory(id).subscribe(() => {
      this.loadCategories();
    });
  }
}
