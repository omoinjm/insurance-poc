//Angular Imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Import Components
import { LoginComponent } from './login/login.component';
import { LoginLayoutComponent } from './login.layout.component';

//Import Modules
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
    {
        path: '',
        component: LoginLayoutComponent,
        children: [
            { path: '', component: LoginComponent }
        ]
    },
];

@NgModule({
    declarations: [
        LoginLayoutComponent,
        LoginComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule

        //TODO: Create standalone components, won't be referenced here but just a reminder.
    ],
    exports: [RouterModule]
})

export class LoginLayoutModule { }
