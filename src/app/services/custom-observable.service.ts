import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Repo} from '../models/repo';

@Injectable({
  providedIn: 'root'
})
export class CustomObservableService {
  private githubReposURL: string = 'https://api.github.com/repositories';
  private errorURL: string = 'https://api.gitthub.com';
  private user: string = 'mykhailo418';

  constructor() { }

  getRepos() : Observable<any> {
    // Custom Observable
    return Observable.create(observer => {
      const controller = new AbortController(); // native JS class
      const signal = controller.signal;

      fetch(this.githubReposURL, {signal})
        .then(res => (res.ok) ? res.json() : observer.error(res.status))
        .then((repos: Repo[]) => observer.next(repos))
        .catch(err => observer.error(err))
        .finally(() => observer.complete());

      return function cancellationFunction(){
        controller.abort();
      }
    });
  }

  getErrorRequest() : Observable<any> {
    return this.fetchUrlWithObservable(this.errorURL);
  }

  getUserInfo() : Observable<any> {
      return this.fetchUrlWithObservable(`https://api.github.com/users/${this.user}`);
  }

  getUserRepos() : Observable<any> {
      return this.fetchUrlWithObservable(`https://api.github.com/users/${this.user}/repos`);
  }

  fetchUrlWithObservable(url: string) : Observable<any> {
    return Observable.create(observer => {
      fetch(url)
        .then(res => (res.ok) ? res.json() : observer.error(res.status))
        .then((data: any) => observer.next(data))
        .catch(err => observer.error(err))
        .finally(() => observer.complete());
    });
  }
}
