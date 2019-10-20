import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { from } from 'rxjs';
import { filter, concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less']
})
export class FormComponent implements OnInit {
  componentForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.componentForm = new FormGroup({
      'name': new FormControl('name'),
      'gender': new FormControl('gender')
    });
    this.componentForm.valueChanges.pipe(
      filter(() => this.componentForm.valid),
      concatMap((changes: any) => this.saveForm(changes))
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
