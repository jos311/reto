import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'hdb-week2-root',
  template: `
    <header>
      <h1>Hola, soy tu wallet!</h1>
    </header>
  `
})
export class AppComponent {

}
