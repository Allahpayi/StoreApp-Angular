import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Category } from '../category';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css'],
  providers:[CategoryService]
})
export class CategoryAddComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, 
    private categoryService:CategoryService,
    private alertifyService:AlertifyService) { }

  categoryAdd:FormGroup;
  category:Category = new Category()

  createcategoryAdd(){
    this.categoryAdd = this.formBuilder.group({
      name:["",Validators.required]
    })
  }
  ngOnInit(): void {
    this.createcategoryAdd();
  }
  add(){
    if(this.categoryAdd.valid){
      this.category = Object.assign({},this.categoryAdd.value)
    }
    this.categoryService.addCategory(this.category).subscribe(data => { 
      this.alertifyService.success(data.name+" Başarıyla eklendi")
    })
  }
}
