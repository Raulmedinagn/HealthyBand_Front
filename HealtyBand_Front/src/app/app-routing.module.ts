import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeartRateComponent } from './components/heart-rate/heart-rate.component';

const routes: Routes = [
  { path: 'rate', component: HeartRateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
