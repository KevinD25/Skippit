import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-detail-tab',
  templateUrl: './detail-tab.page.html',
  styleUrls: ['./detail-tab.page.scss'],
})
export class DetailTabPage implements OnInit {

  private id:string;
  establishment:any;

  constructor(private route: ActivatedRoute, private data: DataService) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.establishment = data.getInfo(this.id);
    console.log(this.id);
    console.log(this.establishment);
    console.log(this.establishment.lat); 
  }

  ngOnInit() {
  }

}
