import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-start-testing',
  templateUrl: './start-testing.component.html',
  styleUrls: ['./start-testing.component.scss']
})
export class StartTestingComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  redirectStep4() {
    this.router.navigate(['./registration-step-3']);
  }

  redirectTestProcess() {
    this.router.navigate(['./test-process']);
  }
}
