import { Injectable } from '@angular/core'
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { ToastController } from '@ionic/angular'
import { createClient, SupabaseClient, } from '@supabase/supabase-js'
import { environment } from '../../environments/environment'
import { decode } from 'base64-arraybuffer'

@Injectable({
  providedIn: 'root'
})
export class StorageSupabaseService {
  private supabase: SupabaseClient;
  constructor(private toastCtrl: ToastController) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  async storage_upload(storage_path: string) {
    const capturedPhoto = await Camera.getPhoto({
      //resultType: CameraResultType.Uri,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100});
      const aa = decode(capturedPhoto.base64String!);
    const { data, error } = await this.supabase
    .storage
    .from('aubimedia')
    .upload(storage_path, decode(capturedPhoto.base64String!), {
      cacheControl: '3600',
      upsert: true
    })
  }
  
  existsHttpFile(url:string) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
  }
  
  async storage_download(file:string) {
    const { data, error } = await this.supabase
    .storage
    .from('aubimedia')
    .download(file)
    return { data, error }
  }
  async createNotice(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 5000 })
    await toast.present()
  }

  get user() : any {
    //return this.supabase.auth.getUser()
    return "1"
  }
}