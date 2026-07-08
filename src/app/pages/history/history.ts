import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recharge } from '../../core/services/recharge';
import { AuthService } from '../../core/services/auth.service';


@Component({
  selector: 'app-history',
  imports: [
    CommonModule
  ],
  templateUrl: './history.html',
  styleUrl: './history.css'
})
export class History implements OnInit {


  transactions: any[] = [];


  userId: number | null = null;


  constructor(
    private rechargeService: Recharge,
    private authService: AuthService
  ) {}


  ngOnInit() {

    this.userId = this.authService.getUserId() ?? 5;
    this.loadHistory();

  }


  loadHistory() {


    this.rechargeService
      .getHistory(this.userId ?? 5)
      .subscribe({

        next: (response) => {

          console.log(response);

          this.transactions = Array.isArray(response)
            ? response
            : Array.isArray(response?.content)
              ? response.content
              : Array.isArray(response?.data)
                ? response.data
                : [];

        },

        error: (err) => {

          console.log(err);

        }

      });


  }


}