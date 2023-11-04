import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private ref: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.removeHighlight();
  }

  private highlight() {
    this.ref.nativeElement.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.5)';
  }

  private removeHighlight() {
    this.ref.nativeElement.style.boxShadow = 'none';
  }
}
