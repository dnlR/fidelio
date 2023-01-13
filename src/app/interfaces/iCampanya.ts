export interface iCampanya {
    company_id:number;
    id:number|undefined;
    name:string;
    type:string;
    active:boolean;
    card_color:string;
    card_main_image:string;//URL storage
    card_title:string;
    card_subtitle:string;
    card_foot_note:string;
    card_logo:string;//URL storage
    card_points:number;
    description:string;
    conditions:string;
    modification_date:Date;
    modification_user:string;
}
export interface iCampanyaList {
    company_id:number
    id:number;
    name:string;
    active:boolean;
    card_main_image:string;//URL storage
}