import { Component, OnInit} from "@angular/core";
import { TransferFormComponent, TransferFormPayload } from "./transfer-form.component";


@Component({
  selector: 'hdb-transfer-modal',
  template: `
  <div class="px-8 pt-16 pb-8">
  <h2 class="text-3xl text-center mb-8">Transferir fondos</h2>

  <hdb-transfer-form (submitForm)="onTransfer($event)"></hdb-transfer-form>
  </div>
  `,
  standalone: true,
  imports: [TransferFormComponent]
})

export class TransferModalComponent {
  onTransfer(payload: TransferFormPayload) {
    console.log('Hola mundo!', payload);
  }
}