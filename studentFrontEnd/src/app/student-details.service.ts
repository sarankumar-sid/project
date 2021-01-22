import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class StudentDetailsService {

  constructor(private http:HttpClient) { }

  public create(payload){
    return this.http.post("http://localhost:8080/student",payload);
  }
  public delete(id){
    let url="http://localhost:8080/student/"+id;
    return this.http.delete(url);
  }
  public update(payload){
    return this.http.put("http://localhost:8080/student",payload);
  }

  public get(){
    return this.http.get("http://localhost:8080/student");
  }
}
