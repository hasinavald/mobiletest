import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

export class User {
  username: string;
  password: string;
  email: string;
  role: Array<string>;
  region : string;
}

export class UserLogin {
  username: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})


export class RemoteServiceService {
  
  userDatas;
  httpHeader = {};
  token;
  constructor(
    private http: HttpClient,
    public toastController: ToastController,
    private router: Router,
    public loadingController: LoadingController,
    private camera : Camera,
    ) {
    console.log(this.userDatas);
    
    this.httpHeader = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',"Authorization" : "Bearer "+ this.token})
    };

   }


  addUser(User: User): Observable<any> {
    return this.http.post<User>(environment.apiAuth+"signup", User, this.httpHeader)
      .pipe(
        catchError(this.handleError<User>('Add User'))
      );
  }
  getUser(id): Observable<User[]> {
    return this.http.get<User[]>('api-goes-here/' + id)
      .pipe(
        tap(_ => console.log(`User fetched: ${id}`)),
        catchError(this.handleError<User[]>(`Get User id=${id}`))
      );
  }
  getUserList(): Observable<User[]> {
    return this.http.get<User[]>('api-goes-here/')
      .pipe(
        tap(User => console.log('User fetched!')),
        catchError(this.handleError<User[]>('Get User', []))
      );
  }
  updateUser(id, User: User): Observable<any> {
    return this.http.put('api-goes-here/' + id, User, this.httpHeader)
      .pipe(
        tap(_ => console.log(`User updated: ${id}`)),
        catchError(this.handleError<User[]>('Update User'))
      );
  }
  deleteSignals(token,datas): Observable<User[]> {
    var httpHeader = {
      headers: new HttpHeaders({ 'enctype': 'multipart/form-data',"Authorization" : "Bearer "+token})
    };
    return this.http.delete<User[]>(environment.apiUrl + 'signal/delete/'+datas.id, httpHeader)
      .pipe(
        tap(_ => console.log(`User deleted`)),
        catchError(this.handleError<User[]>('Delete User'))
      );
  }


  getAllRegions(): Observable<User[]> {
    return this.http.post<any[]>(environment.apiUrl + 'region/all', this.httpHeader)
      .pipe(
        tap(_ => console.log(`Region gettes`)),
        catchError(this.handleError<User[]>('Delete User'))
      );
  }

  getMySignals(token): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl + 'signal/all', this.httpHeader)
      .pipe(
        tap(_ => console.log(`Region gettes`)),
        catchError(this.handleError<User[]>('Delete User'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  public async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  public navigate(page) {
    this.router.navigate(['/'+page])
  }

  login(User: UserLogin): Observable<any> {
    return this.http.post<User>(environment.apiAuth+"signin", User, this.httpHeader)
      .pipe(
        catchError(this.handleError<User>('User login'))
      );
  }

  doSignal(signal: any,token): Observable<any> {
    var httpHeader = {
      headers: new HttpHeaders({ 'enctype': 'multipart/form-data',"Authorization" : "Bearer "+token})
    };
    console.log(httpHeader,'headerrrrr');
    return this.http.post<any>(environment.apiUrl+"signal/postsignal", signal, httpHeader)
      .pipe(
        catchError(this.handleError<User>('User login'))
      );
  }

  getAllTypeSignals(token): Observable<any> {
    var httpHeader = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',"Authorization" : "Bearer "+ token})
    };
    return this.http.get<any>(environment.apiUrl+"typesignal/all", httpHeader)
      .pipe(
        catchError(this.handleError<User>('User login'))
      );
  }

  getAllMySignals(token,username): Observable<any> {
    var httpHeader = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',"Authorization" : "Bearer "+ token})
    };
    return this.http.get<any>(environment.apiUrl+"signal/findbyuserpost?username="+username, httpHeader)
      .pipe(
        catchError(this.handleError<User>('User login'))
      );
  }

  getSIgnal(token,id): Observable<any> {
    var httpHeader = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',"Authorization" : "Bearer "+ token})
    };
    return this.http.get<any>(environment.apiUrl+"signal/one/"+id, httpHeader)
      .pipe(
        catchError(this.handleError<User>('User login'))
      );
  }


  setSeenSignal(token,id): Observable<any> {
    var httpHeader = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',"Authorization" : "Bearer "+ token}),
    };
    return this.http.put<any>(environment.apiUrl+"signal/client/seen?id="+id,1, httpHeader)
      .pipe(
        catchError(this.handleError<User>('User login'))
      );
  }

  getNbNotifs(token,username): Observable<any> {
    var httpHeader = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',"Authorization" : "Bearer "+ token})
    };
    return this.http.get<any>(environment.apiUrl+"signal/client?username="+username, httpHeader)
      .pipe(
        catchError(this.handleError<User>('User login'))
      );
  }

  setUserDatas(usrData){
    this.userDatas = usrData;
  }

  getUserDatas(){
    return this.userDatas;
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'Loadingss',
      message: 'Chargement...',
      duration: 2000
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

   dismissLoading() {
   this.loadingController.dismiss()
  }


  TakeImage() {
    const options: CameraOptions = {
     quality: 100,
     destinationType: this.camera.DestinationType.DATA_URL,
     encodingType: this.camera.EncodingType.JPEG,
     mediaType: this.camera.MediaType.PICTURE,
     targetWidth: 200,
     targetHeight: 200,
     saveToPhotoAlbum: false,
   };
   return this.camera.getPicture(options)
 }

 logout(){
   this.userDatas = null;
 }
  
}
