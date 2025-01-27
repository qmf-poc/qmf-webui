/* eslint-disable no-console */

import {Subject} from 'rxjs';

const isDebug = (typeof process !== 'undefined') && process?.env?.LOG_LEVEL === 'DEBUG';

const log = {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  d: isDebug ? console.debug : (a?: unknown, b?: unknown, c?: unknown): void => undefined, // console.debug,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  debug: isDebug ? console.debug : (a?: unknown, b?: unknown, c?: unknown): void => undefined, // console.debug,
  error: console.error,
  info: console.info,
  warn: console.warn,
  rxUse(id: string, initial?: unknown): void {
    this.debug(`rx: ${id} use`, initial);
  },
  rxSetState(id: string, value?: unknown): void {
    if (value === undefined) {
      this.debug(`rx: ${id} setState`);
    } else {
      this.debug(`rx: ${id} setState(${value})`);
    }
  },
  rxState(id: string, state?: unknown): void {
    this.debug(`rx: ${id} return state:`, state);
  },
  rxAdd(id: string): void {
    if (!this.rxCounters[id]) {
      this.rxCounters[id] = 0;
    }
    this.rxCounters[id]++;
    this.debug(`rx: ${id} = ${this.rxCounters[id]} +`);
  },
  rxAddSubject<T>(id: string, subject: Subject<T>): void {
    this.debug(`rx: ${id} = ${subject.observers.length} +`);
  },
  rxCounters: {} as Record<string, number>,
  rxDel(id: string): void {
    if (!this.rxCounters[id]) {
      this.rxCounters[id] = 0;
    }
    this.rxCounters[id]--;
    if (this.rxCounters[id] < 0) {
      this.error(`rx: ${id} = ${this.rxCounters[id]} -`);
    } else {
      this.debug(`rx: ${id} = ${this.rxCounters[id]} -`);
    }
  },
  rxDelSubject<T>(id: string, subject: Subject<T>): void {
    this.debug(`rx: ${id} = ${subject.observers.length} -`);
  },
  disableDebug() {
    this.d = (): void => undefined;
    this.debug = (): void => undefined;
  },
};

export default log;
