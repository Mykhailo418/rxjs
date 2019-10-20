import { Component, OnInit } from '@angular/core';
import { timer, interval, fromEvent, of } from 'rxjs';
import { concat } from 'rxjs/operators';

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
	}

  concatOperator(){
    const souce1$ = of(1, 2);
    const souce2$ = of(3, 4);
    const souce3$ = of(5, 6);

    souce1$.pipe(concat(souce2$, souce3$))
      .subscribe((val: number) => console.log('concatOperator: ', val));
  }
}
