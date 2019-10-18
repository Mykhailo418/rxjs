import { Component, OnInit } from '@angular/core';
import {CustomObservableService} from '../../services/custom-observable.service';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.less']
})
export class ReposComponent implements OnInit {

  constructor(private reposService: CustomObservableService) { }

  loadRepos(){
    this.reposService.getRepos()
      .subscribe(
        (repos) => {
          console.log(repos);
        },
        err => console.log('ERROR', err),
        () => console.log('complete repos')
      );
  }

  ngOnInit() {
    this.loadRepos();
  }
}
