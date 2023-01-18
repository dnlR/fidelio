import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TerminalService } from 'src/app/services/terminal.service';

@Component({
  selector: 'app-login-terminal',
  templateUrl: './login-terminal.page.html',
  styleUrls: ['./login-terminal.page.scss'],
})
export class LoginTerminalPage implements OnInit {

  formTerminal!: FormGroup;
  terminal: any;   
  good_user: boolean = false;

  mensaje_validacion: string = '';

  constructor(private fb: FormBuilder,
              private router: Router,             
              private terminalService: TerminalService
              ) { }

  ngOnInit() {
    //Formulario
    this.formTerminal = this.fb.group({
      terminal: ['', Validators.required],    
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  async login(){

    if (this.formTerminal.valid){      
      console.log('es el formulario valido');
      console.log(this.formTerminal.value.terminal,
        this.formTerminal.value.password);
      // si se loguea correctamente va a las campañas activas de empresa
      this.terminalService.loginTerminal(this.formTerminal.value.terminal,
                                       this.formTerminal.value.password)
                                      .then((response) => {                                 
                                              this.terminal = response;
                                              if (this.terminal.length == 0){   
                                                this.formTerminal.reset();                                              
                                                this.mensaje_validacion = 'Usuario o password incorrecto';                                              
                                              }
                                              else if (!this.terminal[0].active){                                                    
                                                  this.formTerminal.reset(); 
                                                  this.mensaje_validacion = `${this.terminal[0].name} no está activo`;                                                
                                              } else {                                                 
                                                this.good_user = true;
                                                this.mensaje_validacion = 'Usuario correcto';
                                                console.log('Usuario correcto')
                                                this.router.navigate(['/campaigns', this.terminal[0].company_id, this.terminal[0].id]);
                                              }                                                                                    
                                          });
    
                                      
      
    } else {
      console.log('Datos introducidos no correctos');
    }
  }  
}