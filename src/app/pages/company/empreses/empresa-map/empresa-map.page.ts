import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { Geocoder, GeocoderRequest } from '@ionic-native/google-maps';
import { EmpresaDataService } from '../../../../services/empresa-data.service';
import { iEmpresa } from 'src/app/interfaces/iEmpresa';
import { GeoService } from 'src/app/services/geo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empresa-map',
  templateUrl: './empresa-map.page.html',
  styleUrls: ['./empresa-map.page.scss'],
})
export class EmpresaMapPage implements OnInit {
  
  @ViewChild('map') mapRef!: ElementRef<HTMLElement>;
  newMap!: GoogleMap;
  markersArray:string[]=[];
  constructor(private nativeGeocoder: NativeGeocoder, private router: Router, private empresaDS:EmpresaDataService, private geoS:GeoService) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.createMap();
  }

  async createMap() {
    let clat:number=0;
    let clng:number=0;
    const userLoc = await this.geoS.cuurentLocation()
    if (userLoc.coords.accuracy<1000) {
       clat = userLoc.coords.latitude
       clng = userLoc.coords.longitude
    }
    else {
      //Catalunya
      clat = 41.5235
      clng = 2.16035
    }
    this.newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: this.mapRef.nativeElement,
      apiKey: environment.googlemapsapi,
      config: {
        center: {
          lat: clat,
          lng: clng
        },
        zoom: 12,
      }
    })
    this.newMap.setOnBoundsChangedListener((event)=>{
      console.log(event);
      this.displayMarksonCurrentMap();
    })
    // const x = await this.addMarker("Empresa1", "Cafe Gratis para todos", "https://jvavmszzitymsnzrvhth.supabase.co/storage/v1/object/public/fidelio/empresa/8bea29ee-2570-4b0d-82de-4e30f21f0529.jpg",41.6694821,  2.7660104);
    // const xx = await this.addMarker("Empresa2", "Cafe Gratis para todos", "https://jvavmszzitymsnzrvhth.supabase.co/storage/v1/object/public/fidelio/empresa/8bea29ee-2570-4b0d-82de-4e30f21f0529.jpg",41.6694821,  2.7860104);
    // const xxx = await this.addMarker("Empresa3", "Cafe Gratis para todos", "https://jvavmszzitymsnzrvhth.supabase.co/storage/v1/object/public/fidelio/empresa/8bea29ee-2570-4b0d-82de-4e30f21f0529.jpg",41.694829,  2.7160104);
  }
  // async callback(event) {
  //   console.log(event);
  //   await this.displayMarksonCurrentMap()
  // }

  async addMarker(t:string, sn:string, iconURL:string, lat: number, lon:number): Promise<string> {
      const markerid:string = await this.newMap.addMarker({
        coordinate: {
          lat:lat,
          lng:lon
        },
        draggable: false,
        title: t,
        snippet: sn,
        iconUrl: iconURL,
        iconSize:{width: 25, height:25}
      })
      return (markerid)
  }
  async displayMarksonCurrentMap() {
  const cc= await this.newMap.getMapBounds();
  console.log(cc);
  const toMarkinMap = await this.empresaDS.empresa_getformap(cc.southwest.lat, cc.southwest.lng, cc.northeast.lat, cc.northeast.lng)
  console.log(toMarkinMap)
  console.log(this.markersArray)
  this.newMap.removeMarkers(this.markersArray)
  this.markersArray=[]
  toMarkinMap.forEach(async e => {
    const ee:iEmpresa=e;
    this.markersArray.push(await this.addMarker(ee.name, ee.name, ee.logo, ee.coor_lat, ee.coor_lng))
    console.log(this.markersArray)
  });
}
goBack(): void {
  this.router.navigate(["/menu-empresari"]);
}
}
