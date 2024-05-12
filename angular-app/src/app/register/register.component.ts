import {Component} from '@angular/core';
import {AxiosService} from "../../services/axios.service";
import {ButtonModule} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {Router, RouterLink} from "@angular/router";
import {errorToast, successToast} from "../utils/toastParser";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ButtonModule,
    FormsModule,
    InputTextModule,
    PaginatorModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  formData = {
    email: '',
    password: ''
  };

  constructor(private axiosService: AxiosService,
              private router: Router,
              private messageService: MessageService) {
  }

  submitForm() {
    this.axiosService.instance().post('register', this.formData).then((response) => {
      this.messageService.add({severity: 'success', summary: successToast(response)});
      this.router.navigate(['/login']);
    }).catch((error) => {
      this.messageService.add({severity: 'error', detail: errorToast(error)});
    });
  }
}
