import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../interfaces/transaction.interface';


@Component({
  selector: 'app-transaction-component',
  templateUrl: './transaction-component.component.html',
  styleUrls: ['./transaction-component.component.scss']
})
export class TransactionComponentComponent implements OnInit {
  transactions!: Transaction[];
  nomUser: string = '';
  apeUser: string = '';
  dniUser: string = '';
  payMethod: string = '';

  trx: Transaction = {
      nombreUsr: '',
      apellidoUsr: '',
      dniUsr: '',
      paymentMethod: '',
      estado: '1'
  }

  
  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {

    
  }

  guardar() {
      this.trx = {
      nombreUsr: this.nomUser,
      apellidoUsr: this.apeUser,
      dniUsr: this.dniUser,
      paymentMethod: this.payMethod,
      estado: '1'
    }

    this.transactionService.saveTransaction( this.trx )
      .subscribe ( resp => {
        console.log('Respuesta ', resp)
      })
  }

  buscarPorDni() {
    this.transactionService.findTransactionByDni( this.dniUser )
      .subscribe ( resp => {
        console.log('Respuesta ', resp);
        this.nomUser = resp.nombreUsr;
        this.apeUser = resp.apellidoUsr;
        this.dniUser = resp.dniUsr;
        this.payMethod = resp.paymentMethod;
      })
  }



  Listar() {
  this.transactionService.getAll()
    .pipe(first())
    .subscribe(transactions=> this.transactions = transactions);
}

}
