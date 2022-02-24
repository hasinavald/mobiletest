import { Component, OnInit } from '@angular/core';
import { RemoteServiceService } from '../../service/remote-service.service';
import { Geolocation, Geoposition, PositionError } from '@awesome-cordova-plugins/geolocation/ngx';
import {NavController, PopoverController, ActionSheetController, Platform, ModalController} from '@ionic/angular';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { LocationAccuracy } from '@awesome-cordova-plugins/location-accuracy/ngx';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

@Component({
  selector: 'app-signal-form',
  templateUrl: './signal-form.page.html',
  styleUrls: ['./signal-form.page.scss'],
})
export class SignalFormPage implements OnInit {
  formDataSignal = new FormData();
  signal = {
    file : "",
    typeSignal : "Accident",
    description : "",
    latitude : 0,
    longitude : 0,
    status : "Nouveau",
    date : new Date(),
    username : "",
  }
  take_photo;
  Alltypes = [];
  token;
  prise_photos = [];
  username;
  nbNotifs = 0;
  imgCaptured;
  sent = 0;
  type = "upload";
  options = {
    timeout: 20000, 
    enableHighAccuracy: true, 
    maximumAge: 3600
  };
    constructor(
    private apiService : RemoteServiceService,
    private geolocation: Geolocation,
    public modalController: ModalController,
    public actionSheetController: ActionSheetController,
    private camera: Camera,
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy,
    ) {}

  ngOnInit() {
    this.token = this.apiService.getUserDatas()?.accessToken;
    if(!this.token){
      this.apiService.navigate('/');
    }
    // this.test();
    this.locationAccPermission();
    this.getCurrentCoordinates();
    this.signal.username = this.apiService.getUserDatas()?.username;
    this.apiService.getAllTypeSignals(this.token).subscribe((e)=>{
      this.Alltypes = e;
    })
  }

  ionViewWillEnter(){
    this.sent = 0;
    this.token = this.apiService.getUserDatas()?.accessToken;
    if(!this.token){
      this.apiService.navigate('/');
    }
    this.username = this.apiService.getUserDatas().username;
    this.apiService.getNbNotifs(this.token,this.username).subscribe((e)=>{
      this.nbNotifs = e.length;
    })
  }


  locationAccPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => console.log('Has permission?',result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
    );
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
      result => console.log('Has permissionrest?',result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    );
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA,this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION]);
  }


  onFileChange(fileChangeEvent) {
    const photo = fileChangeEvent.target.files[0];
    this.imgCaptured = photo;
    this.type = "upload";
  }

  takePicture() {

    const options: CameraOptions = {
      quality: 30,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation : true
    }
    
    this.camera.getPicture(options).then((imageData) => {
      let blob = this.DataURIToBlob("data:image/png;base64,"+imageData);
      this.imgCaptured = blob;
      this.type = "camera";
      }, (err) => {
        alert("Erreur camera")
    });

  }
  
  sendSignal(){
      this.sent == 0;
      this.apiService.presentLoading();
      this.formDataSignal.append('typeSignal',this.signal.typeSignal);
      this.formDataSignal.append('description',this.signal.description);
      this.formDataSignal.append('latitude',this.signal.latitude.toString());
      this.formDataSignal.append('longitude',this.signal.longitude.toString());
      this.formDataSignal.append('status',this.signal.status);
      this.formDataSignal.append('date',this.signal.date.toUTCString());
      this.formDataSignal.append('username',this.signal.username);
      
      if(this.type =="upload"){
        this.formDataSignal.append("file", this.imgCaptured, "test_image");
      }else{
        this.formDataSignal.append("file", this.imgCaptured);
      }
      if(this.sent == 0){
        this.apiService.doSignal(this.formDataSignal,this.token).subscribe((e)=>{
          this.sent = 1;
          this.apiService.presentToast(e.message);
          if(e.message == "Saved successfully"){
            this.apiService.navigate('signalements');
            this.apiService.dismissLoading();
            this.formDataSignal = new FormData();
          }
        })
      }
  }

  DataURIToBlob(dataURI: string) {
          const splitDataURI = dataURI.split(',')
          const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
          const mimeString = splitDataURI[0].split(':')[1].split(';')[0]
  
          const ia = new Uint8Array(byteString.length)
          for (let i = 0; i < byteString.length; i++)
              ia[i] = byteString.charCodeAt(i)
  
          return new Blob([ia], { type: mimeString })
        }

  goNotifs(){
    this.apiService.navigate('notifications');
  }

  async currentLocPosition() {
    this.geolocation.getCurrentPosition().then((resp) => {
      
      this.signal.latitude = resp.coords.latitude;
      this.signal.longitude = resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
test(){
  let watch = this.geolocation.watchPosition();
watch.subscribe((data) => {
  console.log(data,'locccccccccccccc');
  
 // data can be a set of coordinates, or an error (if an error occurred).
 // data.coords.latitude
 // data.coords.longitude
});
}





getCurrentCoordinates() {  
  this.geolocation.getCurrentPosition(this.options).then((resp) => {
    this.signal.latitude = resp.coords.latitude;
    this.signal.longitude = resp.coords.longitude;

   }).catch((error) => {
     console.log('Error getting coordinates', error);
   });
}

}
