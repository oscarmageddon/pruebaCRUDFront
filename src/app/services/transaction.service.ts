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
<<<<<<< HEAD
    return this.http.post<Transaction>(`${ this.baseUrl }/`, trx);
  }

  findTransactionByDni(dniUsr: String): Observable<Transaction> {
    return this.http.get<Transaction>(`${ this.baseUrl }/dni/`+dniUsr);
  }

  getAll() {
    return this.http.get<Transaction[]>(`${ this.baseUrl }/`);
}

getById(id: string) {
    return this.http.get<Transaction>(`${this.baseUrl}/${id}`);
}

create(params: any) {
    return this.http.post(this.baseUrl, params);
}

updateStateByDni(trx: Transaction): Observable<Transaction> {
  return this.http.put<Transaction>(`${this.baseUrl}/${trx.id}`, trx);
}

delete(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
}

=======
    return this.http.post<Transaction>(`${this.baseUrl}/`, trx);
  }

  findTransactionByDni(dniUsr: String): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.baseUrl}/dni/` + dniUsr);
  }

  updateStateByDni(trx: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.baseUrl}/${trx.id}`, trx);
  }
>>>>>>> origin
}
