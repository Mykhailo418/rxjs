import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Repo} from '../models/repo';

@Injectable({
  providedIn: 'root'
})
export class CustomObservableService {
  private githubReposURL: string = 'https://api.github.com/repositories';

  constructor() { }

  getRepos(){
    // Custom Observable
    return Observable.create(observer => {
      fetch(this.githubReposURL)
        .then(res => res.json())
        .then((repos: Repo[]) => observer.next(repos))
        .catch(err => observer.error(err))
        .finally(() => observer.complete());
    });
  }
}
