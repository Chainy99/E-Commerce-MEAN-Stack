import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { Medicine } from '../../medicine'
@Component({
  selector: 'app-viewmedicine',
  templateUrl: './viewmedicine.component.html',
  styleUrls: ['./viewmedicine.component.css']
})
export class ViewmedicineComponent implements OnInit {
  public medicines: Medicine[];
  avail: boolean;
  arr: any[];

  constructor(private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {
    this.check()
    this.readMedicine()
  }

  check() {
    this.adminService.check().subscribe(
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
    this.adminService.getAllMedicine().subscribe(
      data => {
        this.arr = data['msg'];
        this.medicines = data['msg'];

      },
      (error) => {

        if (error instanceof HttpErrorResponse) {

            this.router.navigate(['/login'])

        }
        console.log(error);
      }
    )
    // console.log();
  }

  deletemedicine(medicine) {


    var medicineid = medicine._id;
    this.adminService.deletemedicine(medicineid).subscribe(
      data => {
        // console.log(data);
        this.adminService.avail = true;
        this.adminService.msg = "Successfully Deleted a medicine!!!";
        this.router.navigate(['/admin']);
      },
      (error) => {

        if (error instanceof HttpErrorResponse) {

            this.router.navigate(['/login'])

        }
        console.log(error);
      }
    )
  }
  editmedicine(medicine) {
    this.adminService.temp = medicine;
    this.router.navigate(['/admin/editmedicine']);
  }
}
