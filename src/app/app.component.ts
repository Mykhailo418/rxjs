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
		const timer$ = timer(3000, 1000);
		const clickEvent$ = fromEvent(document, 'click');


		timer$.subscribe( (val: number) => this.count = val);
		clickEvent$.subscribe( (event: MouseEvent) => {
			this.mouseX = event.clientX;
			this.mouseY = event.clientY;
		});
	}
}
