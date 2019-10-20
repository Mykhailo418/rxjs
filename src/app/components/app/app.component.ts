import { Component, OnInit } from '@angular/core';
import { timer, interval, fromEvent, of } from 'rxjs';
import { concat, map, merge } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
	count: number;
	mouseX: number = 0;
	mouseY: number = 0;

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
}
