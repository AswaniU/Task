import { Component, ViewEncapsulation, OnInit } from '@angular/core';
// import {coerceNumberProperty} from '@angular/cdk/coercion';
import { HttpClient , HttpParams} from '@angular/common/http';
import { FormGroup, FormBuilder ,Validators ,FormControl} from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  max = 5000;
  min = 500;
  value:any = 0;
  duration:any = 6;
  showInterestDetails: boolean = false;
  interestDetails: any= [];
  data: [];
  details = [];
  opened: boolean = false;
  myInterestForm: FormGroup;
  constructor( private http: HttpClient , private formBuilder: FormBuilder) {
this.data = JSON.parse(localStorage.getItem('interestStorage'));
console.log("data" , this.data);
  }

  ngOnInit() {
    if(this.data.length >= 0) {
      this.opened = true;
    }


    this.myInterestForm = this.formBuilder.group({
      'value': new FormControl('',[Validators.required]),
      'duration': new FormControl('',[Validators.required])
    });
  }

  getInterestRate(){
    const urlParams = new URLSearchParams();
    // this.isPasswordValid = this.checkPasswordComplexity(password);)

    urlParams.append('amount',this.value);
    urlParams.append('numMonths' , this.duration);

    let params = new HttpParams();
    params = params.append('amount',this.value);
    params = params.append('numMonths' , this.duration);
    this.http.get(`https://ftl-frontend-test.herokuapp.com/interest?`,{params: params}).subscribe(res =>{
        console.log("done", res);
        this.showInterestDetails = true;
        this.opened = true;
        this.interestDetails =  res;
        this.details.push({loanAmount:this.value , loanDuration:this.duration});
        console.log("storage details" , this.details);
        localStorage.setItem('interestStorage', JSON.stringify(this.details));
        this.data = JSON.parse(localStorage.getItem('interestStorage'));
        console.log("dtaa" , this.data)
    }, err=>{
      console.log("error" , err);
    });
  }
}
