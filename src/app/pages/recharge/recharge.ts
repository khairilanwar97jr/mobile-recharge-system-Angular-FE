import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Recharge } from '../../core/services/recharge';


@Component({
  selector: 'app-recharge',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './recharge.html',
  styleUrl: './recharge.css'
})
export class RechargeComponent implements OnInit {


  phoneNumber = '';
  selectedPackageId: number | null = null;
  packages: any[] = [];
  isLoadingPackages = false;


  constructor(
    private rechargeService: Recharge
  ) {}


  ngOnInit() {
    this.loadPackages();
  }


  loadPackages() {
    this.isLoadingPackages = true;

    this.rechargeService.getPackages()
      .subscribe({
        next: (response) => {
          this.packages = Array.isArray(response) ? response : response?.content ?? [];
          this.isLoadingPackages = false;
        },
        error: (err) => {
          console.log(err);
          this.isLoadingPackages = false;
        }
      });
  }


  submitRecharge() {


    const data = {

      phoneNumber: this.phoneNumber,

      packageId: this.selectedPackageId

    };


    this.rechargeService.recharge(data)
      .subscribe({

        next: (response) => {

          console.log(response);

          alert('Recharge successful');

        },

        error: (err) => {

          console.log(err);

          alert('Recharge failed');

        }

      });


  }


}