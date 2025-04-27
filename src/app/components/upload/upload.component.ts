import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ApexNonAxisChartSeries, ApexChart, ApexResponsive, ApexLegend } from 'ng-apexcharts';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FormsModule, NgApexchartsModule],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  selectedFile: File | null = null;
  uploadSuccess = false;
  receiptDetails: any = null;
  errorMessage = '';

  // Chart options
  public chartSeries: ApexNonAxisChartSeries = [];
  public chartLabels: string[] = [];
  public chartOptions: ApexChart = {
    type: 'donut',
    height: 350,
    toolbar: { show: false }, // 👈 you must add this otherwise ApexChart expects it!
  };
  
  public legend: ApexLegend = { position: 'bottom' };
  public responsive: ApexResponsive[] = [
    {
      breakpoint: 480,
      options: {
        chart: { width: 300 },
        legend: { position: 'bottom' }
      }
    }
  ];

  constructor(private api: ApiService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] ?? null;
  }

  upload() {
    if (!this.selectedFile) {
      this.errorMessage = 'Please select a file first!';
      return;
    }

    this.api.uploadReceipt(this.selectedFile).subscribe({
      next: (res) => {
        this.uploadSuccess = true;
        this.receiptDetails = res.receipt;
        this.errorMessage = '';
        this.prepareChart(); // 👈 After success, prepare chart data
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to upload receipt.';
      }
    });
  }

  prepareChart() {
    const categories = this.receiptDetails.items.map((item: any) => item.category);
    const prices = this.receiptDetails.items.map((item: any) => parseFloat(item.price));

    const categoryTotals: { [key: string]: number } = {};

    categories.forEach((category: string | number, index: string | number) => {
      categoryTotals[category] = (categoryTotals[category] || 0) + prices[index];
    });

    this.chartLabels = Object.keys(categoryTotals);
    this.chartSeries = Object.values(categoryTotals);
  }
}
