import {  Directive, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { Product } from '../products/product.model';
export type SortColumn = keyof Product | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { asc: 'desc', desc: '', '': 'asc' };



export interface SortEvent {
	column: SortColumn;
	direction: SortDirection;
}

@Directive({
	selector: 'th[sortable]',
	host: {
		'[class.asc]': 'direction === "asc"',
		'[class.desc]': 'direction === "desc"',
		'(click)': 'rotate()',
	},
})
export class NgbdSortableHeader {
	@Input() sortable: SortColumn = '';
	@Input() direction: SortDirection = '';
	@Output() sort = new EventEmitter<SortEvent>();
	constructor(private el: ElementRef, private renderer: Renderer2){}
	// onClick() {
	// 	this.direction = rotate[this.direction];
	// 	this.sort.emit({ column: this.sortable, direction: this.direction });
	//   		this.renderer.removeClass(this.el.nativeElement, 'asc');
	// 	this.renderer.removeClass(this.el.nativeElement, 'desc');
	// 	if (this.direction === 'asc') {
	// 	  this.renderer.addClass(this.el.nativeElement, 'asc');
	// 	} else if (this.direction === 'desc') {
	// 	  this.renderer.addClass(this.el.nativeElement, 'desc');
	// 	}
	//   }

	  rotate() {
		this.direction = rotate[this.direction];
		this.sort.emit({ column: this.sortable, direction: this.direction });
	  }
}