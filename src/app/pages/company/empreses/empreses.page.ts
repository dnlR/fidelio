import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { iEmpresa } from '../../../interfaces/iEmpresa';
//import { SupabaseService } from '../supabase.service'
//import { PostgrestError } from '@supabase/supabase-js';
import { EmpresaDataService } from '../../../services/empresa-data.service';
import { AuthService } from '../../../services/auth.service'
import { ZipCodesService } from '../../../services/zip-codes.service'
import { StorageSupabaseService } from '../../../services/storage-supabase.service';
//import { NoDataRowOutlet } from '@angular/cdk/table';


@Component({
  selector: 'app-empreses',
  templateUrl: './empreses.page.html',
  styleUrls: ['./empreses.page.scss'],
})
export class EmpresesPage implements OnInit {
  profileEmpresa! : iEmpresa;
  empresaForm!: FormGroup;
  usuariEMAIL = "";
  usuariID = "";
  CPOldValue = "";
  constructor(private fb: FormBuilder, private storageDS:StorageSupabaseService, private location: Location, private empresaDS:EmpresaDataService, private readonly supabase: AuthService, private zipDS:ZipCodesService) {
  }
  
 
  ngOnInit():void  {
     this.loadEmpresa();
  }
  setFormEmpresa() {
    this.empresaForm = this.fb.group({
      EmpresaNom:[this.profileEmpresa.name, Validators.required],
      EmpresaNIF:[this.profileEmpresa.nif, Validators.required],
      EmpresaEmail:[this.profileEmpresa.email, [Validators.required, Validators.email]],
      EmpresaAdreca:[this.profileEmpresa.address, [Validators.required]],
      EmpresaCP:[this.profileEmpresa.zip_code_id, Validators.required],
      EmpresaPoblacio:[this.profileEmpresa.city, Validators.required],
      EmpresaProvincia:[this.profileEmpresa.region, Validators.required],
      EmpresaPais:[this.profileEmpresa.country, Validators.required],
      EmpresaTelefon:[this.profileEmpresa.phone, Validators.required],
      EmpresaLogo:[this.profileEmpresa.logo]
    });    
  }

  async onSubmit() {
    this.profileEmpresa!.name=this.empresaForm.get('EmpresaNom')?.value!;
    this.profileEmpresa!.nif=this.empresaForm.get('EmpresaNIF')?.value!;
    this.profileEmpresa!.email=this.empresaForm.get('EmpresaEmail')?.value!;
    this.profileEmpresa!.address=this.empresaForm.get('EmpresaAdreca')?.value!;
    this.profileEmpresa!.zip_code_id=this.empresaForm.get('EmpresaCP')?.value!;
    this.profileEmpresa!.city=this.empresaForm.get('EmpresaPoblacio')?.value!;
    this.profileEmpresa!.region=this.empresaForm.get('EmpresaProvincia')?.value!;
    this.profileEmpresa!.country=this.empresaForm.get('EmpresaPais')?.value!;
    this.profileEmpresa!.phone=this.empresaForm.get('EmpresaTelefon')?.value!;
    //this.profileEmpresa!.logo=this.empresaForm.get('EmpresaLogo')?.value!;
    console.log(this.profileEmpresa);
    const er = await this.empresaDS.empresa_insupd(this.profileEmpresa);
    if (er!=null)
      await this.storageDS.createNotice(er.message);
    else
      await this.storageDS.createNotice('Canvis guardats correctament');
    this.goBack();
  }
  goBack(): void {
    this.location.back();
  }
  async addLogo() {
    //const b = this.existsHttpFile("https://nzuvywtkatghqhczkckv.supabase.co/storage/v1/object/public/aubimedia/empresa/" + tuser + ".jpg")
    const { data, error } = await this.storageDS.storage_upload("empresa/" + this.usuariID + ".jpg");
    this.profileEmpresa.logo = data.path + "?t=" + Date();
  }
  removeLogo(){
    this.profileEmpresa.logo = null;
  }
  onFocus($event){
    this.CPOldValue=$event.target.value;
  }
  async getCP($event){
    //console.log($event.detail);
    if ($event.target.value!=this.CPOldValue) {
      //Get ZIP details
      console.log($event.detail);
      const d = await this.zipDS.zip_getbycode("ES", this.empresaForm.get('EmpresaCP')?.value)
      if (d.length>0) {
        this.empresaForm.get('EmpresaPoblacio').setValue(d[0].city);
        this.empresaForm.get('EmpresaProvincia').setValue(d[0].province);
        this.empresaForm.get('EmpresaPais').setValue("España");
      }
      else {
        this.empresaForm.get('EmpresaPoblacio').setValue("");
        this.empresaForm.get('EmpresaProvincia').setValue("");
        this.empresaForm.get('EmpresaPais').setValue("");
      }
    }
  }

  async loadEmpresa() {
    const x = await this.supabase.getUser();
    this.usuariEMAIL = x.email;
    this.usuariID = x.id;
    this.profileEmpresa = await this.empresaDS.empresa_getbyuserid(this.usuariID) as unknown as iEmpresa;
    if (this.profileEmpresa==null){
      //crear empresa
      const emp:iEmpresa={
        id: undefined,
        name: '',
        nif: '',
        email: '',
        uuser_id: '',
        address: '',
        zip_code_id: '',
        city:'',
        region:'',
        country:'',
        phone: '',
        logo: '',
        active: true,
        modification_date: new Date(),
        modification_user_id: ''
      }
    this.profileEmpresa=emp;
    }
    this.setFormEmpresa();
   }
}