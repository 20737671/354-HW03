import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({ width: '200px' })),
      state('closed', style({ width: '0px' })),
      transition('open <=> closed', [animate('0.3s')])
    ])
  ]
})
export class AppComponent {
  title = 'HW03-Backend';
}
