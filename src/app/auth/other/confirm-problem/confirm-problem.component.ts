import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-confirm-problem',
  templateUrl: './confirm-problem.component.html',
  styleUrls: ['./confirm-problem.component.scss']
})
export class ConfirmProblemComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  redirectToLogin(){
    this.router.navigate(['./login']);
  }
}
