import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {Router, RouterLink} from "@angular/router";
import {successToast} from "../utils/toastParser";
import {LocalStorageService} from "../../services/local-storage.service";
import {MessageService} from "primeng/api";
import {AxiosService} from "../../services/axios.service";
import {FormListComponent} from "../form-list/form-list.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    ButtonModule,
    RouterLink,
    FormListComponent
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  constructor(
    private axiosService:AxiosService,
    private localStorageService: LocalStorageService,
    private messageService: MessageService,
    private router: Router) {
  }
}
