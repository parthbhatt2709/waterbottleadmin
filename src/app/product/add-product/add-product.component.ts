import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../product-service.service';
import { Router } from '@angular/router';
import { product_class } from '../product_class';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  pro_id:number;
  pro_name:string;
  pro_desc:string;
  pro_mfg:string;
  pro_price:number;
  selectedFile:File=null;
  Images:string;

  constructor(public _ser:ProductServiceService,public _route:Router) { }

  ngOnInit() {
  }

  onchange(file) {
    console.log(   this.selectedFile = <File>file.target.files[0]);
  }

  onAddproduct()
  {
    const fd = new FormData();
    fd.append("pro_name",this.pro_name);
    if(this.selectedFile != null) {
      fd.append("pro_image",this.selectedFile,this.selectedFile.name);
    }
    fd.append("pro_desc",this.pro_desc);
    fd.append("pro_mfg",this.pro_mfg);
    fd.append("pro_price",this.pro_price.toString());

    this._ser.addProduct(fd).subscribe(
      (data:product_class[])=>{
        console.log(data);
        this._route.navigate(['/nav/product']);
      }
    );
  }
}
