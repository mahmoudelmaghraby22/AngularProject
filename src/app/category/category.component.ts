import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryService} from '../service/category.service'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  color:Array<any>= ['#007892','#ff427f','#ffd8a6','#2fc4b2',
  '#12947f','#e71414','#f17808','#79d70f','#d32626','#f5a31a',
  '#edf4f2','#63b7af','#abf0e9','#d4f3ef','#ee8572','#00005c'
  ,'#6a097d','#c060a1','#eb6383','#e43f5a','#fc7e2f','#f8f3eb']

  categories:Array<object>;
  categoryName :string = '';
  dataStatus:string ='Add';
  catId :string;


  constructor(private categoryService : CategoryService) { }

  ngOnInit(): void {
    
      this.categoryService.loadCategoties().subscribe(val =>{
        this.categories= val;
        console.log(val);
        
      })
    }
  

  onSubmit(f:NgForm){

    if(this.dataStatus == 'Add'){
      let randomColor = Math.floor(Math.random() * this.color.length)

    let todoCategory = {
      category : f.value.categoryName,
      colorCode:this.color[randomColor],
      todoCount:0
      } 
      this.categoryService.saveCategory(todoCategory)
      f.resetForm();
    }
    else if(this.dataStatus=='Update'){
      this.categoryService.updateCategories(this.catId,f.value.categoryName);
      f.resetForm();
      this.dataStatus='Add';
    }

  }

  onEdit( category:string , id:string){
    this.categoryName=category; 
    this.catId = id;
    this.dataStatus='Update';
  }

  onDelete(id:string){
    this.categoryService.deleteCateories(id )
  }

 
  
}
