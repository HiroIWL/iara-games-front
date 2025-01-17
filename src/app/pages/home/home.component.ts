import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoading = true;

  ngOnInit(): void {
    
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }
}