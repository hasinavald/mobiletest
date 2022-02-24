import { Component, OnInit } from '@angular/core';
import { RemoteServiceService } from '../../service/remote-service.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  userName = "";
  usrDatas;
  nbNotifs = 0;
  token;
  constructor(private apiService : RemoteServiceService,private menu: MenuController) { }

  ngOnInit() {
    this.usrDatas = this.apiService.getUserDatas();
    // this.apiService.getUserDatas();
  }
  ionViewWillEnter(){
    this.token = this.apiService.getUserDatas()?.accessToken;
    if(!this.token){
      this.apiService.navigate('/');
    }
    this.userName = this.apiService.getUserDatas()?.username;
    this.apiService.getNbNotifs(this.token,this.userName).subscribe((e)=>{
      this.nbNotifs = e.length;
    })
  } 
  openMenu() {
    this.menu.open('custom');
  }
  naigateTo(page){
    this.apiService.navigate(page);
  }
  goNotifs(){
    this.apiService.navigate('notifications');
  }
  logout(){
    this.apiService.logout();
    this.apiService.navigate('login');
  }
}
