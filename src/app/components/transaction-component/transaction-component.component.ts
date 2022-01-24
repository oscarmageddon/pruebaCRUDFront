import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { first } from 'rxjs/operators';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../interfaces/transaction.interface';


@Component({
  selector: 'app-transaction-component',
  templateUrl: './transaction-component.component.html',
  styleUrls: ['./transaction-component.component.scss'],

})
export class TransactionComponentComponent implements OnInit {
  transactions!: Transaction[];
  nomUser: string = '';
  apeUser: string = '';
  dniUser: string = '';
  payMethod: string = '';
  transaId: string = '';
  errorMessage: any;
  transactionId: string = '';

  trx: Transaction = {
    nombreUsr: '',
    apellidoUsr: '',
    dniUsr: '',
    paymentMethod: '',
    estado: '1'
  }
  
  produc: any[] = [];

  constructor(private transactionService: TransactionService,) { }

  ngOnInit(): void {
    this.transactionService.getAll()
      .pipe(first())
      .subscribe(transactions => this.transactions = transactions);

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

  actualizarEstadoDni() {
    if (this.trx.dniUsr !== '') {
      this.trx.estado = this.trx.estado === '1' ? '0' : '1';
      this.transactionService.updateStateByDni(this.trx)
        .subscribe(resp => {
          console.log('Updated: ', resp);
        })
    }
  }

  /* delete(){
    this.transactionService.delete( item, )
    .subscribe ( resp => {
    console.log('Respuesta findBy', resp);
       this.guardar();
      
     })
  } */

  delete(){
    this.transactionService.delete( this.transactionId )
    .subscribe ( resp => {
      console.log('Respuesta findBy', resp);
      this.load();
      
    })
  }

  load(){
    this.transactionService.findAll()
      .subscribe((data:any)=> this.trx=data)
 
      this.nomUser = "";
      this.apeUser = "";
      this.dniUser ="";
      this.payMethod = "";
      this.trx = {
        nombreUsr: "",
        apellidoUsr: "",
        dniUsr: "",
        paymentMethod: "",
        estado: "",
        
        
      }
  }

  modificar(){
    this.trx = {

      nombreUsr: this.nomUser,
      apellidoUsr: this.apeUser,
      dniUsr: this.dniUser,
      paymentMethod: this.payMethod,
      estado: '1'
    
      }
  
      this.transactionService.update( this.trx )
        .subscribe ( resp => {
          console.log('Respuesta ', resp)
          this.load();
        })
    
  }

  
  
}
