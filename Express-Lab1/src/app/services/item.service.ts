import { Injectable } from '@angular/core';
import { Item } from '../interfaces/item';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private items: Item[] = [];
  private itemsUpdated = new Subject<Item[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getItems() {
    this.http
      .get<{ message: string; items: Item[] }>(
        'http://localhost:3000/api/cart-items'
      )
      .subscribe((response) => {
        this.items = response.items;
        this.itemsUpdated.next([...this.items]);
      });
  }

  getItemUpdateListener() {
    return this.itemsUpdated.asObservable();
  }

  getItem(id) {
    return this.http.get<{
      id: number;
      product: string;
      price: number;
      quantity: number;
    }>(`http://localhost:3000/api/cart-items/${id}`);
  }

  addItem(product: string, price: number, quantity: number) {
    const newID =
      this.items.reduce((prev, curr) => {
        return prev < curr.id ? curr.id : prev;
      }, 0) + 1;
    const item: Item = {
      id: newID,
      product: product,
      price: price,
      quantity: quantity,
    };
    this.http
      .post<{ message: string }>('http://localhost:3000/api/cart-items', item)
      .subscribe((response) => {
        console.log(response.message);
        this.items.push(item);
        this.itemsUpdated.next([...this.items]);
        this.router.navigate(['/']);
      });
  }

  updateItem(id: number, product: string, price: number, quantity: number) {
    const item: Item = {
      id: id,
      product: product,
      price: price,
      quantity: quantity,
    };
    this.http
      .put(`http://localhost:3000/api/cart-items/${id}`, item)
      .subscribe((response) => {
        const updatedItems = [...this.items];
        const oldItemIndex = updatedItems.findIndex((p) => p.id === item.id);
        updatedItems[oldItemIndex] = item;
        this.items = updatedItems;
        this.itemsUpdated.next([...this.items]);
        this.router.navigate(['/']);
      });
  }

  deleteItem(itemId) {
    this.http
      .delete(`http://localhost:3000/api/cart-items/${itemId}`)
      .subscribe(() => {
        this.items = this.items.filter((item) => item.id !== itemId);
        this.itemsUpdated.next([...this.items]);
      });
  }

  filterItems({ prefix, pageSize, maxPrice }) {
    this.http
      .get<{ message: string; items: Item[] }>(
        `http://localhost:3000/api/cart-items`,
        {
          params: { prefix, pageSize, maxPrice },
        }
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
}
