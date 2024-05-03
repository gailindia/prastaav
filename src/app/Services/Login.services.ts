import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Login } from "../models/login.model";

const baseUrl = 'http://192.168.1.100:4040/api';
@Injectable({
    providedIn: `root`,
})
export class LoginService{
    constructor (private http: HttpClient){}

    sendOTP(MobileNo: any): Observable<any>{
        return this.http.post(`${baseUrl}/Login`,MobileNo);
    }

    verifyOTP(data:any):Observable<any>{
        return this.http.post(`${baseUrl}/VerifyOTP`,data);
    }
}