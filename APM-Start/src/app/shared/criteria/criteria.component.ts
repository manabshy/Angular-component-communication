import { Component, ViewChild, OnInit , ElementRef, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, AfterViewInit, OnChanges {
  lsFilter: string;
  @Input() displayDetail: boolean;
  @Input() headCount: number;
  @ViewChild('filterElement') filterElementRef: ElementRef;
  hitMessage: string;
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
