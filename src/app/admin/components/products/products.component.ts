import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { Create_Product } from 'src/app/contracts/create_product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private httpClientService: HttpClientService) {
    super(spinner)
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallAtom);

    this.httpClientService.get<Create_Product[]>({
      controller: "products"
    }).subscribe(data => console.log(data));

    /* this.httpClientService.post({
      controller: "products"
    }, {
      name: "Kalem",
      stock: 100,
      price: 15
    }).subscribe(); */

    /* this.httpClientService.put({
      controller: "products"
    }, {
      id: "6869efa1-eba6-4c29-9717-42849ffe7ea1",
      name: "Renkli Kağıt",
      stock: 1500,
      price: 5.5
    }).subscribe(); */

    /* this.httpClientService.delete({
      controller: "products"
    }, "id...").subscribe(); */

    /* this.httpClientService.get({
      fullEndPoint: "https://jsonplaceholder.typicode.com/posts"
    }).subscribe(data => console.log(data)); */
  }

}
