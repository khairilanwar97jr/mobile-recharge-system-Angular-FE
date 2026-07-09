import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Recharge } from '../../core/services/recharge';
import { AuthService } from '../../core/services/auth.service';


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
    private rechargeService: Recharge,
    private authService: AuthService
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

    const packageId = Number(this.selectedPackageId);

    if (!this.phoneNumber || !packageId) {
      alert('Please enter a phone number and select a package');
      return;
    }

    const data = {
      userId: this.authService.getUserId() ?? 1,
      packageId: packageId,
      phoneNumber: this.phoneNumber
    };

    this.rechargeService.recharge(data).subscribe({
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