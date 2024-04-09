import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SliderModule } from 'primeng/slider';

import { GetRequestQuoteService } from '../../services/get-request-quote-service.service';

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
  ],
  templateUrl: './bo-requests.component.html',
  styleUrls: ['./bo-requests.component.scss'],
})
export class BoRequestComponent {
  quotations: requests[] = [
    {
      id: 1,
      img: 'https://www.tomsguide.fr/content/uploads/sites/2/2021/10/frank-stephenson-gta-5-supercar.png',
      name: 'Red car',
      description:
        'mileage: 2km, 2021, 4 doors, 4 seats, 4 cylinders, 4 wheel drive, Petrol, Automatic',
      IDuser: 1,
      price: 100,
      status: 'Pending',
    },
    {
      id: 2,
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtVpqVp_0MEZI9MtRuFp9GxNANrFoD-4qGrfPM2d_lVw&s',
      name: 'Orange car',
      description:
        'mileage: 24km, 1998, 4 doors, 4 seats, 4 cylinders, 4 wheel drive, Petrol, Automatic',
      IDuser: 2,
      price: 200,
      status: 'Pending',
    },
    {
      id: 3,
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgW6dvPrT0k3PjkBVYhyImHkRPx11MDMe8KdvR2ca-Vw&s',
      name: 'White car',
      description:
        'mileage: 33km, 2020, 4 doors, 4 seats, 4 cylinders, 4 wheel drive, Petrol, Automatic.',
      IDuser: 3,
      price: 300,
      status: 'Pending',
    },
    {
      id: 4,
      img: 'https://gtamag.com/images/photo/gta-mag-grotti-itali-rsx2-gtao-652054.jpg',
      name: 'black car',
      description:
        'mileage: 77km, 1980, 4 doors, 4 seats, 4 cylinders, 4 wheel drive, Petrol, Automatic',
      IDuser: 4,
      price: 400,
      status: 'Success',
    },
  ];
  filteredQuotations: requests[] = [];
  status!: string;
  rangeValues: number[] = [20, 1000];

   constructor(private getRequestQuoteService: GetRequestQuoteService) {}

  ngOnInit() {
    this.getRequestQuoteService.getRequestQuotes().subscribe((quotations) => {
      this.quotations = quotations;
      this.filteredQuotations = quotations;
    });
    // this.filteredQuotations = this.quotations;
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
    console.log(request);
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
