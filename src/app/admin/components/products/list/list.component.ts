import { AlertifyService, MesssageType, Position } from 'src/app/services/admin/alertify.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Product } from 'src/app/contracts/list_product';
import { ProductService } from 'src/app/services/common/models/product.service';
import { supportsPassiveEventListeners } from '@angular/cdk/platform';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private productService: ProductService, private AlertifyService: AlertifyService)
  {
    super(spinner)
  }
  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate', 'updateDate'];
  dataSource :MatTableDataSource<List_Product> = null;

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallAtom);
    this.productService.read(() => this.hideSpinner(SpinnerType.BallAtom), errorMessage =>
    this.AlertifyService.message(errorMessage, {
      dismissOthers: true,
      messageType: MesssageType.Error,
      position: Position.TopRight,
      delay: 0
    }))
  }
}
