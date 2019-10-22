import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { from, fromEvent, of } from 'rxjs';
import { filter, concatMap, mergeMap, exhaustMap, debounceTime,
  distinctUntilChanged, switchMap, catchError, throttleTime } from 'rxjs/operators';
import {customOperator} from '../../operators/customOperator'

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
      debounceTime(500), // delay after user finish typing, it start count again after each time user press key button
      //throttleTime(500), // delay, it runs observable after 500ms does not depend is user typing (you may not get last value!!!)
      distinctUntilChanged(), // Only emit when the current value is different than the last
      filter(() => this.componentForm.valid),
      customOperator('DEBUGGING OPERATOR'),
      //concatMap((changes: any) => this.saveForm(changes)), // one by one
      //mergeMap((changes: any) => this.saveForm(changes)), // in parallel, at the same time
      switchMap((changes: any) => this.saveForm(changes)), // emitting values only from the most recently projected Observable
      catchError((err: Error) => of('Handling Error Observable'))
    )
    .subscribe(console.log);
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
