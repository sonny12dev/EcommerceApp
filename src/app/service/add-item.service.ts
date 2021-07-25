import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemModel } from '../model/encode-item.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddItemService {

  constructor(private httpClient: HttpClient) { }

  getAllItemToCart(): Observable<ItemModel>{
    const url = `${environment.BASE_URL}/${environment.GETALLITEMTOCART}`;

    return this.httpClient.get<ItemModel>(url);
  }
}
