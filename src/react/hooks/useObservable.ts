import {useEffect, useState} from 'react';
import {Observable} from 'rxjs';
import log from '../../log';

const useObservable = <T>(observable: Observable<T>, initialValue: T, key?: string): T => {
  if (key) {
    log.rxUse(key, initialValue);
  }
  const [state, setState] = useState<T>(initialValue);

  useEffect(() => {
    if (key) {
      log.rxAdd(key);
    }
    const subscription = observable.subscribe((value: T): void => {
      if (key) {
        log.rxSetState(key, value);
      }
      setState(value);
    });

    return (): void => {
      if (key) {
        log.rxDel(key);
      }
      subscription.unsubscribe();
    };
  }, [key, observable]);
  if (key) {
    log.rxState(key, state);
  }
  return state;
};

export default useObservable;
