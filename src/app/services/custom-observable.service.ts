import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Repo} from '../models/repo';

@Injectable({
  providedIn: 'root'
})
export class CustomObservableService {
  private githubReposURL: string = 'https://api.github.com/repositories';
  private errorURL: string = 'https://api.gitthub.com';

  constructor() { }

  getRepos(){
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

  getErrorRequest(){
    return Observable.create(observer => {
      fetch(this.errorURL)
        .then(res => (res.ok) ? res.json() : observer.error(res.status))
        .then((data:any) => observer.next(data))
        .catch(err => observer.error(err))
        .finally(() => observer.complete());
    });
  }
}
