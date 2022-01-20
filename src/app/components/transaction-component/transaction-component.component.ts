import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../interfaces/transaction.interface';
import { compileNgModuleDeclarationExpression } from '@angular/compiler/src/render3/r3_module_compiler';

@Component({
  selector: 'app-transaction-component',
  templateUrl: './transaction-component.component.html',
  styleUrls: ['./transaction-component.component.scss']
})
export class TransactionComponentComponent implements OnInit {

  transactions: Array<Transaction> = new Array<Transaction>() ;

  nomUser: string = '';
  apeUser: string = '';
  dniUser: string = '';
  payMethod: string = '';

  editando: boolean = false;

  errorMessage: any; 

  trx: Transaction = {
    nombreUsr: '',
    apellidoUsr: '',
    dniUsr: '',
    paymentMethod: '',
    estado: '1'
  }

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.transactionService.getAll()
      .subscribe(transactions => {
        this.transactions = transactions;
        console.log('Transactions', transactions);
      });
  }

  guardar() {
    this.trx = {
      nombreUsr: this.nomUser,
      apellidoUsr: this.apeUser,
      dniUsr: this.dniUser,
      paymentMethod: this.payMethod,
      estado: '1'
    }

    this.transactionService.saveTransaction(this.trx)
      .subscribe({
        next: (resp) => console.log('Respuesta ', resp),
        error: (respError) => {
          console.log(respError.error);
          this.errorMessage = respError.error.errorMessage;
        },
      })
  }

  buscarPorDni() {
    this.transactionService.findTransactionByDni(this.dniUser)
      .subscribe({
        next: (resp) => {
        console.log('Respuesta ', resp);
        this.nomUser = resp.nombreUsr;
        this.apeUser = resp.apellidoUsr;
        this.dniUser = resp.dniUsr;
        this.payMethod = resp.paymentMethod;
        this.trx = {
          nombreUsr: resp.nombreUsr,
          apellidoUsr: resp.apellidoUsr,
          dniUsr: resp.dniUsr,
          paymentMethod: resp.paymentMethod,
          estado: resp.estado,
          id: resp.id
        }
      },
      error: (respError) => {
        console.log(respError.error);
        this.errorMessage = respError.error.errorMessage;
      }})
  }

  actualizarEstadoDni() {
    if (this.trx.dniUsr !== '') {
      this.trx.estado = this.trx.estado === '1' ? '0' : '1';
      this.transactionService.updateStateByDni(this.trx)
        .subscribe(resp => {
          console.log('Updated: ', resp);
        })
    }
  }


  actualizarForm(transaction:any) {
    console.log(transaction);
    this.nomUser = transaction.nombreUsr;
    this.apeUser = transaction.apellidoUsr;
    this.dniUser = transaction.dniUsr;
    this.payMethod = transaction.paymentMethod;

    this.editando = true;
  }

}
