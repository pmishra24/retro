import { Component , ElementRef, ViewChild} from '@angular/core';
import {ExcelService} from './services/excel.service';
import { HttpClient } from '@angular/common/http';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const { read, write, utils } = XLSX;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Retro'; 
i:number = 0;
j:number = 0;
k:number = 0;
p:number = 1;

data: any = [];
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

keepgoing:boolean= true;

constructor(private excelService:ExcelService, private http :HttpClient){
}

// ngOnInit(): void {
//     console.log("I'll be called when you first load the page, but NOT if you come to this page by pressing the 'back' button on another page");
//     // this.onFileChange("C:\\Users\\761418\\Downloads\\sample_export_1577798777498.xlsx");
//     this.http.get('assets/sample_export_1577798777498.xlsx', {responseType: 'text'}).subscribe(data => {
//     console.log(data);
// })
//   }
// data1: any = [[1, 2], [3, 4]];
// onFileChange(evt: any) {
//     /* wire up file reader */
//     console.log(<DataTransfer>(evt.target));
//     const target: DataTransfer = <DataTransfer>(evt.target);
//     if (target.files.length !== 1) throw new Error('Cannot use multiple files');
//     const reader: FileReader = new FileReader();
//     reader.onload = (e: any) => {
//       /* read workbook */
//       const bstr: string = e.target.result;
//       const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

//       /* grab first sheet */
//       const wsname: string = wb.SheetNames[0];
//       const ws: XLSX.WorkSheet = wb.Sheets[wsname];

//       /* save data */
//       this.data1 = <any>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
//       console.log(this.data1);
//     };
//     reader.readAsBinaryString(target.files[0]);
//   }

ExportTOExcel():void {  
          this.keepgoing= true;
          this.data = []
          this.data[0]= {
              HeadingWent: this.HeadingWent,
              HeadingImprove: this.HeadingImprove,
              HeadingAction: this.HeadingAction};

          while(this.keepgoing)
          {
            if(this.i<this.Wentwell.length && this.k<this.Actionitem.length && this.j<this.Toimprove.length)
            {
              this.data[this.p] = {HeadingWent:this.Wentwell[this.i],HeadingImprove:this.Toimprove[this.j],HeadingAction:this.Actionitem[this.k]};
              this.i++;this.j++;this.k++;this.p++;
            }
            else
            {
              if(this.i<this.Wentwell.length && this.k<this.Actionitem.length)
              {
                this.data[this.p] = {HeadingWent:this.Wentwell[this.i],HeadingImprove:"",HeadingAction:this.Actionitem[this.k]};
                this.i++;this.k++;this.p++;
              }
              else if(this.k<this.Actionitem.length && this.j<this.Toimprove.length)
              {
                this.data[this.p] = {HeadingWent:"",HeadingImprove:this.Toimprove[this.j],HeadingAction:this.Actionitem[this.k]};
                this.j++;this.k++;this.p++;
              }
              else if(this.i<this.Wentwell.length && this.j<this.Toimprove.length)
              {
                this.data[this.p] = {HeadingWent:this.Wentwell[this.i],HeadingImprove:this.Toimprove[this.j],HeadingAction:""};
                this.i++;this.j++;this.p++;
              }
              else if(this.i<this.Wentwell.length)
              {
                this.data[this.p] = {HeadingWent:this.Wentwell[this.i],HeadingImprove:"",HeadingAction:""};
                this.i++;this.p++;
              }
              else if(this.j<this.Toimprove.length)
              {
                this.data[this.p] = {HeadingWent:"",HeadingImprove:this.Toimprove[this.j],HeadingAction:""};
              this.j++;this.p++;
              }
              else if(this.k<this.Actionitem.length)
              {
                this.data[this.p] = {HeadingWent:"",HeadingImprove:"",HeadingAction:this.Actionitem[this.k]};
                this.k++;this.p++;
              }
              else
              {
                this.keepgoing = false;
              }
            }
          }
        this.i = 0;this.j = 0;this.k = 0;this.p=1;
        console.log(this.data)
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
    this.Wentwell.push(toadd);
    this.isaddwent=false;
  }

  showTextimprove(toadd: any){
    this.Toimprove.push(toadd);
    this.isaddimprove=false;
  }

  showTextaction(toadd: any){
    this.Actionitem.push(toadd);
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
  this.Wentwell[id] = edited;
  console.log(this.Wentwell[id] );
    this.iseditenableWent = false;
    this.idwent=-1;    
}
editTextimprove(id: any, edited : any)
{
  this.Toimprove[id] = edited;
  console.log(this.Toimprove[id] );
    this.iseditenableimprove = false;
    this.idimprove=-1;
}
editTextaction(id: any, edited : any)
{
  this.Actionitem[id] = edited;
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
