import {Injectable} from '@angular/core';
import axios from "axios";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AxiosService {

  constructor(private localStorage: LocalStorageService) {
  }

  instance() {
    let instance = axios.create({
      baseURL: 'http://api.case/api',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })

    instance.interceptors.request.use(
      (config) => {
        if (this.localStorage.getItem('token')) {
          config.headers['Authorization'] = 'Bearer ' + this.localStorage.getItem('token');
        }
        return config;
      },
      (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
      }
    );

    instance.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return instance;
  }
}
