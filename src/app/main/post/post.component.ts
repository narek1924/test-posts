import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  DataStorageService,
  Post,
} from '../../shared/data-storage-service/data-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit, OnDestroy {
  post!: Post;
  loading = false;
  subscription = new Subscription();
  constructor(
    private dataStorageService: DataStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.subscription.add(
      this.dataStorageService
        .fetchPost(this.route.snapshot.params['id'])
        .subscribe((data) => {
          this.post = data;
          this.dataStorageService.postLoading.next(false);
        })
    );
    this.subscription.add(
      this.dataStorageService.postLoading.subscribe(
        (condition) => (this.loading = condition)
      )
    );
  }
  back() {
    this.router.navigate(['/main']);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
