import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemListComponent } from './items/item-list/item-list.component';
import { ItemFormComponent } from './items/item-form/item-form.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';

const routes: Routes = [
  { path: '', component: ItemListComponent },
  { path: 'create', component: ItemFormComponent },
  { path: 'edit/:itemId', component: ItemFormComponent },
  { path: 'details/:itemId', component: ItemDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
