import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {Geolocation} from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  message: any;
  lat: any;
  lon: any;
  heading: any;
  speed: any;
  watchId: any;

  constructor(public navCtrl: NavController, public geo: Geolocation ) {
    this.message = "-";
    this.lat = "-";
    this.lon = "-";
    this.heading = "-";
    this.speed = "-";
  }

  startGeo(){
    let geoOption = { enableHighAccuracy: true};
    try {
      this.watchId = this.geo.watchPosition(geoOption).subscribe(data => {
        this.lat = data.coords.latitude;
        this.lon = data.coords.longitude;
        this.heading = data.coords.heading;
        this.speed = data.coords.speed;
      },
      error =>{
        this.message = "GPS error " + error;
      }
    );
    } catch (error) {
      alert("Error " + error);
      this.message = "Error " + error;
    }
  }

  stopGeo(){
    this.watchId.unsubscribe();
  }

}
