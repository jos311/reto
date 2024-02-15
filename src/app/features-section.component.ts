import { Component, OnInit } from "@angular/core";

@Component ({
  selector: 'hdb-week2-features-section',
  template: `
  <section class="p-16">
    <ul class="flex justify-center items-center gap-4">
      <li>Rapido</li>
      <li>Eficiente</li>
      <li>Seguro</li> 
    </ul>
  </section>
  `,
  standalone: true

})

export class FeaturesSectionComponent {}