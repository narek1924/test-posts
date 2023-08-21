import { NgModule } from '@angular/core';
import { MainComponent } from '../main.component';
import { SharedModule } from 'src/app/shared/shared-module/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { PostsComponent } from '../posts/posts.component';
import { PostComponent } from '../post/post.component';
import { ContentLoadingComponent } from 'src/app/shared/UI/content-loading/content-loading.component';
const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: PostsComponent },
      { path: 'post/:id', component: PostComponent },
    ],
  },
];

@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    PostsComponent,
    PostComponent,
    ContentLoadingComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class MainModule {}
