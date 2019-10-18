import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogPostService } from '../blog-post.service';
import { Subscription, timer, pipe } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit, OnDestroy {

  posts: any[] = [];
  subscription: Subscription;
  showPost: any;
  pageNumber = 0;

  constructor(private blogPostService: BlogPostService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
   this.subscription = timer(0, 10000).pipe(
    switchMap(() => this.blogPostService.getBlogs(++this.pageNumber))
    )
    .subscribe((result: any) => {
      result.hits.forEach(post => this.posts.push(post));
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
