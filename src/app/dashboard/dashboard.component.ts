import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ModalAddComponent } from '../modal-add/modal-add.component';

const URI = 'https://secure-mountain-94218.herokuapp.com/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
@Injectable()
export class DashboardComponent implements OnInit {
  constructor(private http: HttpClient, public _bottomSheet: MatBottomSheet) {}
  dataSource = [];
  displayedColumns: string[] = ['theme', 'title', 'sub_title', 'image_url', 'url', 'delete'];
  ngOnInit() {
    this.updateQuote();
  }
  openBottomSheet(): void {
    this._bottomSheet.open(ModalAddComponent);
  }

  private getData() {
    return this.http.get<Array<any>>(URI, { responseType: 'json' });
  }

  async updateQuote() {
    this.getData().subscribe((result: Array<any>) => {
      this.dataSource = result;
      console.log(result);
    });
  }

  private deleteData(row) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        id: row.newsId
      }
    };
    return this.http.delete(`${URI}/delete-news/${row.newsId}`, options);
  }

  async deleteNews(row) {
    console.log(`${URI}/delete-news/${row.newsId}`);
    Promise.resolve()
      .then(() => {
        this.deleteData(row).subscribe(s => {
          console.log(s);
        });
      })
      .then(() => {
        this.updateQuote();
      });
  }
}
