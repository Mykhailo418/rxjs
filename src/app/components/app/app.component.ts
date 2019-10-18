import { Component, OnInit } from '@angular/core';
import { timer, interval, fromEvent } from 'rxjs';

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
	}
}
