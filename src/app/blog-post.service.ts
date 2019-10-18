import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private http: HttpClient) { }

  getBlogs(page) {
    return this.http.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`);
  }
}
