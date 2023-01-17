import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ChartData} from 'chart.js';
import { CampaignService } from 'src/app/services/campaign.service';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {

  //datos prueba pie chart
  piePrueba: ChartData<'pie', number[], string | string[]> = {
    labels: [  'Juan', 'Pepe' ],
    datasets: [ {
      data: [ 84, 134 ]
    } ]
  };
//pie chart: participacion usuarios
  pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [{data:[]}]
  };
//line chart: uso campaña en el tiempo
  lineChartData: ChartData<'line', number[], string | string[]> = {
    labels: [],
    datasets: [{data:[]}]
  };
//bar chart: premios por usuario
  barChartData: ChartData<'bar', number[], string | string[]> = {
    labels: [],
    datasets: [{data:[]}]
  }; 

  campaign!: any;
  campaign_id!: number;  
  company_id!: number;
  terminal_id!: number;

  constructor(private transactionsService: TransactionsService,
              private campaignService: CampaignService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.company_id = this.route.snapshot.params['company'];   
    this.terminal_id = this.route.snapshot.params['terminal'];
    this.campaign_id = this.route.snapshot.params['campaign'];

    //Obtener datos campaña
    this.campaignService.getCampaign(+this.campaign_id)
                    .then((response) => {this.campaign = response!;
                                          console.log(this.campaign);});
    //Obtener datos participacion clientes
    this.transactionsService.getTransactionByCustomer(this.campaign_id)
                              .then((response) => {
                                let listaValores :number[] = [];
                                let listaLabels: string[] = [];                             
                                response.forEach((campo) => {
                                          listaValores.push(campo.total);
                                          listaLabels.push(campo.name);
                                          //this.pieChartData2.datasets[0]['data'].push(campo.total);
                                          //this.pieChartData2.datasets[0].data =campo.total
                                          //this.pieChartData2.labels.push(campo.name);
                                });     
                               
                                let pieChartData: ChartData<'pie', number[], string | string[]> = {
                                  labels: listaLabels,
                                  datasets: [ {                                    
                                    data: listaValores
                                  } ]
                                };
                                this.pieChartData = pieChartData;
                            });   

      //Obtener datos transacciones por dia
      this.transactionsService.getTransactionByDay(this.campaign_id)
                              .then((response) => {
                              let listaValores: number[] = [];
                              let listaLabels: string[] = [];                              
                              response.forEach((campo) => { 
                                          listaValores.push(campo.total);                                         
                                          listaLabels.push(campo.date_trunc.split('T',1));
                              })
                                let lineChartData: ChartData<'line', number[], string | string[]> = {
                                  labels: listaLabels,
                                  datasets: [ {
                                    label: 'Uso campaña',
                                    data: listaValores,
                                  } ]
                                };
                                this.lineChartData = lineChartData;

                      });
      //Obtener premios por usuario
      this.transactionsService.getTransactionByPrize(this.campaign_id)
                            .then((response) => {
                            let listaValores: number[] = [];
                            let listaLabels: string[] = [];
                            response.forEach((campo) => {
                                        listaValores.push(campo.prizes);                            
                                        listaLabels.push(campo.name);
                            });
                               
                          let barChartData: ChartData<'bar', number[], string | string[]> = {
                            labels: listaLabels,
                            datasets: [ {                              
                              data: listaValores
                            } ]
                          };
                          this.barChartData= barChartData;

                      });
      
    }

  volver(){
    this.router.navigate(['/campaigns', this.company_id, this.terminal_id]);
  }

}