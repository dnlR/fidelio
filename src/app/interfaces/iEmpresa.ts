export interface iEmpresa {
    id:number|undefined;
    name:string;
    nif:string;
    email:string;
    user_id:string;
    zip_code_id:string;
    phone:string;
    logo:string;//URL
    active:boolean;
    modification_date:Date;
    modification_user_id:string;
  }
