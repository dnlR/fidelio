import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TerminalDataService } from '../services/terminal-data.service';
import { iTerminal, iTerminalList } from '../interfaces/iTerminal';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-terminals',
  templateUrl: './terminals.page.html',
  styleUrls: ['./terminals.page.scss'],
})
export class TerminalsPage implements OnInit {
  llistatTerminals!: iTerminalList[];
  constructor(private terminalDS: TerminalDataService, private location: Location, private router: Router) { }

  async ngOnInit() {
    this.llistatTerminals = await this.terminalDS.terminal_getallbyEmpID(this.getUserEmpresa());
    //console.log(this.llistatTerminals[0].TerminalNom);
    //this.terminalDS._test_campanya_insupd()
  }
  goBack(): void {
    this.router.navigate(["/menu-empresari"]);
  }
  addTerminal(): void {
    this.router.navigate(["/terminals/terminal-details/",this.getUserEmpresa(),"0"]);
  }
  getUserEmpresa():string {
    return ("1")
  }
}
