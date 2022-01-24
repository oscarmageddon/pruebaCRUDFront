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

  deleteStateByDni(trx: Transaction): Observable<Transaction> {
   return this.http.delete<Transaction>(`${this.baseUrl}/`);
  }

  getAll(): Observable<Array<Transaction>> {
    return this.http.get<Array<Transaction>>(`${this.baseUrl}/`);
  }

  getById(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.baseUrl}/${id}`+ id);
  }

  create(params: any) {
    return this.http.post(this.baseUrl, params);
  }

  updateStateByDni(trx: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.baseUrl}/${trx.id}`, trx);
  }
  
  findAll(): Observable<Transaction> {
  const headers = { 'content-type': 'application/json'};

  return this.http.get<Transaction>(`${ this.baseUrl }/`, {'headers': headers});
}

update(trx: Transaction): Observable<Transaction>{
  const headers = { 'content-type': 'application/json'};
  const body = JSON.stringify(trx);
  return this.http.put<Transaction>(`${ this.baseUrl }/`, body, {'headers': headers});
}
 

  delete(transactionId: String): Observable<Transaction>{
    const headers = { 'content-type': 'application/json'};
    return this.http.delete<Transaction>(`${ this.baseUrl }/`+transactionId, {'headers': headers});
  }
}
