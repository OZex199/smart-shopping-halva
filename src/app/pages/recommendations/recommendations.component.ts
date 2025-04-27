import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {
  recommendations: any[] = [];
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.fetchRecommendations();
  }

  fetchRecommendations() {
    this.loading = true;
    this.apiService.getRecommendations().subscribe({
      next: (res) => {
        this.recommendations = res.recommendations;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to fetch recommendations.';
        this.loading = false;
      }
    });
  }
}
