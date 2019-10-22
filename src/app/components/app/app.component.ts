import { Component, OnInit } from '@angular/core';
import {CustomObservableService} from '../../services/custom-observable.service';
import {customOperator} from '../../operators/customOperator'
import { timer, interval, fromEvent, of, forkJoin } from 'rxjs';
import { concat, map, merge, retryWhen, delayWhen, tap, delay, first, take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
	count: number;
	mouseX: number = 0;
	mouseY: number = 0;

  constructor(private customObservableService: CustomObservableService){}

	ngOnInit(){
		const interval$ = interval(1000); // like a setInterval()
		const timer$ = timer(3000, 1000); // setInterval with delay 3 seconds
		const clickEvent$ = fromEvent(document, 'click');

		clickEvent$.subscribe( (event: MouseEvent) => {
			this.mouseX = event.clientX;
			this.mouseY = event.clientY;
		});
    const timerSubscription = timer$.subscribe(
      (val: number) => {
        // Callback
        this.count = val
      },
      (err: any) => {
        // Error Callback
        console.error(err);
      },
      () => {
        // on Complete callback
        console.log('Complete timer');
      }
    );
    setTimeout(() => timerSubscription.unsubscribe(), 9000);

    this.concatOperator();
    this.mergeOperator();
    this.retryRequest();
    this.joinObservables();
    this.getLimitValues();
	}

  concatOperator(){
    const souce1$ = of(1, 2);
    const souce2$ = of(3, 4);
    const souce3$ = of(5, 6);
    // concat - combine onservables in one run them one by one
    // after source1 complete -> start source2, after source2 complete -> start source3
    souce1$.pipe(concat(souce2$, souce3$))
      .subscribe((val: number) => console.log('concatOperator: ', val));
  }

  mergeOperator(){
    const interval1$ = interval(1000);
    const interval2$ = interval1$.pipe(map((val: number) => val*10));
    // merge - combine observables in one that runs at the same time
    const mergeSubscribtion = interval1$.pipe(
      merge(interval2$)
    )
    .subscribe((val: number) => console.log('mergeOperator: ', val));
    setTimeout(() => mergeSubscribtion.unsubscribe(), 5000);
  }

  retryRequest(){
    const subscription = this.customObservableService.getErrorRequest().pipe(
      tap(console.log), // if there is anything before 'retryWhen', it does not work for some reason
      retryWhen(errors => errors.pipe(
        tap(val => console.log(`Retry error ${val}`)),
        //delay(2000)
        delayWhen(() => timer(2000)) //in examples this way is prefereable then just delay
      ))
    )
    .subscribe();
    setTimeout(() => subscription.unsubscribe(), 6000);
  }

  joinObservables(){
    const userInfo$ = this.customObservableService.getUserInfo();
    const userRepos$ = this.customObservableService.getUserRepos();
    // run observables in parallel and combine their each LAST value in array, it waits for completion
    forkJoin(userInfo$, userRepos$).pipe(
      customOperator('USER INFO: ')
    )
    .subscribe();
  }

  getLimitValues(){
    interval(1000).pipe(
      //first(), // take first value and complete observable
      take(4) // take first n-th values and complete observable
    )
    .subscribe((val: number) => console.log('getLimitValues: ', val));
  }
}
