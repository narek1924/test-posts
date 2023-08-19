import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, exhaustMap, take, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../UI/error-modal/error-modal.component';

export interface userData {
  name: string;
  tasks: Task[];
  lists: string[];
  imageUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  fetching = new BehaviorSubject(true);
  profileImage = new BehaviorSubject<string>(null as any);
  constructor(private http: HttpClient, private matDialog: MatDialog) {}

  createUser(id: string, name: string) {
    this.fetching.next(true);
    let capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    return this.http.put(
      'https://portfolio-project-12-default-rtdb.firebaseio.com/users/' +
        id +
        '.json',
      {
        name: capitalizedName,
        tasks: [],
        lists: ['Personal', 'Grocery list', 'Work'],
      }
    );
  }
  deleteUser(id: string) {
    return this.http.delete(
      'https://portfolio-project-12-default-rtdb.firebaseio.com/users/' +
        id +
        '.json'
    );
  }
  fetchData(id: string) {
    this.fetching.next(true);
    return this.http
      .get<userData>(
        'https://portfolio-project-12-default-rtdb.firebaseio.com/users/' +
          id +
          '.json'
      )
      .pipe(
        tap((data) => {
          if (data.imageUrl) {
            this.profileImage.next(data.imageUrl);
          }
        })
      );
  }
  addAvatar(id: string, url: string) {
    this.profileImage.next(url);
    return this.http.patch(
      'https://portfolio-project-12-default-rtdb.firebaseio.com/users/' +
        id +
        '.json',
      {
        imageUrl: url,
      }
    );
  }
}
