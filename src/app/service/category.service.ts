import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { ToastrService} from 'ngx-toastr';
import { map} from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor( private afs: AngularFirestore , private toastr : ToastrService ) { }

  saveCategory(data){
    this.afs.collection('categories ').add(data).then(ref=>{

      this.toastr.success('Your New Category has been saved succesfuly');

    });
  } 
  
  loadCategoties(){
    return this.afs.collection('categories ').snapshotChanges().pipe(
      map(action => {
        return action.map(a=>{
          const data = a.payload.doc.data();
          const id  = a.payload.doc.id;
          return {id , data};
        })
      })
    );
  }

  updateCategories(id:string , updatedData){
    this.afs.doc('categories /'+id).update({category:updatedData}).then(()=>{
      this.toastr.success('Updeted')
    });
  }

  deleteCateories(id: string){
    this.afs.doc('categories /' +id).delete().then(()=>{
      this.toastr.error('deleted');
    })
  }

}
