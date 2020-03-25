import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent {

  @Input() url = null;

  constructor(
    private location: Location,
    private router: Router
  ) { }

  public onBackArrowClick() {
    if (this.url === null) {
      this.location.back();
    } else {
      this.router.navigate([`/${this.url}`]);
    }
  }
}
