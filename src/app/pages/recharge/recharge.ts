import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Recharge } from '../../core/services/recharge';


@Component({
  selector: 'app-recharge',
  imports: [
    FormsModule
  ],
  templateUrl: './recharge.html',
  styleUrl: './recharge.css'
})
export class RechargeComponent {


  phoneNumber = '';
  packageId = 0;


  constructor(
    private rechargeService: Recharge
  ) {}


  submitRecharge(){


    const data = {

      phoneNumber: this.phoneNumber,

      packageId: this.packageId

    };


    this.rechargeService.recharge(data)
      .subscribe({

        next: (response)=>{

          console.log(response);

          alert("Recharge successful");

        },

        error:(err)=>{

          console.log(err);

          alert("Recharge failed");

        }

      });


  }


}