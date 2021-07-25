import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemModel } from '../model/encode-item.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EncodeItemService {

  constructor(private httpClient: HttpClient) { }

  // addItem(newItemData): Observable<ItemModel>{
    addItem(name: string, description: string, amount: any, image: File): Observable<ItemModel>{
      const profileData = new FormData();
      profileData.append("itemName", name);
      profileData.append("itemDescription", description);
      profileData.append("amount", amount);
      profileData.append("image", image, name);
  
      const url = `${environment.BASE_URL}/${environment.UPLOAD}`;

    return this.httpClient.post<ItemModel>(url, profileData);
  }
}
