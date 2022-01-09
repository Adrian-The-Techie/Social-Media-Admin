import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { ConfirmActionModalComponent } from 'src/app/gen-components/confirm-action-modal/confirm-action-modal.component';
import { ConfigService } from 'src/app/services/config.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-organisations',
  templateUrl: './organisations.component.html',
  styles: [],
})
export class OrganisationsComponent implements OnInit {
  orgs: any[] = [];
  selectedOrgs: any[] = [];
  action='0'
  constructor(private _http: HttpService, private _config: ConfigService, private _dialog:MatDialog, private _router:Router) {}

  ngOnInit(): void {
    this.getOrgs();
  }
  getOrgs() {
    this._config.spinnerToggle(true, 'Loading organisations...');
    this._http.get('api/org').subscribe((response) => {
      this._config.spinnerToggle(false);
      if (response.status == 1) {
        this.orgs = response.data;
      } else {
        this._config.showSnackBar(response);
      }
    });
  }
  clear(table: Table) {
    table.clear();
  }
  deleteOrg(url){
    this._dialog
        .open(ConfirmActionModalComponent, {
          data: {
            message: 'You are about to delete an organisation. Proceed ?',
          },
        })
        .afterClosed().subscribe((response)=>{
          if(response == undefined || response == ''){
            return
          }
          else{
            this._config.spinnerToggle(true, 'Deleting organisation')
            this._http.delete(`api/org/${url}`).subscribe((response)=>{
              this._config.showSnackBar(response)
              if(response.status == 1){
                location.reload()
              }
            })
          }
        })
  }
  takeAction(url){
    switch(this.action){
      case "1": this.viewOrganisation(url);
      break;
      case "2": this.editOrganisation(url);
      break;
      case "3": this.deleteOrg(url);
      break;
      default:''
    }
  }
  viewOrganisation(url){
    this._router.navigate(['/system/viewOrg/', url])
  }
  editOrganisation(url){
    this._router.navigate(['/system/editOrg/', url])
  }
}
