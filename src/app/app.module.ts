import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { UserCreationFormComponent } from './components/views/user-creation-form/user-creation-form.component';
import { HttpClientModule } from '@angular/common/http';
import { UsersTableComponent } from './components/views/users-table/users-table.component';

@NgModule({
  declarations: [
    AppComponent,
    UserCreationFormComponent,
    UsersTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NoopAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
