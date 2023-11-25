import { AlertifyService, MesssageType, Position } from 'src/app/services/admin/alertify.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Product } from 'src/app/contracts/list_product';
import { ProductService } from 'src/app/services/common/models/product.service';
import { supportsPassiveEventListeners } from '@angular/cdk/platform';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends BaseComponent implements OnInit , AfterViewInit{
  constructor(spinner: NgxSpinnerService, private productService: ProductService, private AlertifyService: AlertifyService)
  {
    super(spinner)
  }
  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate', 'updateDate'];
  dataSource :MatTableDataSource<List_Product> = null;
  @ViewChild(MatPaginator) paginator : MatPaginator;

  async getProducts(){
    this.showSpinner(SpinnerType.BallAtom);
    const allProducts: { totalCount: number; products: List_Product[] } = await this.productService.read(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, 
    () => this.hideSpinner(SpinnerType.BallAtom), errorMessage =>
    this.AlertifyService.message(errorMessage, {
      dismissOthers: true,
      messageType: MesssageType.Error,
      position: Position.TopRight,
      delay: 0
    }))
    this.dataSource = new MatTableDataSource<List_Product>(allProducts.products);
    this.paginator.length = allProducts.totalCount;
    this.dataSource.paginator = this.paginator;
  }

  async pageChanged() {
    await this.getProducts();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  async ngOnInit()
  {
    await this.getProducts();
  }
}
