import {Component} from '@angular/core';
import {FormComponent} from "../form/form.component";
import {ButtonModule} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {Router, RouterLink} from "@angular/router";
import {LocalStorageService} from "../../services/local-storage.service";
import {errorToast, successToast} from "../utils/toastParser";
import {AxiosService} from "../../services/axios.service";
import {MessageService} from "primeng/api";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormComponent,
    ButtonModule,
    FormsModule,
    InputTextModule,
    PaginatorModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  isAdmin: any;
  isLoading: any;

  constructor(private localStorageService: LocalStorageService,
              private axiosService: AxiosService,
              private messageService: MessageService,
              private router: Router) {
    this.getUser();
  }

  getUser() {
    this.isLoading = true;
    this.axiosService.instance().get('user').then((response) => {
      if (response.data.userType.isAdmin) {
        this.isAdmin = true;
        this.localStorageService.setItem('isAdmin', true);
      } else {
        this.localStorageService.removeItem('isAdmin');
      }

    }).catch((error) => {
      this.messageService.add({severity: 'error', detail: errorToast(error)});
    }).finally(() => {
      this.isLoading = false;
    });
  }

  logout() {
    this.axiosService.instance().get('logout').then((response) => {
      this.router.navigate(['/welcome']);
      this.localStorageService.clear();
      this.messageService.add({severity: 'success', summary: successToast(response)});
    });
  }

}
