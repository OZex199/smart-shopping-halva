// transactions.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule, NgApexchartsModule],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions: any[] = [];
  filteredTransactions: any[] = [];
  filter: string = 'all';
  sortBy: string = 'date-desc';
  chartSeries: number[] = [];
  chartLabels: string[] = [];
  chartColors: string[] = [];

  chartOptions = {
    type: 'pie',
    height: 350,
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800
    },
    toolbar: {
      show: true,
      tools: {
        download: true,
        selection: false,
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: false,
        reset: true
      }
    },
    dropShadow: {
      enabled: true,
      top: 2,
      left: 2,
      blur: 4,
      opacity: 0.1
    }
  };

  constructor(public api: ApiService) {}

  ngOnInit() {
    this.generateChartColors();
    this.loadTransactions();
  }

  generateChartColors() {
    // Generate a nice gradient of blues
    this.chartColors = [
      '#007bff', '#00a1ff', '#00c5ff', '#00e5ff',
      '#00ffea', '#00ffc5', '#00ff9d', '#00ff70'
    ];
  }

  loadTransactions() {
    this.api.getHistory().subscribe({
      next: (data) => {
        this.transactions = data;
        this.applyFilter();
        this.applySort();
      },
      error: (err) => {
        console.error('Failed to load transactions', err);
      }
    });
  }

  applyFilter() {
    const now = new Date();
    if (this.filter === 'last7') {
      this.filteredTransactions = this.transactions.filter((t) => {
        const date = new Date(t.date);
        return (now.getTime() - date.getTime()) <= 7 * 24 * 60 * 60 * 1000;
      });
    } else if (this.filter === 'last30') {
      this.filteredTransactions = this.transactions.filter((t) => {
        const date = new Date(t.date);
        return (now.getTime() - date.getTime()) <= 30 * 24 * 60 * 60 * 1000;
      });
    } else {
      this.filteredTransactions = [...this.transactions];
    }

    this.updateChart();
  }

  applySort() {
    switch(this.sortBy) {
      case 'date-desc':
        this.filteredTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'date-asc':
        this.filteredTransactions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'merchant-asc':
        this.filteredTransactions.sort((a, b) => a.merchant.localeCompare(b.merchant));
        break;
      case 'merchant-desc':
        this.filteredTransactions.sort((a, b) => b.merchant.localeCompare(a.merchant));
        break;
    }
  }

  updateChart() {
    const categories: { [key: string]: number } = {};

    this.filteredTransactions.forEach(tx => {
      if (tx.merchant) {
        categories[tx.merchant] = (categories[tx.merchant] || 0) + 1;
      }
    });

    this.chartLabels = Object.keys(categories);
    this.chartSeries = Object.values(categories);
  }
}