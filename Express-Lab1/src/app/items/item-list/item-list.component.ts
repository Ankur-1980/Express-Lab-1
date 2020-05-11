import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from 'src/app/interfaces/item';
import { ItemService } from 'src/app/services/item.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent implements OnInit, OnDestroy {
  items: Item[] = [];
  private itemsSub: Subscription;

  constructor(public itemService: ItemService) {}

  ngOnInit(): void {
    this.itemService.getItems();
    this.itemsSub = this.itemService
      .getItemUpdateListener()
      .subscribe((items: Item[]) => {
        this.items = items;
      });
  }

  onDelete(itemId: string) {
    this.itemService.deleteItem(itemId);
  }

  ngOnDestroy() {
    this.itemsSub.unsubscribe();
  }
}
