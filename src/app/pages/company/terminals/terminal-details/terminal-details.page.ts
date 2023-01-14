import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TerminalDataService } from '../../../../services/terminal-data.service';
import { iTerminal, iTerminalList } from '../../../../interfaces/iTerminal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageSupabaseService } from '../../../../services/storage-supabase.service';
//import { delay } from 'rxjs';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-terminal-details',
  templateUrl: './terminal-details.page.html',
  styleUrls: ['./terminal-details.page.scss'],
})
export class TerminalDetailsPage implements OnInit {
  terminal!:iTerminal;
  terminalDetailForm!: FormGroup;
  empID!:string;
  terID!:string;
  defTUSER:string="L'usuari es genera automaticament despres de guardar els canvis";

    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private terminalDS: TerminalDataService,
      private location: Location,
      private fb: FormBuilder,
      private utilsSvc:UtilsService,
      private storageDS:StorageSupabaseService
     ){}
  
    ngOnInit() {
      this.getterminal();
    }
  
  generateTerminalUser():string {
    const x=this.empID + this.terID;
    const s = this.utilsSvc.str2SHA256(x);
    return(s)
  }
  
  setFormterminalDetail() {
    if (this.terID!="0") {
      const x = this.generateTerminalUser()
      if (x!=this.terminal.terminal_user) {
        //Guardem a la bd el user
        this.terminal.terminal_user=x;
        this.terminalDS.terminal_insupd(this.terminal); 
      }
    }
    this.terminalDetailForm = this.fb.group({
        terminalNom:[this.terminal.name, Validators.required],
        terminalDescripcio:[this.terminal.description],
        terminalTimeOut:[this.terminal.timeout, Validators.required],
        terminalUser:[this.terminal.terminal_user],
        terminalPassword:[this.terminal.terminal_password, Validators.required],
        terminalActiu:[this.terminal.active, Validators.required],
      });    
    }
    
    async getterminal(): Promise<void> {
      this.empID = this.route.snapshot.paramMap.get('empID')!;
      this.terID = this.route.snapshot.paramMap.get('terID')!;
      if (this.terID!="0") {
        this.terminal = await this.terminalDS.terminal_getbyid(this.empID, this.terID);
      }
      else {
        const ter:iTerminal={
          company_id: Number(this.empID),
          id: 0,
          name: '',
          description: '',
          terminal_user: this.defTUSER,
          terminal_password: '',
          active: true,
          timeout: 60, //segons
          modification_date: new Date(),
          modification_user_id: ''
        }
        this.terminal=ter;
      }
      this.setFormterminalDetail();
    }
  
    goBack(): void {
      this.location.back();
    }
  
    async onSubmit() {
      this.terminal.name=this.terminalDetailForm.get('terminalNom')?.value!;
      this.terminal.description=this.terminalDetailForm.get('terminalDescripcio')?.value!;
      this.terminal.active=this.terminalDetailForm.get('terminalActiu')?.value!;
      this.terminal.timeout=this.terminalDetailForm.get('terminalTimeOut')?.value!;
      this.terminal.terminal_password=this.terminalDetailForm.get('terminalPassword')?.value!;
      this.terminal.terminal_user=this.generateTerminalUser();
      console.log(this.terminal);
      const er = await this.terminalDS.terminal_insupd(this.terminal);
      if (er!=null)
        await this.storageDS.createNotice(er.message);
      else
        await this.storageDS.createNotice('Canvis guardats correctament');
      //this.location.back();
      this.router.navigate(['/terminals', this.empID]);
    }
  
  }
  