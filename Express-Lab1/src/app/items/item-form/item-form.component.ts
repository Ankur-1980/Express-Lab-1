import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ItemService } from 'src/app/services/item.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Item } from 'src/app/interfaces/item';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css'],
})
export class ItemFormComponent implements OnInit {
  item: Item;
  mode = 'create';
  form: FormGroup;
  private itemId: string;

  constructor(public itemService: ItemService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.form = new FormGroup({
        product: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(3)],
        }),
        price: new FormControl(null, { validators: [Validators.required] }),
        quantity: new FormControl(null, { validators: [Validators.required] }),
      });

      if (paramMap.has('itemId')) {
        this.mode = 'edit';
        this.itemId = paramMap.get('itemId');
        this.itemService.getItem(this.itemId).subscribe((itemData) => {
          console.log(itemData);
          this.item = {
            product_id: itemData.id,
            product: itemData.product,
            price: itemData.price,
            quantity: itemData.quantity,
          };
          if (itemData) {
            this.form.setValue({
              product: itemData.product,
              price: itemData.price,
              quantity: itemData.quantity,
            });
          }
        });
      } else {
        this.mode = 'create';
        this.itemId = null;
      }
    });
  }

  onSaveItem() {
    if (this.form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.itemService.addItem(
        this.form.value.product,
        this.form.value.price,
        this.form.value.quantity
      );
    } else {
      this.itemService.updateItem(
        parseInt(this.itemId),
        this.form.value.product,
        this.form.value.price,
        this.form.value.quantity
      );
    }

    this.form.reset();
  }
}
