import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { sharedModule } from "../shared/modules/shared.module";
import { DepartmentListComponent } from './department-list/department-list.component';

const dashboardRoute : Routes = [
    { path : '', component : DashboardComponent },
    { path : 'departmentList', component : DepartmentListComponent }
]
@NgModule({
    declarations : [
        DashboardComponent,
        DepartmentListComponent
    ],
    imports : [
        CommonModule,
        RouterModule.forChild(dashboardRoute),
        sharedModule
    ]
})

export class DashboardModule{}