import { Injectable } from '@angular/core';
import { Geocoder, GeocoderRequest } from '@ionic-native/google-maps';
//import { Geocoder, GeocoderRequest } from '@ionic-native/google-maps';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@capacitor/geolocation';
// npm install @capacitor/geolocation
// npx cap sync

@Injectable({
  providedIn: 'root'
})
export class GeoService {

  constructor(private nativeGeocoder: NativeGeocoder, private geocoder: Geocoder) { }
  
  async ggdecode(address:string):Promise<any>{
    //npm install --save @types/google.maps
    const geocoder = new google.maps.Geocoder();
    return geocoder.geocode({
         address: address
     }) 
  }
  async ggdecode1(address:string):Promise<[number, number]|null>{
    //const address = "111 Wellington St, Ottawa, ON K1A 0A9, Canada";   
    const pr:Promise<[number, number]|null> = new Promise((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({
          address: address
      }, (results, status) => {
          if (status == google.maps.GeocoderStatus.OK) {
            console.log(results![0].geometry.location.lat());
            console.log(results![0].geometry.location.lng());
            resolve([results![0].geometry.location.lat(), results![0].geometry.location.lng()])
          } else {
              //alert('Geocode was not successful for the following reason: ' + status);
              reject(null)
          }
        });
    })
    return(pr);
  }
  async cuurentLocation() {
    return(await Geolocation.getCurrentPosition())
  }
}
