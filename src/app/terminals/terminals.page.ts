import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TerminalDataService } from '../services/terminal-data.service';
import { iTerminal, iTerminalList } from '../interfaces/iTerminal';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-terminals',
  templateUrl: './terminals.page.html',
  styleUrls: ['./terminals.page.scss'],
})
export class TerminalsPage implements OnInit {
  llistatTerminals!: iTerminalList[];
  empID!:string;
  constructor(private terminalDS: TerminalDataService, private location: Location, private router: Router, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.empID = this.route.snapshot.paramMap.get('empID')!;
    this.llistatTerminals = await this.terminalDS.terminal_getallbyEmpID(this.empID);
    //console.log(this.llistatTerminals[0].TerminalNom);
    //this.terminalDS._test_campanya_insupd()
  }
  goBack(): void {
    this.router.navigate(["/menu-empresari"]);
  }
  addTerminal(): void {
    this.router.navigate(["/terminals/terminal-details/",this.empID,"0"]);
  }
}
