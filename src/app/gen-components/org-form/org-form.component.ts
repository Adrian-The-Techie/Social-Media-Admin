import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';
import { HttpService } from 'src/app/services/http.service';
import { ConfirmActionModalComponent } from '../confirm-action-modal/confirm-action-modal.component';

@Component({
  selector: 'app-org-form',
  templateUrl: './org-form.component.html',
  styles: [],
})
export class OrgFormComponent implements OnInit {
  orgForm: FormGroup;
  url: any='';

  constructor(
    private _fb: FormBuilder,
    private _http: HttpService,
    private _config: ConfigService,
    private _router: Router,
    private _dialog: MatDialog,
    private _route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.genForm();
    this.getUrl()
  }
  genForm(type='new', data:any='') {
    if(type=='new'){
      return this.orgForm = this._fb.group({
        name: new FormControl('', Validators.required),
      });
    }
    else{
      return this.orgForm = this._fb.group({
        name: new FormControl(data.name, Validators.required),
      });
    }
  }
  getUrl(){
    this._route.params.subscribe((params)=>{
      if(params['url'] == undefined){
        return
      }
      else{
        this.url=params['url']
        this.getOrg()
      }
    })
  }
  get form() {
    return this.orgForm.controls;
  }
  getUniqueOrg() {
    let orgObject = {
      name: this.form.name.value,
    };
    this._http.post(`api/validateOrg/`, orgObject).subscribe((response) => {
      if (response.status == 0) {
        this.orgForm.get('name').setErrors({
          orgExists: true,
        });
      }
    });
  }
  getOrg(){
    this._http.get(`api/org/${this.url}`).subscribe((response)=>{
      if(response.status == 1){
        this.genForm('edit', response.data)
      }
      else{
        this._config.showSnackBar(response)
      }
    })
  }
  save(route) {
    if (this.orgForm.valid) {
      this._dialog
        .open(ConfirmActionModalComponent, {
          data: {
            message: 'You are about to save an organisation. Proceed ?',
          },
        })
        .afterClosed()
        .subscribe((response) => {
          if (response == undefined || response == '') {
            return;
          } else {
            let form = new FormData();
            let formData = Object.entries(this.orgForm.value);
            for (let [field, value] of formData) {
              form.append(field, value as any);
            }
            if(this.url == ''){
              this._config.spinnerToggle(true, 'Creating organisation...')
            this._http.post('api/createOrg/', form).subscribe((response) => {
              this._config.spinnerToggle(false)
              if (response.status == 1) {
                if (route) {
                  this._router.navigate(['/system/organisations']);
                } else {
                  location.reload();
                }
              } else {
                this._config.showSnackBar(response);
              }
            });
          }
          else{
            this._config.spinnerToggle(true, 'Updating organisation details');
            this._http.put(`api/org/${this.url}`, form).subscribe((response) => {
              this._config.spinnerToggle(false)
              if (response.status == 1) {
                if (route) {
                  this._router.navigate(['/system/organisations']);
                } else {
                  location.reload();
                }
              } else {
                this._config.showSnackBar(response);
              }
            });
          }
        }
        });
    } else {
      console.log(this.orgForm.errors);
    }
  }
}
