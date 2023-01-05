import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { iEmpresa } from '../interfaces/iEmpresa';
//import { SupabaseService } from '../supabase.service'
import { PostgrestError } from '@supabase/supabase-js';
import { EmpresaDataService } from '../services/empresa-data.service';
import { AuthService } from '../services/auth.service'
import { StorageSupabaseService } from '../services/storage-supabase.service';
import { NoDataRowOutlet } from '@angular/cdk/table';

@Component({
  selector: 'app-empreses',
  templateUrl: './empreses.page.html',
  styleUrls: ['./empreses.page.scss'],
})
export class EmpresesPage implements OnInit {
  profileEmpresa! : iEmpresa;
  empresaForm!: FormGroup;
  usuariUUID = "";
  usuariEMAIL = "";
  usuariID = "";
   
  constructor(private fb: FormBuilder, private storageDS:StorageSupabaseService, private location: Location, private empresaDS:EmpresaDataService, private readonly supabase: AuthService) {
  }
  
 
  ngOnInit():void  {
     this.loadEmpresa();
  }
  setFormEmpresa() {
    this.empresaForm = this.fb.group({
      EmpresaNom:[this.profileEmpresa.name, Validators.required],
      EmpresaNIF:[this.profileEmpresa.nif, Validators.required],
      EmpresaEmail:[this.profileEmpresa.email, [Validators.required, Validators.email]],
      EmpresaCP:[this.profileEmpresa.zip_code_id, Validators.required],
      //EmpresaPoblacio:[this.profileEmpresa.EmpresaPoblacio, Validators.required],
      //EmpresaProvincia:[this.profileEmpresa.EmpresaProvincia, Validators.required],
      //EmpresaPais:[this.profileEmpresa.EmpresaPais, Validators.required],
      EmpresaTelefon:[this.profileEmpresa.phone, Validators.required],
      EmpresaLogo:[this.profileEmpresa.logo]
    });    
  }

  async onSubmit() {
    this.profileEmpresa!.name=this.empresaForm.get('EmpresaNom')?.value!;
    this.profileEmpresa!.nif=this.empresaForm.get('EmpresaNIF')?.value!;
    this.profileEmpresa!.email=this.empresaForm.get('EmpresaEmail')?.value!;
    this.profileEmpresa!.zip_code_id=this.empresaForm.get('EmpresaCP')?.value!;
    //this.profileEmpresa!.EmpresaPoblacio=this.empresaForm.get('EmpresaPoblacio')?.value!;
    //this.profileEmpresa!.EmpresaProvincia=this.empresaForm.get('EmpresaProvincia')?.value!;
    //this.profileEmpresa!.EmpresaPais=this.empresaForm.get('EmpresaPais')?.value!;
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
  onChange($event){
    console.log($event.target.value);
  }
  getCP($event){
    console.log($event.detail);
    console.log($event.target.value);
  }

  async loadEmpresa() {
    const x = await this.supabase.user1;
    this.usuariUUID = x.data.user.id;
    this.usuariEMAIL = x.data.user.email;
    this.usuariID = await this.supabase.profile_uuid();
    this.profileEmpresa = await this.empresaDS.empresa_getbyuserid(this.usuariID) as unknown as iEmpresa;
    if (this.profileEmpresa==null){
      //crear empresa
      const emp:iEmpresa={
        id: undefined,
        name: '',
        nif: '',
        email: '',
        user_id: '',
        zip_code_id: '',
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