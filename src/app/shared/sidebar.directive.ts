import {AfterViewInit, Directive, ElementRef, HostBinding, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appSidebar]'
})
export class SidebarDirective {




  @HostBinding('class.active') isOpen = false;
  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
  constructor(private elRef: ElementRef, private renderer: Renderer2) {
    // this.renderer.find('parent-link.submenu').css('display', 'block');
    // this.renderer.setStyle(this.elRef.nativeElement, 'display', 'block');
  }



}
