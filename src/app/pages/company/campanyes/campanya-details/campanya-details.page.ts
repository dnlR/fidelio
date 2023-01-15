import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CampanyaDataService } from '../../../../services/campanya-data.service';
import { iCampanya, iCampanyaList } from '../../../../interfaces/iCampanya';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageSupabaseService } from '../../../../services/storage-supabase.service';
//import { ColorPickerModule } from 'ngx-color-picker';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-campanya-details',
  templateUrl: './campanya-details.page.html',
  styleUrls: ['./campanya-details.page.scss'],
})
export class CampanyaDetailsPage implements OnInit {
  campanya!: iCampanya;
  campanyaDetailForm!: FormGroup;
  empID!:string;
  camID!:string;
  public color = 'rgba(48, 48, 48, 1)';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private campanyaDS: CampanyaDataService,
    private location: Location,
    private fb: FormBuilder,
    private storageDS:StorageSupabaseService,
    private utilsSvc:UtilsService,
   ){}

ngOnInit() {
    this.getCampanya();
  }

setFormCampanyaDetail() {
    this.campanyaDetailForm = this.fb.group({
      CampanyaNom:[this.campanya.name, Validators.required],
      CampanyaTipus:[this.campanya.type],
      CampanyaActiva:[this.campanya.active],
      CampanyaTarjetaColor:[this.campanya.card_color],
      CampanyaTarjetaImatgePrincipal:[this.campanya.card_main_image],
      CampanyaTarjetaTitulo:[this.campanya.card_title, Validators.required],
      CampanyaTarjetaSubTitulo:[this.campanya.card_subtitle],
      CampanyaTarjetaNotaPie:[this.campanya.card_subtitle],
      CampanyaTarjetaLogo:[this.campanya.card_logo],
      CampanyaTarjetaPunts:[this.campanya.card_points, Validators.required],
      CampanyaDescripcioPublica:[this.campanya.description],
      CampanyaCondicionsLegals:[this.campanya.conditions],
    });
  }
   
  async getCampanya(): Promise<void> {
    this.empID = this.route.snapshot.paramMap.get('empID')!;
    this.camID = this.route.snapshot.paramMap.get('camID')!;
    if (this.camID!="0") {
      this.campanya = await this.campanyaDS.campanya_getbyid(this.empID, this.camID);
    }
    else {
      const cam:iCampanya={
          company_id:Number(this.empID),
          id:0,
          name:"",
          type:"S",
          active:true,
          card_color:"rgba(48, 48, 48, 1)",
          card_main_image:"",//URL storage
          card_title:"",
          card_subtitle:"",
          card_foot_note:"",
          card_logo:"",//URL storage
          card_points:10,
          description:"",
          conditions:"",
          modification_date:new Date(),
          modification_user_id:""    
      }
      this.campanya=cam;
    }
    this.setFormCampanyaDetail();
  }

  goBack(): void {
    this.location.back();
  }

  async add_card_main_image() {
    //const b = this.existsHttpFile("https://nzuvywtkatghqhczkckv.supabase.co/storage/v1/object/public/aubimedia/empresa/" + tuser + ".jpg")
    const { data, error } = await this.storageDS.storage_upload("campanya/camimg_" + this.camID + ".jpg");
    this.campanya.card_main_image = data.path + "?t=" + Date();
  }
  remove_card_main_image(){
    this.campanya.card_main_image = null;
  }

  async add_card_logo() {
    //const b = this.existsHttpFile("https://nzuvywtkatghqhczkckv.supabase.co/storage/v1/object/public/aubimedia/empresa/" + tuser + ".jpg")
    const { data, error } = await this.storageDS.storage_upload("campanya/camlogo_" + this.camID + ".jpg");
    this.campanya.card_logo = data.path + "?t=" + Date();
  }
  remove_card_logo(){
    this.campanya.card_logo = null;
  }

async onSubmit() {
    //console.log(this.campanyaDetailForm.get('CampanyaTarjetaColor')?.value!);
    this.campanya.name=this.campanyaDetailForm.get('CampanyaNom')?.value!;
    this.campanya.type=this.campanyaDetailForm.get('CampanyaTipus')?.value!;
    this.campanya.active=this.campanyaDetailForm.get('CampanyaActiva')?.value!;
    //this.campanya.CampanyaTarjetaColor=this.campanyaDetailForm.get('CampanyaTarjetaColor')?.value!;
    this.campanya.card_title=this.campanyaDetailForm.get('CampanyaTarjetaTitulo')?.value!;
    this.campanya.card_subtitle=this.campanyaDetailForm.get('CampanyaTarjetaSubTitulo')?.value!;
    this.campanya.card_subtitle=this.campanyaDetailForm.get('CampanyaTarjetaNotaPie')?.value!;
    //this.campanya.card_logo=this.campanyaDetailForm.get('CampanyaTarjetaLogo')?.value!;
    this.campanya.card_points=this.campanyaDetailForm.get('CampanyaTarjetaPunts')?.value!;
    this.campanya.description=this.campanyaDetailForm.get('CampanyaDescripcioPublica')?.value!;
    this.campanya.conditions=this.campanyaDetailForm.get('CampanyaCondicionsLegals')?.value!;
    //this.campanya.card_main_image=this.campanyaDetailForm.get('CampanyaTarjetaImatgePrincipal')?.value!;
    console.log(this.campanya);
    const er = await this.campanyaDS.campanya_insupd(this.campanya);
    if (er!=null)
      await this.storageDS.createNotice(er.message);
    else
      await this.storageDS.createNotice('Canvis guardats correctament');
  this.router.navigate(['/campanyes',this.empID]);
  }

}
