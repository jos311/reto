import { Component, OnInit } from "@angular/core";
import { HeroSectionComponent } from "./hero-section.component";
import { FeaturesSectionComponent } from "./features-section.component";
import {TransactionsSectionComponent } from "./transactions-section.component"

@Component({
  selector:'hdb-week2-home-page',
  template: `
    <hdb-week2-transactions-section></hdb-week2-transactions-section>
    <hdb-week2-hero-section></hdb-week2-hero-section>
    <hdb-week2-features-section></hdb-week2-features-section>
  `,
  standalone: true,
  imports: [HeroSectionComponent, FeaturesSectionComponent, TransactionsSectionComponent]
})

export class HomePageComponent {}