import { LogService } from './../../services/log.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.css']
})
export class AppShellComponent implements OnInit {

  constructor(public logService: LogService) { }

  ngOnInit(): void {

  }

  logout() {
    this.logService.logoutUser();
  }
}
