import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators'

export const customOperator = (msg: string) => (observable: Observable<any>) => {
  return observable.pipe(
    tap(val => {
      console.log(msg, val);
    })
  );
}
