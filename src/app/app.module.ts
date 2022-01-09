import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SnackbarComponent } from './gen-components/snackbar/snackbar.component';
import { SpinnerComponent } from './gen-components/spinner/spinner.component';
import { SystemComponent } from './components/system/system.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { UsersComponent } from './components/users/users.component';
import { UserFormComponent } from './gen-components/user-form/user-form.component';
import { LoginFormComponent } from './gen-components/login-form/login-form.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { OrganisationsComponent } from './components/organisations/organisations.component';
import { OrgFormComponent } from './gen-components/org-form/org-form.component';
import { ConfirmActionModalComponent } from './gen-components/confirm-action-modal/confirm-action-modal.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ViewOrgComponent } from './components/view-org/view-org.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    SnackbarComponent,
    SystemComponent,
    UsersComponent,
    UserFormComponent,
    LoginFormComponent,
    OrganisationsComponent,
    OrgFormComponent,
    ConfirmActionModalComponent,
    ViewOrgComponent,
    ViewUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    MatDialogModule,
    TableModule,
    ButtonModule,
    InputTextModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
