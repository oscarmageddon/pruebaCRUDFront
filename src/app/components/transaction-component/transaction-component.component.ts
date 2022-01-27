import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  editando: boolean = false;
  errorMessage: any;

  trx: Transaction = {
    id: 0,
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

  obtenerTodas() {
    this.transactionService.getAll()
      .subscribe(transactions => {
        this.transactions = transactions;
        console.log('Transactions', transactions);
      });
      
  }
  // Oscar Campos
  guardar() {
    this.transactionService.saveTransaction(this.trx)
      .subscribe({
        next: (resp) => {
          this.obtenerTodas();
          this.resetearValores();
        },
        error: (respError) => {
          console.log(respError.error);
          this.errorMessage = respError.error.errorMessage;
          this.resetearValores();
        },
      });
  }

  // Creado por Mario Tigua
  // Función que permite buscar una transacción dado su dni y llenar el formulario con los datos de la transaccíon encontrada
  buscarPorDni() {
    this.transactionService.findTransactionByDni(this.trx.dniUsr)
      .subscribe({
        next: (resp) => {
          console.log('Respuesta ', resp);
          this.trx = {
            nombreUsr: resp.nombreUsr,
            apellidoUsr: resp.apellidoUsr,
            dniUsr: resp.dniUsr,
            paymentMethod: resp.paymentMethod,
            estado: resp.estado,
            id: resp.id
          };
          this.errorMessage = "";
        },
        error: (respError) => {
          console.log(respError.error);
          this.errorMessage = respError.error.errorMessage;
        },
      });
  }

  delete() {
    this.transactionService.delete(this.trx.id)
      .subscribe(resp => {
        this.resetearValores();
        this.obtenerTodas();
      });
  }

  getDeleteObj(tr: Transaction) {
    this.trx = tr;
  }

  actualizarEstadoDni() {
    if (this.trx.dniUsr !== '') {
      this.trx.estado = this.trx.estado === '1' ? '0' : '1';
      this.transactionService.updateStateByDni(this.trx)
        .subscribe(resp => {
          console.log('Updated: ', resp);
          this.obtenerTodas();
          this.errorMessage = "";
        });
    }
  }

  actualizarForm(transaction: any) {
    console.log(transaction);
    this.trx = {
      id: transaction.id,
      nombreUsr: transaction.nombreUsr,
      apellidoUsr: transaction.apellidoUsr,
      dniUsr: transaction.dniUsr,
      paymentMethod: transaction.paymentMethod,
      estado: transaction.estado
    }
    this.editando = true;
  }
  //  E.C "Se Agrega Funcion de editar"
  editar() {
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

  resetearValores() {
    this.trx = {
      id: 0,
      nombreUsr: '',
      apellidoUsr: '',
      dniUsr: '',
      paymentMethod: '',
      estado: '1'
    };
    this.editando = false;
    this.errorMessage = "";
  }
}
