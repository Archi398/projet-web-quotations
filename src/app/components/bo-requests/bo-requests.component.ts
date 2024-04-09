import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';

import { GetRequestQuoteService } from '../../services/get-request-quote-service.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'bo-requests',
  standalone: true,
  imports: [
    CommonModule,
    TagModule,
    ButtonModule,
    InputTextModule,
    RadioButtonModule,
    FormsModule,
    SliderModule,
    TableModule,
  ],
  templateUrl: './bo-requests.component.html',
  styleUrls: ['./bo-requests.component.scss'],
})
export class BoRequestComponent implements OnDestroy {
  destroy$ = new Subject<void>();

  quotations: requests[] = [];
  filteredQuotations: requests[] = [];
  status!: string;
  rangeValues: number[] = [20, 1000];

  constructor(private getRequestQuoteService: GetRequestQuoteService) {}

  ngOnInit() {
    this.getRequestQuoteService
      .getRequestQuotes()
      .pipe(takeUntil(this.destroy$))
      .subscribe((quotations) => {
        this.quotations = quotations;
        this.filteredQuotations = quotations;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  searchNameQuotations(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    console.log(value);
    this.filteredQuotations = this.quotations.filter((quotation) =>
      quotation.name.toLowerCase().includes(value.toLowerCase())
    );
  }

  filterStatusQuotations() {
    if (!this.status || this.status === 'All') {
      this.filteredQuotations = this.quotations;
      return;
    }
    this.filteredQuotations = this.quotations.filter(
      (quotation) => quotation.status === this.status
    );
  }

  filterPriceQuotations() {
    this.filteredQuotations = this.quotations.filter(
      (quotation) =>
        quotation.price >= this.rangeValues[0] &&
        quotation.price <= this.rangeValues[1]
    );
  }

  deleteQuotation(request: requests) {
    this.quotations = this.quotations.filter(
      (quotation) => quotation.id !== request.id
    );
    this.filteredQuotations = this.filteredQuotations.filter(
      (quotation) => quotation.id !== request.id
    );
  }

  getSeverity(status: string) {
    switch (status) {
      case 'Success':
        return 'success';
      case 'Pending':
        return 'warning';
      default:
        return 'danger';
    }
  }
}

export type requests = {
  id: number;
  img: string;
  name: string;
  description: string;
  IDuser: number;
  price: number;
  status: string;
};
