import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styles: [],
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _http: HttpService,
    private _config: ConfigService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.genForm();
  }
  genForm() {
    return (this.loginForm = this._fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    }));
  }
  get form() {
    return this.loginForm.controls;
  }
  login() {
    if (this.loginForm.valid) {
      let form = new FormData();
      let formData = Object.entries(this.loginForm.value);
      for (let [field, value] of formData) {
        form.append(field, value as any);
      }
      this._http.post('login/', form).subscribe((response) => {
          this._router.navigate(['/system']);
          localStorage.setItem('token', response.access)
          this._config.showSnackBar(response);
        
      });
    }}
}
