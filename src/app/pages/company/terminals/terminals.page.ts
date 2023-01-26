import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TerminalDataService } from '../../../services/terminal-data.service';
import { iTerminal, iTerminalList } from '../../../interfaces/iTerminal';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-terminals',
  templateUrl: './terminals.page.html',
  styleUrls: ['./terminals.page.scss'],
})
export class TerminalsPage implements OnInit {
  llistatTerminals!: iTerminalList[];
  empID!: string;
  constructor(private terminalDS: TerminalDataService, private location: Location, private router: Router, private route: ActivatedRoute, private msgService: MessageService) { }

  async ionViewWillEnter() {
    this.empID = this.route.snapshot.paramMap.get('empID')!;
    this.llistatTerminals = await this.terminalDS.terminal_getallbyEmpID(this.empID);
  }

  async ngOnInit() {
    this.msgService.sendTitleMsg('Empresa > Terminal');
  }
  
  goBack(): void {
    this.router.navigate(["/menu-empresari"]);
  }
  
  addTerminal(): void {
    this.router.navigate(["/terminals/terminal-details/", this.empID, "0"]);
  }
}
