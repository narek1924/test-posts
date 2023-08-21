import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  DataStorageService,
  Post,
} from 'src/app/shared/data-storage-service/data-storage.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
  posts!: Post[];
  pageSlice!: Post[];
  subscription = new Subscription();
  loading = false;
  constructor(
    private dataStorageService: DataStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.subscription.add(
      this.dataStorageService.fetchPosts().subscribe((data) => {
        this.posts = data;
        this.pageSlice = this.posts.slice(0, 5);
        this.dataStorageService.postLoading.next(false);
      })
    );
    this.subscription.add(
      this.dataStorageService.postLoading.subscribe(
        (condition) => (this.loading = condition)
      )
    );
  }
  showPost(postId: number) {
    this.router.navigate(['post', postId], { relativeTo: this.route.parent });
  }
  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.posts.length) {
      endIndex = this.posts.length;
    }
    this.pageSlice = this.posts.slice(startIndex, endIndex);
    console.log(this.pageSlice);
  }
  counter(n: number): number[] {
    return Array(n);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
