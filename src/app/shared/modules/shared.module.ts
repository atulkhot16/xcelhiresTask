import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http"
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthInterceptor } from "../services/auth.interceptor";
import {MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
    declarations : [],
    imports : [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule
    ],
    exports : [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule
    ],
    providers : [
        {
            provide : HTTP_INTERCEPTORS,
            useClass : AuthInterceptor,
            multi : true
          }
    ]
})

export class sharedModule{}