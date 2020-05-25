import { Component, OnInit } from '@angular/core';
import { TodoService } from '../service/todo.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  catId:string;
  todos:Array<object>;
  todoValue:string;
  dataStatus:string = 'Add';
  todoId:string

  constructor(private todoSirvice : TodoService , private activatedRoute :ActivatedRoute) { }

  ngOnInit(): void {
    this.catId= this.activatedRoute.snapshot.paramMap.get('id');

    this.todoSirvice.loadTodos(this.catId).subscribe(val => {
      this.todos = val;
      console.log(this.todos);
              
    })
  }

  onSubmet (f:NgForm){
    if(this.dataStatus=='Add'){
       let todo = {
      todo: f.value.todoText ,
      isCompeleted :false
    }; 
    this.todoSirvice.saveTodo(this.catId,todo);
    f.resetForm();
    }
 
    else if(this.dataStatus=='Edit'){
      this.todoSirvice.updateTodo(this.catId,this.todoId,f.value.todoText);
      f.resetForm();
    }

  }

  onEdite(todo:string , id:string){
    this.todoValue = todo;
    this.dataStatus = 'Edit';
    this.todoId= id; 
  }
  
  onDelete(id:string){
    this.todoSirvice.deleteTodo(this.catId,id);
  }

  compeleteTodo(todoId:string){
    this.todoSirvice.markCompelete(this.catId,todoId )
  }

  uncompeleteTodo(todoId:string){
    this.todoSirvice.markUncompelete(this.catId,todoId )
  }

}
