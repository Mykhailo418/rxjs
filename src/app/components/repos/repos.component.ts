import { Component, OnInit } from '@angular/core';
import {CustomObservableService} from '../../services/custom-observable.service';
import {Repo} from '../../models/repo';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.less']
})
export class ReposComponent implements OnInit {
  repos: Repo[];

  constructor(private reposService: CustomObservableService) { }

  loadRepos(){
    this.reposService.getRepos()
      .subscribe(
        (repos: Repo[]) => {
          this.repos = repos;
          console.log(this.repos);
        },
        err => console.log('ERROR', err),
        () => console.log('complete repos')
      );
  }

  ngOnInit() {
    this.loadRepos();
  }
}
