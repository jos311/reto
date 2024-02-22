import { Component, OnInit } from '@angular/core';
import { TransactionsSectionComponent } from './transactions-section.component';
import { BalanceSectionComponent } from './balance-section.component';

@Component({
  selector: 'hdb-week2-home-page',
  template: `
    <hdb-balance-section></hdb-balance-section>
    <hdb-week2-transactions-section></hdb-week2-transactions-section>
  `,
  standalone: true,
  imports: [TransactionsSectionComponent, BalanceSectionComponent],
})
export class HomePageComponent {}
