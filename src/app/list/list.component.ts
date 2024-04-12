import { ListService } from './../../services/list.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  formList: FormGroup | any;
  errorResponse: string = '';
  listData: string[];

  constructor(private formBuilder: FormBuilder, private router: Router,  private listService: ListService) {
    this.buildFormList();
   }

  ngOnInit(): void {
    this.getList();
  }

  buildFormList() {
      this.formList = this.formBuilder.group({
        element: ['', Validators.required]
      })
  }

  getList() {
    this.listService.getElements().subscribe({
      next: (res) => {
        this.listData = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  addIt() {
    this.listService.addElement(this.formList.value).subscribe({
      next: (res) => {
        this.buildFormList();
      },
      error: (err) => {

      },
      complete: () => {
        this.getList();
      }

    });
  }

  rememberIt() {
    console.log(this.formList.value);
    console.log(this.formList.valid);
    if(this.formList.valid) {
      this.addIt();
      this.errorResponse ='';
    }
    else {
      this.errorResponse = "Inserisci un valore!";
    }
  }

  deleteIt(e: string) {
    this.listService.deleteElement(e).subscribe({
      next: (res) => {
        this.buildFormList();
      },
      error: (err) => {

      },
      complete: () => {
        this.getList();
      }

    })
  }
}
