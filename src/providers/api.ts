import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class Api {
  serverPath: string = 'http://ferry.bersepadu.com';

  constructor(private http: Http) {}

  public signin(username, password) {
    return new Promise((resolve, reject) => {

      this.http.get(this.serverPath + '/api/auth.json?username=' + username + '&password=' + password)
      
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  public get_ferry_trips() {
    console.log('get_ferry_trips');
    return new Promise((resolve, reject) => {

      this.http.get(this.serverPath + '/api/ferry_trips.json')
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  public get_promotions() {
    return new Promise((resolve, reject) => {

      this.http.get(this.serverPath + '/promoted.json')
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  public get_terminals() {
    return new Promise((resolve, reject) => {

      this.http.get(this.serverPath + '/api/terminals.json')
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  public get_routes(location) {
    return new Promise((resolve, reject) => {

      this.http.get(this.serverPath + '/api/routes.json?location=' + location)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }



  public get_bustrips(route) {
    return new Promise((resolve, reject) => {

      this.http.get(this.serverPath + '/api/bustrips.json?route=' + route)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
}

