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

  getAll(): Observable<Array<Transaction>> {
    return this.http.get<Array<Transaction>>(`${this.baseUrl}/`);
  }

  getById(id: string): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.baseUrl}/${id}`);
  }

  create(params: any) {
    return this.http.post(this.baseUrl, params);
  }

  updateStateByDni(trx: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.baseUrl}/${trx.id}`, trx);
  }

  delete(id: number) {
    console.log('deleting', id);
    return this.http.delete<Transaction>(`${this.baseUrl}/${id}`);
  }

  editTransaction(trx: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.baseUrl}/actualizar/${trx.id}`, trx);
  }
}

