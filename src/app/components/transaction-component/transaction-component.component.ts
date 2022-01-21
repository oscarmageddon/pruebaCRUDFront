import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../interfaces/transaction.interface';
import { compileNgModuleDeclarationExpression } from '@angular/compiler/src/render3/r3_module_compiler';


@Component({
  selector: 'app-transaction-component',
  templateUrl: './transaction-component.component.html',
  styleUrls: ['./transaction-component.component.scss'],

})
export class TransactionComponentComponent implements OnInit {

  transactions: Array<Transaction> = new Array<Transaction>();

  id: number = 0;
  nomUser: string = '';
  apeUser: string = '';
  dniUser: string = '';
  payMethod: string = '';

  editando: boolean = false;

  errorMessage: any;

  trx: Transaction = {
    id:0,
    nombreUsr: '',
    apellidoUsr: '',
    dniUsr: '',
    paymentMethod: '',
    estado: '1'
  }


  constructor(private transactionService: TransactionService,) { }

  ngOnInit(): void {
    this.obtenerTodas();
  }
  
  obtenerTodas(){
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
        },
      })
  }

  deleteTras(id: number) {
    this.transactionService.delete(id)
      .subscribe(data => {
        // this.transactions=this.transactions.filter(t=>t!== id)
        alert("Transaction Eliminada...");
      });
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

  actualizarForm(transaction: any) {
    console.log(transaction);
    this.id = transaction.id;
    this.nomUser = transaction.nombreUsr;
    this.apeUser = transaction.apellidoUsr;
    this.dniUser = transaction.dniUsr;
    this.payMethod = transaction.paymentMethod;
    this.trx.estado = transaction.estado;

    this.editando = true;
  }

  editar() {
    this.trx = {
      id: this.id,
      nombreUsr: this.nomUser,
      apellidoUsr: this.apeUser,
      dniUsr: this.dniUser,
      paymentMethod: this.payMethod,
    }

    this.transactionService.editTransaction(this.trx)
    .subscribe({
      next: (resp) => {
        console.log('Respuesta ', resp);
        this.resetearValores();
        this.obtenerTodas();
      },
      error: (respError) => {
        console.log(respError.error);
        this.errorMessage = respError.error.errorMessage;
      },
    })

  }

  resetearValores(){
    this.id= 0;
    this.nomUser = '';
    this.apeUser = '';
    this.dniUser = '';
    this.payMethod = '';
   this.editando = false;
  }

}
