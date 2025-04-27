import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CommonModule } from '@angular/common';
import { ChartComponent, ApexAxisChartSeries, ApexChart, ApexXAxis } from 'ng-apexcharts';
import { UploadComponent } from '../../components/upload/upload.component';
import { CategoriesComponent } from "../../categories/categories.component"; 

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule, UploadComponent, CategoriesComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  analytics: any;
  chartOptions!: ChartOptions;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getAnalytics().subscribe({
      next: (data) => {
        this.analytics = data;
        this.setupChart();
      },
      error: (err) => console.error('Analytics fetch error', err)
    });
  }

  setupChart() {
    const categories = Object.keys(this.analytics.monthly_spending);
    const values = Object.values(this.analytics.monthly_spending);

    this.chartOptions = {
      series: [{
        name: "Spending",
        data: values as number[]
      }],
      chart: {
        type: "bar",
        height: 350
      },
      xaxis: {
        categories: categories
      }
    };
  }
}
