import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServiceService } from '../product-service.service';
import { product_class } from '../product_class';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.css']
})
export class UpdateproductComponent implements OnInit {
   pro_id:number;
   pro_name:string;
   selectedfile:File;
   pro_desc:string;
   Images:string;
   pro_mfg:string;
   pro_price:number;


  constructor(public _activated_routes:ActivatedRoute,public _ser:ProductServiceService,public _route:Router) { }

  ngOnInit() {
    this.pro_id=this._activated_routes.snapshot.params['pro_id'];
    this._ser.getproductbyid(this.pro_id.toString()).subscribe(
      (data:product_class[])=>{
        console.log(data);
        console.log(data[0].Images);
         this.pro_name=data[0].pro_name;
        this.Images=data[0].Images;
           this.pro_desc=data[0].pro_desc;
         this.pro_mfg=data[0].pro_mfg;
         this.pro_price=data[0].pro_price;
      }
    );
  }
  onchange(file) {
    this.selectedfile = <File>file.target.files[0];
  }
  onupdateproduct()
  {
    const fd= new FormData();
    fd.append("pro_name",this.pro_name);
    if(this.selectedfile != null) {
      fd.append("img",this.selectedfile,this.selectedfile.name);
    }
    else{
      fd.append("img",this.Images);
    }
    fd.append("pro_desc",this.pro_desc);
    fd.append("pro_mfg",this.pro_mfg);
    fd.append("pro_price",this.pro_price.toString());


    this._ser.updateproduct(this.pro_id,fd).subscribe(
      (data:product_class[])=>{
        this._route.navigate(['/nav/product']);
      }
    );
  }


}
