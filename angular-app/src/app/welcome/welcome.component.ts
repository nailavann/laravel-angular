import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    ButtonModule,
    RouterLink
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

}
