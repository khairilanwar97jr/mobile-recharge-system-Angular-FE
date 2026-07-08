import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recharge } from '../../core/services/recharge';


@Component({
  selector: 'app-history',
  imports: [
    CommonModule
  ],
  templateUrl: './history.html',
  styleUrl: './history.css'
})
export class History {


  transactions: any[] = [];


  // temporary user id for testing
  userId = 5;


  constructor(
    private rechargeService: Recharge
  ) {}


  ngOnInit() {

    this.loadHistory();

  }


  loadHistory() {


    this.rechargeService
      .getHistory(this.userId)
      .subscribe({

        next: (response) => {

          console.log(response);

          this.transactions = response;

        },

        error: (err) => {

          console.log(err);

        }

      });


  }


}