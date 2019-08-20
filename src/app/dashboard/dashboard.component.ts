import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ModalAddComponent } from '../modal-add/modal-add.component';
import { ChangeDetectorRef } from '@angular/core';

export const URI = 'https://secure-mountain-94218.herokuapp.com/auth';
export let Id = 0;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
@Injectable()
export class DashboardComponent implements OnInit {
  constructor(private http: HttpClient, public bottomSheet: MatBottomSheet, private cRef: ChangeDetectorRef) {}
  dataSource = [];

  displayedColumns: string[] = ['theme', 'title', 'sub_title', 'image_url', 'url', 'delete'];
  ngOnInit() {
    this.updateQuote();
    Id = this.dataSource[this.dataSource.length - 1].newsId + 1;
  }
  openBottomSheet(): void {
    this.bottomSheet.open(ModalAddComponent);
  }

  private getData() {
    return this.http.get<Array<any>>(URI, { responseType: 'json' });
  }

  private updateQuote() {
    this.getData().subscribe((result: Array<any>) => {
      this.dataSource = [...result];
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

  public deleteNews(row) {
    this.deleteData(row).subscribe(s => {
      console.log(s);
    });
    this.dataSource = this.dataSource.filter(item => item.newsId !== row.newsId);
  }
}
