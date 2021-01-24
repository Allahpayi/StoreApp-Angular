import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { AlertifyService } from '../services/alertify.service';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers:[ProductService]
})
export class ProductComponent implements OnInit {
  filterText = ""
  title = "Ürün Listesi"
  constructor(
    private alertifyService: AlertifyService,
    private productSerrvice:ProductService,
    private activatedRoute:ActivatedRoute
    ) { }
  products: Product[];

  ngOnInit() {

    this.activatedRoute.params.subscribe(params=>{
      this.productSerrvice.getProducts(params["categoryId"]).subscribe(data =>{
        this.products = data;
      });
    })
    
  }
  addToCard(product) {
    this.alertifyService.success(product.name + " " + "added")
  }


}
