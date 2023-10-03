import { Directive, ElementRef, Input } from '@angular/core';

@Directive( {
  // tslint:disable-next-line:directive-selector
  selector: '[onlyNumbers]'
} )
export class OnlyNumbersDirective {

  @Input() maxlength: number;

  constructor( private el: ElementRef ) {

    this.el.nativeElement.onkeyup = () => {
      this.el.nativeElement.value = this.filterNumbers( this.el.nativeElement.value );
    };

    this.el.nativeElement.onkeydown = ( evt: any ) => {
      const { key, code } = evt;
      if ( ( isNaN( key ) || code === 'Space' ) && ( key !== 'Backspace' && key !== 'Tab' && key !== 'ArrowLeft' && key !== 'ArrowRight' ) ) {
        evt.preventDefault();
      }
    };
  }

  filterNumbers( value: string ): any {
    const pattern = /^[0-9]*$/;
    const arr = [];
    value.split( '' ).forEach( n => {
      if ( pattern.test( n ) ) {
        arr.push( n );
      }
    } );
    return arr.join( '' );
  }

}
