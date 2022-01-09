import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styles: [
  ]
})
export class SystemComponent implements OnInit {
  public mode:any = "over";
  public hasBackdrop:any = "true";
  // public hamb
  public showMenu = true;
  public sidenavState = false;

  constructor(
    private _http: HttpService,
    private _config: ConfigService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.conditionalStyling();
  }

  conditionalStyling() {
    if (window.matchMedia("(min-width:900px)").matches) {
      this.mode = "push";
      this.hasBackdrop = "false";
      this.sidenavState = true;
    }
  }
  signOut() {
    //get login_id and token
    let loginId = localStorage.getItem("login_id");
    // localStorage.getItem('token');

    //delete token and id
    localStorage.removeItem("login_id");
    localStorage.removeItem("token");

    //update user status to signed_out
    let requestData = {
      activityID: "signOut",
      data: {
        login_id: loginId,
      },
    };
    this._http.post('/api/signOut/', 'token').subscribe((response) => {
      if (response.status == 1) {
        // this._router.navigate(["login"]);
        this._config.showSnackBar(response, 5000);
        console.log(response);
      }
    });
  }
}
