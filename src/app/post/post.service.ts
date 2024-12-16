import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'https://angular-lkardas.europe-west1.firebasedatabase.app/posts.json';

  constructor() {}

  // Koristim fetch API za dohvacanje, zato sto je Angular-ov HttpClient modul deprecated
  getPosts(): Observable<any[]> {
    return from(fetch(this.apiUrl).then((response) => response.json())).pipe(
      map((res: any) => {
        const posts = [];
        for (let key in res) {
          posts.push({ ...res[key], id: key });
        }
        return posts;
      })
    );
  }

  addPost(post: any): Observable<any> {
    return from(
      fetch(this.apiUrl, {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => response.json())
    );
  }

  updatePost(post: any): Observable<any> {
    const url = `https://angular-lkardas.europe-west1.firebasedatabase.app/posts/${post.id}.json`;
    return from(
      fetch(url, {
        method: 'PUT',
        body: JSON.stringify(post),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => response.json())
    );
  }

  deletePost(postId: string): Observable<any> {
    const url = `https://angular-lkardas.europe-west1.firebasedatabase.app/posts/${postId}.json`;
    return from(
      fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => response.json())
    );
  }
}
