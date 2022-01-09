import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmActionModalComponent } from 'src/app/gen-components/confirm-action-modal/confirm-action-modal.component';
import { ConfigService } from 'src/app/services/config.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit {
users:any[]=[]
action:any="0"
selectedUsers=[]
  constructor(private _http:HttpService, private _config:ConfigService, private _dialog:MatDialog, private _router:Router) { }

  ngOnInit(): void {
    this.getUsers()
  }
  getUsers(){
    this._http.get('users').subscribe((response)=>{
      if(response.status == 1){
        this.users=response.data
      }
      else{
        this._config.showSnackBar(response)
      }
    })
  }

  takeAction(url){
    switch(this.action){
      case "1": this.viewUser(url);
      break;
      case "2": this.editUser(url);
      break;
      case "3": this.deleteUser(url);
      break;
      default:''
    }
  }
  viewUser(url){
    this._router.navigate(['/system/viewUser/', url])
  }
  editUser(url){
    this._router.navigate(['/system/editUser/', url])
  }
  
  deleteUser(url){
    this._dialog
        .open(ConfirmActionModalComponent, {
          data: {
            message: 'You are about to delete a user. Proceed ?',
          },
        })
        .afterClosed().subscribe((response)=>{
          if(response == undefined || response == ''){
            return
          }
          else{
            this._config.spinnerToggle(true, 'Deleting user')
            this._http.delete(`user/${url}`).subscribe((response)=>{
              this._config.spinnerToggle(false)
              this._config.showSnackBar(response)
              if(response.status == 1){
                location.reload()
              }
            })
          }
        })
  }
}
