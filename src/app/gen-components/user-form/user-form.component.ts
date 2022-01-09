import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';
import { HttpService } from 'src/app/services/http.service';
import { ConfirmActionModalComponent } from '../confirm-action-modal/confirm-action-modal.component';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styles: [],
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  url: any = '';
  orgs: any=[];
  constructor(
    private _fb: FormBuilder,
    private _http: HttpService,
    private _config: ConfigService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getOrgs()
    this.genForm();
    this.getUrl();
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
  genForm(type = 'new', data: any = '') {
    if (type == 'new') {
      return (this.userForm = this._fb.group(
        {
          first_name: new FormControl('', Validators.required),
          last_name: new FormControl('', Validators.required),
          id_number: new FormControl('', Validators.required),
          phone: new FormControl('+254', [
            Validators.required,
            Validators.minLength(13),
          ]),
          email: new FormControl('', [Validators.required, Validators.email]),
          org: new FormControl('', Validators.required),
          role: new FormControl('', Validators.required),
          username: new FormControl('', Validators.required),
          password: new FormControl('', [
            Validators.required,
            Validators.minLength(8),
          ]),
          confirm_password: new FormControl('', Validators.required),
        },
        { validators: [this.passwordMatch] }
      ));
    } else {
      return (this.userForm = this._fb.group({
        first_name: new FormControl(data.first_name, Validators.required),
        last_name: new FormControl(data.last_name, Validators.required),
        id_number: new FormControl(data.id_number, Validators.required),
        phone: new FormControl(data.phone, [
          Validators.required,
          Validators.minLength(13),
        ]),
        email: new FormControl(data.email, [
          Validators.required,
          Validators.email,
        ]),
        org: new FormControl(data.org, Validators.required),
        role: new FormControl(data.role, Validators.required),
        username: new FormControl(data.username, Validators.required),
      }));
    }
  }
  get form() {
    return this.userForm.controls;
  }
  passwordMatch(control: AbstractControl): ValidationErrors | null {
    if (
      control.get('password').value != control.get('confirm_password').value
    ) {
      return { notMatch: true };
    }

    return null;
  }
  getUniqueEmail() {
    let emailObject = {
      email: this.form.email.value,
    };
    this._http.post(`validateEmail/`, emailObject).subscribe((response) => {
      if (response.status == 0) {
        this.userForm.get('email').setErrors({
          emailExists: true,
        });
      }
    });
  }
  getUniqueUsername() {
    let usernameObject = {
      username: this.form.username.value,
    };
    this._http
      .post(`validateUsername/`, usernameObject)
      .subscribe((response) => {
        if (response.status == 0) {
          this.userForm.get('username').setErrors({
            usernameExists: true,
          });
        }
      });
  }
  getUser() {
    this._http.get(`user/${this.url}`).subscribe((response) => {
      if (response.status == 1) {
        this.genForm('edit', response.data);
      } else {
        this._config.showSnackBar(response);
      }
    });
  }
  getUrl() {
    this._route.params.subscribe((params) => {
      if (params['url'] == undefined) {
        return;
      } else {
        this.url = params['url'];
        this.getUser();
      }
    });
  }
  save(route) {
    if (this.userForm.valid) {
      this._dialog
        .open(ConfirmActionModalComponent, {
          data: {
            message: 'You are about to save a user. Proceed ?',
          },
        })
        .afterClosed()
        .subscribe((response) => {
          if (response == undefined || response == '') {
            return;
          } else {
            let form = new FormData();
            let formData = Object.entries(this.userForm.value);
            for (let [field, value] of formData) {
              form.append(field, value as any);
            }
            if(this.url == ''){
            this._http.post('register/', form).subscribe((response) => {
              if (response.status == 1) {
                if (route) {
                  this._router.navigate(['/system/users']);
                } else {
                  location.reload();
                }
              } else {
                this._config.showSnackBar(response);
              }
            });
          }
          else{
            this._http.put(`user/${this.url}/`, form).subscribe((response) => {
              if (response.status == 1) {
                if (route) {
                  this._router.navigate(['/system/users']);
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
      console.log(this.userForm.errors);
    }
  }
}
