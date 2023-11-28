import { firstValueFrom, Observable } from 'rxjs';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { Injectable } from '@angular/core';
import { Create_Product } from 'src/app/contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Product } from 'src/app/contracts/list_product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpClientService: HttpClientService) {}
  create(product: Create_Product, successCallBack?: any, errorCallBack?: any) {
    this.httpClientService.post({
      controller: "products"
    }, product)
    .subscribe(result => {
      successCallBack();
    }, (errorResponse: HttpErrorResponse) => {
      const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
      let message = "";
      _error.forEach((v, index) => {
        v.value.forEach((_v, _index) => {
          message += `${_v}<br>`;
        });
      });
      errorCallBack(message);
    });
   }

   async read(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: 
   (errorMessage: string) => void): Promise<{ totalCount: number; products: List_Product[] }> {
    const promiseData: Observable<{ totalCount: number; products: List_Product[] }> = this.httpClientService.get<{ totalCount: number; products: List_Product[] }>({
      controller:"products",
      queryString: `page=${page}&size=${size}`
    });
    const response: {totalCount: number; products: List_Product[] }  = await firstValueFrom(promiseData);
    successCallBack();
    return response;
   }

   async delete(id:string) {
    const deleteObservable: Observable<any> = this.httpClientService.delete<any>({
       controller: "products"
    }, id);

    await firstValueFrom(deleteObservable);
   }
}
