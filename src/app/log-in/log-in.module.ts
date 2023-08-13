import { NgModule } from "@angular/core";
import { LogInComponent } from "./log-in.component";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { sharedModule } from "../shared/modules/shared.module";
const logInRoute : Routes = [
    { path : '', component : LogInComponent }
]
@NgModule({
    declarations : [
        LogInComponent
    ],
    imports : [
        CommonModule,
        RouterModule.forChild(logInRoute),
        sharedModule
    ]
}) 
export class LogInModule{}