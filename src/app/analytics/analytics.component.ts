import {
  ChangeDetectionStrategy,
  Component,
  inject,
  NgZone,
  OnInit,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChartDateModalComponent } from '../modals/chart-date-modal/chart-date-modal.component';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
})
export class AnalyticsComponent implements OnInit {
  private ngZone = inject(NgZone);
  constructor(private modalService: NgbModal) {}
  ngOnInit(): void {}

  open() {
    this.modalService.open(ChartDateModalComponent, {
      size: 'xl',
      animation: true,
    });
  }
}
