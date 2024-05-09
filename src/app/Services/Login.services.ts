import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Login } from "../models/login.model";

const baseUrl = 'http://192.168.1.102:4040/api';
const pincodeUrl = 'https://api.postalpincode.in/pincode';
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

    getAreaAndCity(pincode:String):Observable<any>{
        return this.http.get(`${pincodeUrl}/${pincode}`);
    }

    getServices():Observable<any>{
        return this.http.get(`${baseUrl}/services`);
    }

    postTakeServiceForm(data:any):Observable<any>{
        return this.http.post(`${baseUrl}/takeservice`,data);
    }

    getServicesCart():Observable<any>{
        return this.http.get(`${baseUrl}/getallservices`);
    }

}