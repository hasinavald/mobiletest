import { Component, OnInit } from '@angular/core';
import { RemoteServiceService } from '../../service/remote-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  userData = {
    username : "",
    password : "",
    email : "",
    role : ["user","user"],
    region : null
  };

  error = {
    username : "",
    password : "",
    email : "",
    region : ""
  }

  password_confirmation = "";
  constructor(private apiService : RemoteServiceService) { }

  ngOnInit() {
  }
  signup(){
    if(this.userData.username == ""){
      this.error.username = "Username invalide";
      return null;
    }
    if(this.userData.password == "" || this.userData.password.length < 8){
      this.error.password = "Mot de passe invalide";
      return null;
    }
    if(this.userData.email == ""){
      this.error.email = "Mail invalide";
      return null;
    }
    if(this.userData.password != this.password_confirmation ){
      this.error.password = "Les mot de passe ne correspondent pas";
      return null;
    }
  
    this.apiService.addUser(this.userData).subscribe((e)=>{
      if(e.message){
        this.apiService.presentToast(e.message);
        if(e.message == "User registered successfully!"){
          this.loginPage()
        }
      }
    })
  }
  loginPage(){
    this.apiService.navigate('login');
  }
}
