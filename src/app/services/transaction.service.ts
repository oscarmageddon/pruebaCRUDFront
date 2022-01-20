import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Transaction } from '../interfaces/transaction.interface';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private baseUrl: string = 'http://localhost:8080/transaction'

  constructor(private http: HttpClient) { }

  saveTransaction(trx: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.baseUrl}/`, trx);
  }

  findTransactionByDni(dniUsr: String): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.baseUrl}/dni/` + dniUsr);
  }
  
  updateStateByDni(trx: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.baseUrl}/${trx.id}`, trx);
  }
<<<<<<< HEAD
} 
=======

  getAll(): Observable<Array<Transaction>> {
    return this.http.get<Array<Transaction>>(`${this.baseUrl}/`);
  }

  getById(id: string): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.baseUrl}/${id}`);
  }

  create(params: any): Observable<Transaction> {
    return this.http.post<Transaction>(this.baseUrl, params);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
>>>>>>> 366c32fe69b851fb061a350064637263ca782da0
