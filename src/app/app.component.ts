import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { HttpClient , HttpParams} from '@angular/common/http';


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
  historyData: [];
  details = [];
  opened: boolean = false;
  errorMessage = "";

  constructor( private http: HttpClient) {
    this.historyData = JSON.parse(localStorage.getItem('interestStorage'));
  }

  ngOnInit() {
    if(this.historyData.length >= 0) {
      this.opened = true;
    }
  }

  getInterestRate(){
    let params = new HttpParams();
    params = params.append('amount',this.value);
    params = params.append('numMonths' , this.duration);
    this.http.get(`https://ftl-frontend-test.herokuapp.com/interest?`,{params: params}).subscribe(res =>{
        this.interestDetails =  res;
        if(this.interestDetails.status == 'error') {
          this.errorMessage ='Please Enter loan amount should be $500 to $5000 and loan duration between 6 to 24 months.';

        } else{
          this.showInterestDetails = true;
          this.errorMessage = ""  ;
          this.opened = true;
          this.details.push({loanAmount:this.value , loanDuration:this.duration});
          localStorage.setItem('interestStorage', JSON.stringify(this.details));
          this.historyData = JSON.parse(localStorage.getItem('interestStorage'));
        }
     
    }, err=>{
      console.log("error" , err);
    });
  }
}
