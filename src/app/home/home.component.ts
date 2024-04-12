import { LogService } from './../../services/log.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/models/User';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'home';

  writeText: string = '';
  formTest: FormGroup | any;
  errorResponse: string = '';
  usersData: User[];

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router, public logService: LogService) {
    this.buildForm();
    this.loadImg();
  }

  ngOnInit(): void {
    this.getAllUsers();

    console.log("OnInit ANDATA! Inizializzato");
  }

  ngOnChanges() {
    console.log("OnChanges ANDATA!");
  }

  ngDoCheck() {
    console.log("DoCheck ANDATA! Controllo");
  }

  ngAfterContentInit(){
    console.log("AfterContentInit ANDATA! Contenuto inizializzato");
  }

  ngAfterContentChecked(){
    console.log("AfterContentChecked ANDATA! Contenuto controllato");
  }

  ngAfterViewInit(){
    console.log("AfterViewInit ANDATA! View inizializzata");
  }

  ngAfterViewChecked(){
    console.log("AfterViewChecked ANDATA! View controllata");
  }

  ngOnDestroy(){
    console.log("SEARCH AND DESTROY");
  }


  buildForm(u?: User) {
    if(u != null) {
      this.formTest = this.formBuilder.group({
        idUser: [u.idUser, Validators.required],
        username: [u.username, Validators.required],
        password: [u.password, Validators.required]
      })
    }
    else {
      this.formTest = this.formBuilder.group({
        idUser: ['0', Validators.required],
        username: ['', Validators.required],
        password: ['', Validators.required]
      })
    }
  }

  getAllUsers() {
    this.apiService.getUsers().subscribe({
      next: (res) => {
        this.usersData = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  addNewUser() {
    this.apiService.addUser(this.formTest.value).subscribe({
      next: (res) => {
        this.buildForm();
      },
      error: (err) => {

      },
      complete: () => {
        this.getAllUsers();
      }

    });
  }

  printMe() {
    console.log(this.formTest.value);
    console.log(this.formTest.valid);
    if(this.formTest.valid) {
      this.addNewUser();
      this.errorResponse ='';
    }
    else {
      this.errorResponse = "Compila correttamente tutti i campi!";
    }
  }

  deleteMe(u: User) {
    this.apiService.deleteUser(u.idUser).subscribe({
      next: (res) => {
        this.buildForm();
      },
      error: (err) => {

      },
      complete: () => {
        this.getAllUsers();
      }

    })
  }

  editMe(u: User) {
    console.log(u);
    this.buildForm(u);
  }

  loadImg() {
    return "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/768px-User_icon_2.svg.png";
  }
}
