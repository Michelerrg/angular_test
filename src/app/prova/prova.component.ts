import { LogService } from './../../services/log.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'prova',
  templateUrl: './prova.component.html',
  styleUrls: ['./prova.component.css']
})
export class ProvaComponent implements OnInit {

  errorResponse: string = '';
  logTest: FormGroup | any;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private logService: LogService, private router: Router) { }

  ngOnInit(): void {
    this.logTest = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  logMe() {
    this.logService.logUser(this.logTest.value).subscribe({
      next: (res) => {
        if(res){
          return this.router.navigate(['/']);
        }
        else {
          return alert("Accesso negato");
        }
      },
      error: (err) => {

      },
      complete: () => {

      }

    });
  }
}
