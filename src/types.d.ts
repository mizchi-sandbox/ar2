/// <reference path='../typings/bundle.d.ts' />

declare class EventEmitter {
  on(name: string, fn: Function): void;
  off(name: string, fn?: Function): void;
  emit(name: string, ...args: any[]): void;
}
