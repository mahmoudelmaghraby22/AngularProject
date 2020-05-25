import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { ToastrService} from 'ngx-toastr';
import { map} from 'rxjs/operators'
import { firestore } from 'firebase';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private afs :AngularFirestore, private toastr: ToastrService) { }

  saveTodo(id:string ,data){
    this.afs.collection('categories ').doc(id).collection('todos').add(data).then(ref=>{

      this.afs.doc('categories /' +id ).update({todoCount: firestore.FieldValue.increment(1)});

      this.toastr.success('your To-Do has been saved');
    });
  }

  loadTodos( id:string){
    return this.afs.collection('categories ').doc(id).collection('todos').snapshotChanges().pipe(
      map(action=> {
        return action.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {data,id};
        })
      })
    )
  }

  updateTodo(catId: string ,todoId:string, updatedData:string){
    this.afs.collection('categories ').doc(catId).collection('todos').doc(todoId).update({todo: updatedData}).then(ref=>{
      this.toastr.success('your To-Do has been updated')
    })
  }

  deleteTodo(catId:string , todoId:string){
    this.afs.collection('categories ').doc(catId).collection('todos').doc(todoId).delete().then(ref => {

      this.afs.doc('categories /' + catId).update({todoCount: firestore.FieldValue.increment(-1)});
      this.toastr.error('deleted succesfuly');
      
    })
  }

  markCompelete(catId:string,todoId:string){
    this.afs.collection('categories ').doc(catId).collection('todos').doc(todoId).update({isCompeleted: true}).then(ref=>{
      this.toastr.info('Your To-Do is compeleted')
    })
  }

  markUncompelete(catId:string,todoId:string){
    this.afs.collection('categories ').doc(catId).collection('todos').doc(todoId).update({isCompeleted: false}).then(ref=>{
      this.toastr.warning('Your To-Do is uncompeleted')
    })
  }

}
