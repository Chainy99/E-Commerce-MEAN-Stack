import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-addmedicine',
  templateUrl: './addmedicine.component.html',
  styleUrls: ['./addmedicine.component.css']
})
export class AddmedicineComponent implements OnInit {
  msg: any = [];
  avail: boolean;
  onemedicine: any;
  image;
  constructor(private http: HttpClient, private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {
    this.check()
    this.onemedicine = this.adminService.temp;
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


  onSubmit(f: NgForm) {
    if (!f.valid) {
      this.msg = "something went  wrong!!";
      this.avail = true;
      return;
    }
    const formData = new FormData();
    formData.append('file', this.image);
    formData.append('medicinename', f.controls.medicinename.value);
    formData.append('medicinevolume', f.controls.medicinevolume.value);
    formData.append('medicineprice', f.controls.medicineprice.value);
    this.http.post<any>('http://localhost:3000/admin/addmedicine', formData).subscribe(
      (res) => {
        this.adminService.avail = true;
        this.adminService.msg = "Successfully Added a medicine!!!"
        this.router.navigate(['/admin']);
        // console.log(res)
      }
      ,
      (error) => {

        if (error instanceof HttpErrorResponse) {

            this.router.navigate(['/login'])

        }
        console.log(error);
      }
    );

  }
  selectImage(event) {
    console.log("image selected");
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;
    }
  }
}
