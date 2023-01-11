export interface iEmpresa {
    id:number|undefined;
    name:string;
    nif:string;
    email:string;
    uuser_id:string;
    zip_code_id:string;
    city:string;
    region:string;
    country:string;
    phone:string;
    logo:string;//URL
    active:boolean;
    modification_date:Date;
    modification_user_id:string;
  }
