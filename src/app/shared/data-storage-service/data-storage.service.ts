import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, exhaustMap, take, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../UI/error-modal/error-modal.component';

export interface userData {
  name: string;
  imageUrl?: string;
}
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  postLoading = new BehaviorSubject<boolean>(false);
  fetching = new BehaviorSubject(true);
  profileImage = new BehaviorSubject<string>('');
  name = new BehaviorSubject<string>('');
  constructor(private http: HttpClient, private matDialog: MatDialog) {}

  fetchPosts() {
    this.postLoading.next(true);
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
  }
  fetchPost(id: number) {
    this.postLoading.next(true);
    return this.http.get<Post>(
      'https://jsonplaceholder.typicode.com/posts/' + id
    );
  }
  createUser(id: string, name: string) {
    this.fetching.next(true);
    let capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    return this.http.put(
      'https://posts-test-task-default-rtdb.europe-west1.firebasedatabase.app//users/' +
        id +
        '.json',
      {
        name: capitalizedName,
      }
    );
  }
  deleteUser(id: string) {
    return this.http.delete(
      'https://posts-test-task-default-rtdb.europe-west1.firebasedatabase.app/users/' +
        id +
        '.json'
    );
  }
  fetchData(id: string) {
    this.fetching.next(true);
    return this.http
      .get<userData>(
        'https://posts-test-task-default-rtdb.europe-west1.firebasedatabase.app/users/' +
          id +
          '.json'
      )
      .pipe(
        tap((data) => {
          this.name.next(data.name);
          if (data.imageUrl) {
            this.profileImage.next(data.imageUrl);
          }
        })
      );
  }
  addAvatar(id: string, url: string) {
    this.profileImage.next(url);
    return this.http.patch(
      'https://posts-test-task-default-rtdb.europe-west1.firebasedatabase.app//users/' +
        id +
        '.json',
      {
        imageUrl: url,
      }
    );
  }
}
