import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Address', url: '/address/address', icon: '' },
    { title: 'City', url: '/city/city', icon: '' },
    { title: 'Country', url: '/country/country', icon: '' },
    { title: 'Film', url: '/film/film', icon: '' },
    { title: 'Inventory', url: '/inventory/inventory', icon: '' },
    { title: 'Language', url: '/language/language', icon: '' },
    { title: 'Staff', url: '/staf/staf', icon: '' },
    { title: 'Store', url: '/store/store', icon: '' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
