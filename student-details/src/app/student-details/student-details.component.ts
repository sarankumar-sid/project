import { Component, OnInit } from '@angular/core';
import { StudentDetailsService } from '../student-details.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  regNo: Number;
  name: string;
  email: string;
  phoneNumber: string;
  getPage: boolean;
  studentDetails:any;
  editOrInsert: string;

  constructor(private studentService: StudentDetailsService) { }

  ngOnInit(): void {
    this.getPage= false;
    this.editOrInsert="Insert";
  }

  insert(){
    let payload={
      regNo:this.regNo,
      name:this.name,
      email:this.email,
      phoneNumber:this.phoneNumber
    }
    this.studentService.create(payload).subscribe(res=>{
        this.get();
        this.getPage=true;
    },
    error=>{
        console.log("error");
    })
  }

  get(){
    this.studentService.get().subscribe(res=>{
      this.studentDetails=res;
      this.studentDetails.sort((a, b) => {
        return a.regNo - b.regNo;
    });
    
      this.getPage=true;
    },
    error=>{
      console.log("No data");
    })

  }

  update(){
    let payload={
      regNo:this.regNo,
      name:this.name,
      email:this.email,
      phoneNumber:this.phoneNumber
    }
    this.studentService.update(payload).subscribe(res=>{
        this.getPage=true;
        this.get();
    },
    error=>{
        console.log("error");
    })
  }

  delete(id){
      this.studentService.delete(id).subscribe(res=>{
          this.get();
          this.getPage=true;
      },error=>{
          console.log("Not deleted");
      })  
    }

    addNew(){
      this.getPage=false;
      this.regNo=null;
      this.email="";
      this.name="";
      this.phoneNumber="";
      this.editOrInsert="Insert";
    }

    edit(index){
      this.getPage=false;
      this.editOrInsert="Update";
      this.regNo=this.studentDetails[index].regNo;
      this.name=this.studentDetails[index].name;
      this.email=this.studentDetails[index].email;
      this.phoneNumber=this.studentDetails[index].phoneNumber;
    }

    remove(regNo){
      this.delete(regNo);
    }

}
