import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-filter',
  templateUrl: './list-filter.component.html',
  styleUrls: ['./list-filter.component.css'],
})
export class ListFilterComponent implements OnInit {
  filterForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.filterForm = new FormGroup({
      prefix: new FormControl(),
      pageSize: new FormControl(),
      maxPrice: new FormControl(null, { validators: [Validators.min(0)] }),
    });
  }

  filterList() {
    alert('working?');
  }
}
