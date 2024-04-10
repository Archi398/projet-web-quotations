import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

import { GetRequestQuoteService } from '../../services/get-request-quote-service.service';
import { Subject, takeUntil } from 'rxjs';

import { requests } from '../../types/requests';

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
    ToastModule,
    ConfirmPopupModule,
  ],
  templateUrl: './bo-requests.component.html',
  styleUrls: ['./bo-requests.component.scss'],
})
export class BoRequestComponent implements OnDestroy {
  destroy$ = new Subject<void>();

  quotations: requests[] = [];
  filteredQuotations: requests[] = [];
  status!: string;
  rangeValues: number[] = [0, 1000];

  constructor(
    private getRequestQuoteService: GetRequestQuoteService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getRequestQuoteService
      .getRequestQuotes()
      .pipe(takeUntil(this.destroy$))
      .subscribe((quotations) => {
        console.log(quotations);
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
    switch (this.status) {
      case 'All':
        this.filteredQuotations = this.quotations;
        break;
      case 'Success':
        this.filteredQuotations = this.quotations.filter(
          (quotation) => quotation.price != 0
        );
        break;
      case 'Pending':
        this.filteredQuotations = this.quotations.filter(
          (quotation) => quotation.price == 0
        );
        break;
      default:
        this.filteredQuotations = this.quotations;
        break;
    }
  }

  filterPriceQuotations() {
    this.filteredQuotations = this.quotations.filter(
      (quotation) =>
        quotation.price >= this.rangeValues[0] &&
        quotation.price <= this.rangeValues[1]
    );
  }

  deleteQuotation(request: requests) {
    try {
      this.getRequestQuoteService.deleteRequestQuote(request.id.toString());
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Delete success',
      });
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Delete failed',
      });
    }
  }

  confirm(event: Event, request: requests) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Please confirm to proceed moving forward.',
      rejectButtonStyleClass: 'p-button-danger p-button-sm',
      acceptButtonStyleClass: 'p-button-outlined p-button-sm',
      accept: () => {
        this.deleteQuotation(request);
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
          life: 3000,
        });
      },
    });
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
