import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from './angular-material.module';
import { ItemsModule } from './items/items.module';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { ListFilterComponent } from './list-filter/list-filter.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, ItemDetailsComponent, ListFilterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AngularMaterialModule,
    ItemsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
