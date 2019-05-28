import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { ObjLoaderComponent } from './obj-loader/obj-loader.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, ObjLoaderComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
