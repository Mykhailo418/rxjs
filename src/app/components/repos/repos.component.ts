import { Component, OnInit } from '@angular/core';
import {CustomObservableService} from '../../services/custom-observable.service';
import {Repo} from '../../models/repo';
import {Observable} from 'rxjs';
import {map, tap, shareReplay} from 'rxjs/operators';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.less']
})
export class ReposComponent implements OnInit {
  privateRepos$: Observable<Repo[]>;
  publicRepos$: Observable<Repo[]>;

  constructor(private reposService: CustomObservableService) { }

  loadRepos(){
    const repos$ = this.reposService.getRepos().pipe(
      tap(() => console.log('Repos was loaded!')),
      shareReplay() // in order prevent multiple request to server, make only one request and share copy of data to other subscribers
    );
    this.privateRepos$ = repos$.pipe(
      map((repos: Repo[]) => repos.filter(repos => repos.private))
    );
    this.publicRepos$ = repos$.pipe(
      map((repos: Repo[]) => repos.filter(repos => !repos.private))
    );

    /*
    * Cancellation request
    const subscription = repos$.subscribe();
    subscription.unsubscribe()
    */

    //setTimeout(() => subscription.unsubscribe(), 0);
      /*this.reposService.getRepos().subscribe(
        (repos: Repo[]) => {
          this.repos = repos;
          console.log(this.repos);
        },
        err => console.log('ERROR', err),
        () => console.log('complete repos')
      );*/
  }

  ngOnInit() {
    this.loadRepos();
  }
}
