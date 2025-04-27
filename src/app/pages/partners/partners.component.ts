import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit {
  partners: any[] = [];
  source: string = '';

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getPartners().subscribe({
      next: (res) => {
        this.partners = res.partners;
        this.source = res.source;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
