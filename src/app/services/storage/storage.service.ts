import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService<T> {

  constructor() { }
  add = (key: string, data:T) => localStorage.setItem(key, JSON.stringify(data));
  get = (key:string):T | T[] => {
   const data = localStorage.getItem(key); 
   return data ? JSON.parse(data) : [];
  } 
  remove = (key:string):void => localStorage.removeItem(key);
  clear = ():void => localStorage.clear();
}
