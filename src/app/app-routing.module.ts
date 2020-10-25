import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { PresentationComponent } from './presentation/presentation.component';



const routes: Routes = [
  { path:'presentation', component: PresentationComponent},
  { path:''   , component: FrontpageComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
