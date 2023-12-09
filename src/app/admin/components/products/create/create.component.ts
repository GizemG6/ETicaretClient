import { NgxSpinnerService } from 'ngx-spinner';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { AlertifyService, MesssageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent extends BaseComponent implements OnInit{
  constructor(spiner: NgxSpinnerService, private productService: ProductService, private alerfity: AlertifyService) {
    super(spiner)
  }

  ngOnInit(): void {
    
  }

  @Output() createdProduct: EventEmitter<Create_Product> = new EventEmitter();
  @Output() fileUploadOptions : Partial<FileUploadOptions> = {
    action: "upload",
    controller: "products",
    explanation: "Resimleri sürükleyin veya seçin...",
    isAdminPage: true,
    accept: ".png, .jpg, .jpeg, .json"
  };

  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
    this.showSpinner(SpinnerType.BallAtom);
    const create_product: Create_Product = new Create_Product();
    create_product.name = name.value;
    create_product.stock = parseInt(stock.value);
    create_product.price = parseFloat(price.value);

    this.productService.create(create_product, () => {
      this.hideSpinner(SpinnerType.BallAtom);
      this.alerfity.message("Urun basariyla eklendi", {
        dismissOthers: true,
        messageType: MesssageType.Success,
        position: Position.TopRight,
        delay: 0
      });
      this.createdProduct.emit(create_product);
    }, errorMessage => {
      this.alerfity.message(errorMessage,
        {
          dismissOthers: true,
          messageType: MesssageType.Error,
          position: Position.TopRight,
          delay: 0
        });
    });
  }
}
