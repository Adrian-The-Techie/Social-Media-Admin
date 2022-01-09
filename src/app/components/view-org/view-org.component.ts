import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-view-org',
  templateUrl: './view-org.component.html',
  styles: [
  ]
})
export class ViewOrgComponent implements OnInit {
  url=''
  org: any={};
  constructor(private _route:ActivatedRoute, private _http:HttpService, private _config:ConfigService) { }

  ngOnInit(): void {
    this.getUrl()
  }
  getUrl(){
    this._route.params.subscribe((route)=>{
      if(route['url'] == undefined){
        return
      }
      else{
        this.url=route['url']
        this.getOrg()
      }
    })
  }
  getOrg(){
    this._config.spinnerToggle(true, 'Loading details...')
    this._http.get(`api/org/${this.url}`).subscribe((response)=>{
      this._config.spinnerToggle(false)
      if(response.status == 1){
        this.org=response.data
      }
      else{
        this._config.showSnackBar(response)
      }
    })
  }
}
