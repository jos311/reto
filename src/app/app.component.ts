import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';
import { ShyftApiService } from './shyft-api.service';
import { WalletStore, ConnectionStore } from '@heavy-duty/wallet-adapter';
import { toSignal } from '@angular/core/rxjs-interop'
import { computedAsync } from 'ngxtension/computed-async'
import { MatAnchor} from '@angular/material/button'
import { MatDialog } from '@angular/material/dialog';
import { TransferModalComponent } from './transfer-modal.component';

@Component({
  standalone: true,
  imports: [RouterModule, HdWalletMultiButtonComponent, MatAnchor],
  selector: 'hdb-week2-root',
  template: `
    <header class="py-8">
      <h1 class="text-5xl text-center mb-4">Hola, soy tu wallet!</h1>
      <div class="flex justify-center mb-4">
      <hd-wallet-multi-button></hd-wallet-multi-button>
      </div>

  
      <nav>
        <ul class = "flex justify-center items-center gap-4">
          <li>
            <a [routerLink]="['']" mat-raised-button>Home</a>
          </li>
          <li>
            <a [routerLink]="['settings']" mat-raised-button>Settings</a>
          </li>
        </ul>
      </nav>
    </header>

    <main>
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent implements OnInit {
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _walletStore = inject(WalletStore);
  private readonly _publicKey = toSignal(this._walletStore.publicKey$);
  private readonly _matDialog = inject(MatDialog);
  private readonly _connectionStore = inject(ConnectionStore);

  readonly account = computedAsync(
    () => this._shyftApiService.getAccount(this._publicKey()?.toBase58()),
    { requireSync: true},
  );

  ngOnInit() {
    this._connectionStore.setEndpoint(this._shyftApiService.getEndpoint());
  }

}
