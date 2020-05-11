import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from 'src/app/interfaces/item';
import { ItemService } from 'src/app/services/item.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent implements OnInit, OnDestroy {
  items: Item[] = [];
  private itemsSub: Subscription;
  filterForm: FormGroup;

  perPage = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(public itemService: ItemService) {}

  ngOnInit(): void {
    this.itemService.getItems();
    this.itemsSub = this.itemService
      .getItemUpdateListener()
      .subscribe((items: Item[]) => {
        this.items = items;
      });

    this.filterForm = new FormGroup({
      prefix: new FormControl(),
      pageSize: new FormControl(),
      maxPrice: new FormControl(null, { validators: [Validators.min(0)] }),
    });
  }

  onDelete(itemId: string) {
    this.itemService.deleteItem(itemId);
  }

  filterList() {
    this.itemService.filterItems(this.filterForm.value);
  }

  ngOnDestroy() {
    this.itemsSub.unsubscribe();
  }
}
