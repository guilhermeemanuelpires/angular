import { Component, OnInit } from '@angular/core';
import { CidadeService } from '../_service/cidade.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {

  public markers = [];

  public lat: number = 0;
  public lng: number = 0;

  constructor(private service: CidadeService) { }

  ngOnInit() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }

    this.service.find().subscribe(result => {
      this.markers = result;
    }, error => {
      console.log(error.message);
    });

  }



}
