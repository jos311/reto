import { Component, inject} from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { ShyftApiService } from './shyft-api.service';
import { computedAsync } from 'ngxtension/computed-async';
import { injectPublicKey } from '@heavy-duty/wallet-adapter'
import { TransferModalComponent } from './transfer-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';


@Component ({
  selector: 'hdb-balance-section',
  imports: [ MatTableModule, MatCard, MatButton],
  standalone: true,
  template: `
    <section class="flex justify-center items-center gap-4 mb-2">
    <mat-card class="w-[400px] px-4 py-8">
      <h2 class="text-center text-3xl mb-4 text-white">Balance</h2>
      @if (!account()) {
        <p class="text-center text-orange-500">Conecta tu wallet para ver tu balance</p>
      } @else {
        <div class="flex justify-center">
          <img class="object-scale-down w-16 h-16 p-2" [src]="account()?.info?.image" />
          <p class="flex items-center text-4xl text-white font-bold">{{ account()?.balance }} </p>
        </div>

        <footer class="flex justify-center">
          <button mat-raised-button color="primary" (click)="onTransfer()">Transferir Fondos</button>
        </footer>
      }
     

    </mat-card>
    </section>
  `,

})

export class BalanceSectionComponent {
  private readonly _matDialog = inject(MatDialog);
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _publicKey = injectPublicKey();

  readonly account = computedAsync(() => 
    this._shyftApiService.getAccount(this._publicKey()?.toBase58()),
    );

    onTransfer() {
      this._matDialog.open(TransferModalComponent);
    }
}
