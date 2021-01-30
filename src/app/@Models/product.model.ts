export interface IProduct{
name:LocalizedString;
description:string;
quantity:number;
expire_date:string | Date;
id:number;
}

export interface LocalizedString {
    arabic: string;
    english:string;
}