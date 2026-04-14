import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppSpinnerComponent } from "./shared/components/common/spinner/app-spinner.component";
import { Store } from '@ngrx/store';
import { State } from './core/data-access/store';
import { selectAppProp } from './core/data-access/application/application.selector';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    AppSpinnerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Madaure Adminstrateur';
  private store = inject(Store<State>);
  loading$ = this.store.selectSignal(selectAppProp('loading'));


}
