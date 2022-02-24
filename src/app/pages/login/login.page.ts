import { Component, OnInit } from '@angular/core';
import { RemoteServiceService } from '../../service/remote-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  showPassword = false;
  User = {
    username : "Rova",
    password : "P@ssword1"
  }
  error = {
    username : ""
  }
  constructor(private apiService : RemoteServiceService) { }

  ngOnInit() {
  }
  sign(){

  }
  showPwd() {
    this.showPassword = !this.showPassword;
  }

  login(){
    this.apiService.presentLoading()
    this.apiService.login(this.User).subscribe((e)=>{
      console.log(e);
      if(e.accessToken){
        this.apiService.setUserDatas(e);
        this.apiService.navigate('dashboard');
        this.apiService.dismissLoading()
      }
    })
  }
  goSignup(){
    this.apiService.navigate('signup');
  }
}
