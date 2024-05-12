import {Component} from '@angular/core';
import {AxiosService} from "../../services/axios.service";
import {PaginatorModule} from "primeng/paginator";
import {TableModule} from "primeng/table";
import {PanelModule} from "primeng/panel";

@Component({
  selector: 'app-form-list',
  standalone: true,
  imports: [
    PaginatorModule,
    TableModule,
    PanelModule
  ],
  templateUrl: './form-list.component.html',
  styleUrl: './form-list.component.css'
})
export class FormListComponent {
  data: any[] = [];
  rows: number = 0;
  totalRecords: number = 0;
  page: number = 1;
  isLoading = false;

  constructor(private axiosService: AxiosService) {
    this.loadData();
  }

  onPageChange(event: any) {
    this.page = event.page + 1;
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.axiosService.instance().get<any, any>('form', {
      params: {
        page: this.page
      }
    }).then((response) => {
      this.data = response.data;
      this.totalRecords = response.meta.total;
      this.rows = response.meta.per_page;
    }).finally(() => {
      this.isLoading = false;
    });
  }

}
