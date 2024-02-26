import { Component, OnInit, inject, computed } from '@angular/core';
import { TransferFormComponent, TransferFormPayload } from './transfer-form.component';
import { injectTransactionSender } from '@heavy-duty/wallet-adapter';
import { createTransferInstructions } from '@heavy-duty/spl-utils';
import { MatProgressSpinner } from '@angular/material/progress-spinner'
import { MatDialogRef } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar'




@Component({
  selector: 'hdb-transfer-modal',
  template: `
  <div class="px-8 pt-16 pb-8">
  <h2 class="text-3xl text-center mb-8">Transferir fondos</h2>

  <hdb-transfer-form (submitForm)="onTransfer($event)"></hdb-transfer-form>
  </div>
  `,
  standalone: true,
  imports: [TransferFormComponent, MatProgressSpinner]
})

export class TransferModalComponent {
  private readonly _transactionSender = injectTransactionSender();
  private readonly _matDialogRef = inject(MatDialogRef);
  private readonly _matSnackBar = inject(MatSnackBar);

  readonly transactionStatus = computed(() => this._transactionSender().status);
  readonly isRunning = computed(() =>
    this.transactionStatus() === 'sending' ||
    this.transactionStatus() === 'confirming' ||
    this.transactionStatus() === 'finalizing',
  )


  onTransfer(payload: TransferFormPayload) {

    this._matDialogRef.disableClose = true;

    this._transactionSender.send(({publicKey}) => createTransferInstructions({
      amount: payload.amount * 10**9,
      mintAddress: '7EYnhQoR9YM3N7UoaKRoA44Uy8JeaZV3qyouov87awMs',
      receiverAddress: payload.receiverAddress,
      senderAddress: publicKey.toBase58(),
      fundReceiver: true,
      memo: payload.memo 
    }), )
      .subscribe({
        next: (signature) => console.log(`Firma: ${signature}`),
        error: error => console.error(error),
        complete: () => console.log('Transacción lista.'),
      })

  }
}