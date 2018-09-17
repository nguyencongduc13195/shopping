import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './../shared/services/admin.guard';

// routes
const adminRoutes: Routes = [
	{
		path: 'admin', component: AdminComponent, children: [
			{ path: '', component: AdminComponent, canActivate: [AdminGuard] }
		]
	}
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes)
  ],
  declarations: [AdminComponent],
  providers: [AdminGuard]
})
export class AdminModule { }
