import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transaction } from '../transactions/transaction.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { TransactionService } from '../transactions/transaction.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-transaction-modal',
  templateUrl: './transaction-modal.component.html',
})
export class TransactionModalComponent {
transactionForm: FormGroup

constructor(public activeModal:NgbActiveModal,private fb:FormBuilder,
  private transactionService: TransactionService,private route: ActivatedRoute){}
  ngOnInit() {
    this.initializeForm();

  }


      onSubmit(){
        const formValue = this.transactionForm.value;
          const newTransaction = new Transaction(formValue.transactionDate, formValue.shop);
          this.transactionService.addTransaction(newTransaction)
          // .then(()=>{
          //     this.handleSuccess();
          // })
          // .catch((error) => {
          //   this.handleError(error);
          // });
        }
      
  

initializeForm() {
this.transactionForm = this.fb.group({
    transactionDate: ['', Validators.required],
    shop: ['', Validators.required]
});
}

handleSuccess() {

this.initializeForm(); // Reset the form after successful operation
}

handleError(error) {
this.initializeForm(); // Reset the form on error
console.log(error);
}



}

