import { Component , ElementRef, ViewChild} from '@angular/core';
import {ExcelService} from './services/excel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Retro'; 

Wentwell : any = [];
Toimprove : any = [];
Actionitem : any = [];

HeadingWent: string = "Went well";
HeadingImprove: string = "To improve";
HeadingAction:string = "Action item";
HeadingTitle:string = "";

idwent:number=-1;
idimprove:number=-1;
idaction:number=-1;

  iseditenableWent : boolean = false;// to show and hide the edit button
  iseditenableimprove : boolean = false;
  iseditenableaction: boolean = false;// to show and hide the edit button
 
  isaddwent : boolean = false;
  isaddimprove : boolean = false;
  isaddaction : boolean = false;

  HeadingEditablewent:boolean=false;

HeadingEditableimprove:boolean=false;
HeadingEditabletitle:boolean=false;
HeadingEditableaction:boolean=false;
constructor(private excelService:ExcelService){

}

data: any = [
   {
    HeadingWent: this.HeadingWent,
    HeadingImprove: this.HeadingImprove,
    HeadingAction: this.HeadingAction
  },
  {
    HeadingWent: "ho",
    HeadingImprove: 'ravi',
    HeadingAction: 1000
  },
  {
    HeadingWent: this.HeadingImprove,
    HeadingImprove: 'ram',
    HeadingAction: 2000
  },
  {
    HeadingWent: 'e103',
    HeadingImprove: 'rajesh',
    HeadingAction: 3000
  }];

ExportTOExcel():void {  
    this.excelService.exportAsExcelFile(this.data, 'Serviscope Retro');
  }

editHeading(type:any){
    console.log(type);
    if(type == "went")
    {
      this.HeadingEditablewent = true;
    }
    if(type == "improve")
    {
      this.HeadingEditableimprove = true;
    }
    if(type == "action")
    {
      this.HeadingEditableaction = true;
    }
   if(type == "title")
    {
      this.HeadingEditabletitle = true;
    }
  }

  Addheading(type:any,New:any)
  {
    if(type == "went")
    {
      this.HeadingWent = New;
      this.HeadingEditablewent = false;
    }
    if(type == "improve")
    {
      this.HeadingImprove = New;
      this.HeadingEditableimprove = false;
    }
    if(type == "action")
    {
      this.HeadingAction = New;
      this.HeadingEditableaction = false;
    }
     if(type == "title")
    {
      this.HeadingTitle = New;
      this.HeadingEditabletitle = false;
    }
  }

  cancelHeading(type:any){
    if(type == "went")
    {
      this.HeadingEditablewent = false;
    }
    if(type == "improve")
    {
      this.HeadingEditableimprove = false;
    }
    if(type == "action")
    {
      this.HeadingEditableaction = false;
    }
    if(type == "title")
    {
      this.HeadingEditabletitle = false;
    }
  }

 
  showTextwent(toadd: any){
    this.Wentwell.push({name: toadd});
    this.isaddwent=false;
  }

  showTextimprove(toadd: any){
    this.Toimprove.push({name: toadd});
    this.isaddimprove=false;
  }

  showTextaction(toadd: any){
    this.Actionitem.push({name: toadd});
    this.isaddaction=false;
  }

tocancelwent(){
    this.isaddwent=false;
    this.iseditenableWent=false;
    this.idwent=-1;
}
tocancelimprove(){
    this.isaddimprove=false;
    this.iseditenableimprove=false;
    this.idimprove=-1;
}
tocancelaction(){
    this.isaddaction=false;
    this.iseditenableaction=false;
    this.idaction=-1;
}

setaddwent()
{
  this.isaddwent=true;
}
setaddimprove()
{
  this.isaddimprove=true;
}
setaddaction()
{
  this.isaddaction=true;
}

editwent(id:number)
{
  this.iseditenableWent = true;
  this.idwent=id;
}
editimprove(id:number)
{
  this.iseditenableimprove = true;
  this.idimprove=id;
}
editaction(id:number)
{
  this.iseditenableaction = true;
  this.idaction=id;
}

editTextwent(id: any, edited : any)
{
  this.Wentwell[id] = {name: edited};
  console.log(this.Wentwell[id] );
    this.iseditenableWent = false;
    this.idwent=-1;    
}
editTextimprove(id: any, edited : any)
{
  this.Toimprove[id] = {name: edited};
  console.log(this.Toimprove[id] );
    this.iseditenableimprove = false;
    this.idimprove=-1;
}
editTextaction(id: any, edited : any)
{
  this.Actionitem[id] = {name: edited};
  console.log(this.Actionitem[id] );
    this.iseditenableaction = false;
    this.idaction=-1;
}

deletewent(idToDelete : any)
{
      this.Wentwell.splice(idToDelete, 1);
     
}
deleteimprove(idToDelete : any)
{
      this.Toimprove.splice(idToDelete, 1);
     
}
deleteaction(idToDelete : any)
{
      this.Actionitem.splice(idToDelete, 1);
     
}
}
