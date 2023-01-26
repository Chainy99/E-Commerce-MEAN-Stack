import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-editmedicine',
  templateUrl: './editmedicine.component.html',
  styleUrls: ['./editmedicine.component.css']
})
export class EditmedicineComponent implements OnInit {
  msg: any = [];
  avail: boolean;
  onemedicine: any;
  medicinename: any;
  medicinevolume: any;
  medicineprice: any;
  pn: any;
  ps: any;
  pp: any;
  id: any;
  image;
  constructor(private http: HttpClient, private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {
    this.check()
    this.onemedicine = this.adminService.temp;

    this.medicinename = this.onemedicine.medicineaname;
    this.medicinevolume = this.onemedicine.medicinevolume;
    this.medicineprice = this.onemedicine.medicineprice;
    this.id = this.onemedicine._id;
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
    // console.log();
  }

  onSubmit(f: NgForm) {
    if (!f.valid) {
      this.msg = "something went  wrong!!";
      this.avail = true;
      return;
    }
    const formData = new FormData();
    formData.append('id', this.id);

    if (f.controls.medicinename.value) {
      // console.log("yes name");
      formData.append('medicinename', f.controls.medicinename.value);
      this.pn = f.controls.medicinename.value;
    }
    else {
      // console.log("no name");
      formData.append('medicinename', this.medicinename);
      this.pn = this.medicinename;
    }
    if (f.controls.medicinevolume.value) {
      // console.log("yes volume");
      formData.append('medicinevolume', f.controls.medicinevolume.value);
      this.ps = f.controls.medicinevolume.value;
    }
    else {
      // console.log("no volume");
      formData.append('medicinevolume', this.medicinevolume);
      this.ps = this.medicinevolume;
    }

    if (f.controls.medicineprice.value) {
      // console.log("yes price");
      formData.append('medicineprice', f.controls.medicineprice.value);
      this.pp = f.controls.medicineprice.value;
    }
    else {
      // console.log("no price");
      formData.append('medicineprice', this.medicineprice);
      this.pp = this.medicineprice;
    }


    if (f.controls.medicinepic.value) {
      // console.log("yes image");
      formData.append('file', this.image);

      // *************
      this.http.post<any>('http://localhost:3000/admin/editmedicinewithimage', formData).subscribe(
        (res) => {
          this.adminService.avail = true;
          this.adminService.msg = "Successfully Edited a medicine!!!"
          this.router.navigate(['/admin']);
          console.log(res)
        }
        ,
        (error) =>{

          if(error instanceof HttpErrorResponse)
          {

              this.router.navigate(['/login'])

          }
          console.log(error);
        }
      );

    }
    else {

      this.http.get<any>('http://localhost:3000/admin/editmedicinewithoutimage?id=' + this.id + '&medicinename=' + this.pn + '&medicinevolume=' + this.ps + '&medicineprice=' + this.pp
      ).subscribe(
        (res) => {
          this.adminService.avail = true;
          this.adminService.msg = "Successfully Edited a medicine!!!"
          this.router.navigate(['/admin']);
          console.log(res)
        }
        ,
        (error) =>{

          if(error instanceof HttpErrorResponse)
          {
              this.router.navigate(['/login'])

          }
          console.log(error);
        }
      );
    }


  }


  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;
    }
  }
}
