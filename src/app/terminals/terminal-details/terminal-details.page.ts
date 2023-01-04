import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TerminalDataService } from '../../services/terminal-data.service';
import { iTerminal, iTerminalList } from '../../interfaces/iTerminal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageSupabaseService } from '../../services/storage-supabase.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-terminal-details',
  templateUrl: './terminal-details.page.html',
  styleUrls: ['./terminal-details.page.scss'],
})
export class TerminalDetailsPage implements OnInit {
  terminal!:iTerminal;
  terminalDetailForm!: FormGroup;
  empID!:string;
    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private terminalDS: TerminalDataService,
      private location: Location,
      private fb: FormBuilder,
      private storageDS:StorageSupabaseService
     ){}
  
    ngOnInit() {
      this.getterminal();
    }
  
  setFormterminalDetail() {
      this.terminalDetailForm = this.fb.group({
        terminalNom:[this.terminal.name, Validators.required],
        terminalDescripcio:[this.terminal.description],
        terminalTimeOut:[this.terminal.timeout, Validators.required],
        terminalPassword:[this.terminal.terminal_password, Validators.required],
        terminalActiu:[this.terminal.active, Validators.required],
      });    
    }
    
    async getterminal(): Promise<void> {
      this.empID = this.route.snapshot.paramMap.get('empID')!;
      const terID : string = this.route.snapshot.paramMap.get('terID')!;
      if (terID!="0") {
        this.terminal = await this.terminalDS.terminal_getbyid(this.empID, terID);
      }
      else {
        const ter:iTerminal={
          company_id: Number(this.empID),
          id: 0,
          name: '',
          description: '',
          terminal_password: '',
          active: true,
          timeout: 60, //segons
          modification_date: new Date(),
          modification_user: ''
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
  