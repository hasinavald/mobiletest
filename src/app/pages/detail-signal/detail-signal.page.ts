import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RemoteServiceService } from '../../service/remote-service.service';
@Component({
  selector: 'app-detail-signal',
  templateUrl: './detail-signal.page.html',
  styleUrls: ['./detail-signal.page.scss'],
})
export class DetailSignalPage implements OnInit {
  id;
  token;
  data;
  constructor(private activatedRoute: ActivatedRoute,private apiService : RemoteServiceService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.id = +paramMap.get('id');
      this.token = this.apiService.getUserDatas()?.accessToken;
      if(!this.token){
        this.apiService.navigate('/');
      }
      this.apiService.getSIgnal(this.token,this.id).subscribe((res)=>{
        this.data = res;
        if(this.token){
          // this.apiService.setSeenSignal(this.token,this.id).subscribe((res)=>{
          // })
        }
        
      })
    });
  }

}
