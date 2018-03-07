import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss']
})
export class LanguageSwitcherComponent implements OnInit {

  languages = [
    { name: 'Русский', img: 'assets/img/icons/ru.png' },
    { name: 'English', img: 'assets/img/icons/en.png' }
  ];

  defaultLng =  { name: 'Русский', img: 'assets/img/icons/ru.png' };
  active = false;

  constructor() { }

  ngOnInit() {
  }

  onActive() {
    this.active = !this.active;
  }

  onSelectLng(name: string, img: string) {
      this.defaultLng.name = name;
      this.defaultLng.img = img;
      this.active = false;
  }

 }
