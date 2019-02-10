import { Component, ViewChild, OnInit , ElementRef, AfterViewInit, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() displayDetail: boolean;
  @Input() headCount: number;
  @ViewChild('filterElement') filterElementRef: ElementRef;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  hitMessage: string;
  private _listFilter: string;

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.valueChange.emit(value);
  }
  constructor() { }


  ngOnInit() {
  }
  ngAfterViewInit() {
    if (this.filterElementRef) {
      this.filterElementRef.nativeElement.focus();
    }

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['headCount'] && !changes['headCount'].currentValue) {
      this.hitMessage = 'No Matches found';
    } else {
      this.hitMessage = 'Hits:' + this.headCount;
    }
  }
}
