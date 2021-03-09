import {BehaviorSubject, Observable} from 'rxjs'
import {shareReplay} from 'rxjs/operators'

export class SubjectWrap<TData = any> {

  subj: BehaviorSubject<TData>;
  value$: Observable<TData>;

  constructor(initValue: TData) {
    this.subj = new BehaviorSubject(initValue);
    this.value$ = this.subj.asObservable().pipe(
      shareReplay(1)
    );
  }

  get value(): TData {
    return this.subj.getValue()
  }

  set value(value: TData) {
    if (this.value !== value)
      this.subj.next(value)
  }

}
