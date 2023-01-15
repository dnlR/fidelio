export interface iTerminal {
    company_id:number;
    id:number|undefined;
    name:string;
    description:string;
    terminal_user:string;
    terminal_password:string;
    active:boolean;
    timeout:number;
    modification_date:Date;
    modification_user_id:string;
}
export interface iTerminalList {
    company_id:number;
    id:number;
    name:string;
    active:boolean;
}