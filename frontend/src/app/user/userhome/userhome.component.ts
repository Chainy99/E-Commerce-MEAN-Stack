import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {
  medicines: any[];
  constructor(private router: Router, private authService: AuthService, private cartService: CartService, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.authService.avail) {
      this.toastr.success(this.authService.msg, '', {
        timeOut: 2000,
        closeButton: true
      });
    }
    this.authService.avail=false;
    this.authService.msg="";
    this.check()
    this.readMedicine()
  }
  check() {
    this.authService.check().subscribe(
      data => {
        console.log(data);
      },
      (error) => {

        if (error instanceof HttpErrorResponse) {

            this.router.navigate(['/login'])
              }
        console.log(error);
      }
    )

  }


  readMedicine() {
    this.authService.getAllMedicine().subscribe(
      data => {
        this.medicines = data['msg'];

      },
      error => {

        if (error instanceof HttpErrorResponse) {

            this.router.navigate(['/login'])

        }
        console.log(error);
      }
    )

  }
  addtocart(medicine) {

    medicine.qty=1;
    this.cartService.addMedicine(medicine).subscribe(
      data=>
      {

        console.log(data);
          this.toastr.success('medicine Added to the cart', '', {
            timeOut: 2000,
            closeButton: true
          });
      },
      error=>
      {
        console.log("error");
      }
    )
    // window.location.reload();

  }


  
}
