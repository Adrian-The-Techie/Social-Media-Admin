import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganisationsComponent } from './components/organisations/organisations.component';
import { SystemComponent } from './components/system/system.component';
import { UsersComponent } from './components/users/users.component';
import { ViewOrgComponent } from './components/view-org/view-org.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { LoginFormComponent } from './gen-components/login-form/login-form.component';
import { OrgFormComponent } from './gen-components/org-form/org-form.component';
import { UserFormComponent } from './gen-components/user-form/user-form.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'system',
    pathMatch:'full'
  },
  {
    path:'login',
    component:LoginFormComponent
  },
  {
    path:'system',
    component:SystemComponent,
    children:[
      {
        path:'users',
        component:UsersComponent,
      },
      {
        path:'newUser',
        component:UserFormComponent
      },{
        path:'organisations',
        component:OrganisationsComponent,
      },
      {
        path:'newOrganisation',
        component:OrgFormComponent
      },
      {
        path:'viewOrg/:url',
        component:ViewOrgComponent
      },
      {
        path:'editOrg/:url',
        component:OrgFormComponent
      },
      {
        path:'viewUser/:url',
        component:ViewUserComponent
      },
      {
        path:'editUser/:url',
        component:UserFormComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
