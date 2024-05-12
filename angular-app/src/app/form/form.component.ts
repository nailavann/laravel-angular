import {Component} from '@angular/core';
import {AxiosService} from "../../services/axios.service";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {CountryISO, NgxIntlTelInputModule, SearchCountryField} from "@khazii/ngx-intl-tel-input";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {errorToast, successToast} from "../utils/toastParser";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    InputTextModule,
    NgxIntlTelInputModule,
    ToastModule,
    ReactiveFormsModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  form: FormGroup;

  constructor(private axiosService: AxiosService,
              private messageService: MessageService,
              private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      surname: ["", Validators.required],
      phone: ["", Validators.required],
      fullUrl: document.location.href
    });

  }

  onSubmit() {
    if (this.form.value.phone) {
      this.form.value.phone = this.form.value.phone.internationalNumber;
    }
    this.axiosService.instance().post('form', this.form.value).then((response) => {
      this.messageService.add({severity: 'success', summary: successToast(response)});
    }).catch((error) => {
      console.log(error);
      this.messageService.add({severity: 'error', detail: errorToast(error)});
    })
  }

  protected readonly CountryISO = CountryISO;
}
