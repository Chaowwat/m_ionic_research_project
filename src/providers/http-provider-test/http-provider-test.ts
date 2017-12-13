import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

/*
  Generated class for the HttpProviderTestProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HttpProviderTestProvider {

  //"https://emmobile.ais.co.th/api/";
  //"http://staging-emmobile.ais.co.th/api/";
  //private urlApi : string = "https://emmobile.ais.co.th/api/";

  private urlApi : string = "http://localhost:8443/eVendor/";

  private headersReq = new Headers();
  private options;

  constructor(private http: Http ) {
    console.log('Hello HttpProviderTestProvider Provider');

    // this.headersReq.set("ApiKey","a00049ba79152D03380c34652f2cb6121324AF");
    // this.headersReq.set("Content-Type","application/json; charset=utf-8");
    //this.headersReq.set("Access-Control-Allow-Origin","*");

    //this.options = new RequestOptions({headers:this.headersReq});

  }


  postHttp(apiName,jsonData){
    return this.http.post(this.urlApi+apiName,jsonData,this.options)
    .map(this.extractResponse)
    .do(this.logResponse)
    .catch(this.catchError);
  }

  getHttp(apiName){

    console.log(this.urlApi+apiName);

    return this.http.get(this.urlApi+apiName,this.options)
    .map(this.extractResponse)
    .do(this.logResponse)
    .catch(this.catchError);
  }

  getHeadersString(){
    return JSON.stringify(this.headersReq.toJSON());
  }

  getHeaders(){
    return this.headersReq;
  }

  setHeaders(jsonHeader){
    this.headersReq.set(jsonHeader.key,jsonHeader.value);
    this.options.headers = this.headersReq;
  }

  private logResponse(res){
    console.log(res);
  }

  private extractResponse(res){
    return res.json();
  }

  private catchError(errRes){
    return Observable.throw(JSON.stringify(errRes));
  }

}
