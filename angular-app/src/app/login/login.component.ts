import {Component} from '@angular/core';
import {AxiosService} from "../../services/axios.service";
import {ButtonModule} from "primeng/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {LocalStorageService} from "../../services/local-storage.service";
import {errorToast, successToast} from "../utils/toastParser";
import {MessageService} from "primeng/api";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formData = {
    email: '',
    password: ''
  };

  constructor(private axiosService: AxiosService,
              private localStorageService: LocalStorageService,
              private messageService: MessageService,
              private router: Router) {
  }


  submitForm() {
    this.axiosService.instance().post('login', this.formData).then((response) => {
      this.messageService.add({severity: 'success', summary: successToast(response)});
      this.localStorageService.setItem('token', response.data.access_token);
      this.router.navigate(['/home']);
    }).catch((error) => {
      this.messageService.add({severity: 'error', detail: errorToast(error)});
    });
  }
}
