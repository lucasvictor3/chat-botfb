import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { HttpClient, HttpHeaders } from '@angular/common/http';

const URI = 'https://secure-mountain-94218.herokuapp.com/auth';
let Id = 0;

@Component({
  selector: 'app-modal-add',
  templateUrl: './modal-add.component.html',
  styleUrls: ['./modal-add.component.scss']
})
export class ModalAddComponent implements OnInit {
  constructor(public bottomSheetRef: MatBottomSheetRef<ModalAddComponent>, private http: HttpClient) {}

  title = '';
  imageUrl = '';
  subTitle = '';
  url = '';
  theme = '';
  dataSource = [];

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  updateDataSourceToGetId() {
    this.http.get<Array<any>>(URI, { responseType: 'json' }).subscribe((result: Array<any>) => {
      this.dataSource = [...result];
    });
  }

  ngOnInit() {
    this.updateDataSourceToGetId();
  }

  private registerData() {
    Id = this.dataSource[this.dataSource.length - 1].newsId + 1;
    console.log(Id);

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        newsId: Id,
        title: this.title,
        image_url: this.imageUrl,
        sub_title: this.subTitle,
        url: this.url,
        theme: this.theme
      }
    };

    return this.http.post(`${URI}/register`, options);
  }

  registerNews() {
    return this.registerData().subscribe(s => {
      console.log(s);
      this.updateDataSourceToGetId();
    });
  }
}
