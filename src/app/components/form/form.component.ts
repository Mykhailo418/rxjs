import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { from, fromEvent } from 'rxjs';
import { filter, concatMap, mergeMap, exhaustMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less']
})
export class FormComponent implements OnInit, AfterViewInit {
  @ViewChild('btnSubmit') btnSubmit: ElementRef;
  componentForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.componentForm = new FormGroup({
      'name': new FormControl('name'),
      'gender': new FormControl('gender')
    });
    this.componentForm.valueChanges.pipe(
      debounceTime(500), // delay
      distinctUntilChanged(), // Only emit when the current value is different than the last
      filter(() => this.componentForm.valid),
      //concatMap((changes: any) => this.saveForm(changes)), // one by one
      mergeMap((changes: any) => this.saveForm(changes)), // in parallel, at the same time
    )
    .subscribe();
  }

  ngAfterViewInit() {
    fromEvent(this.btnSubmit.nativeElement, 'click')
      .pipe(
        // like mergeMap but it will merge only observables if previous were completed
        exhaustMap(() => this.saveForm(this.componentForm.value))
      )
      .subscribe();
  }

  saveForm(changes: any){
    return from(new Promise((resolve, reject) => {
      // request to server goes here
      console.log('Form Changes: ', changes);
      setTimeout(() => resolve('Success'), 1000);
    }));
  }

}
