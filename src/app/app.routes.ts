import { Routes } from '@angular/router';

import { canActivateGuard } from './guards/auth/can-activate.guard';
import { ListItemsComponent } from './components/list-items/list-items.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AddItemsComponent } from './components/add-items/add-items.component';

export const routes: Routes = [
    {
        path: 'listItems',
        component: ListItemsComponent,
        canActivate: [canActivateGuard],
        
    },
    
    // {
    //     path: 'addItems',
    //     component: AddItemsComponent,
    //     canActivate: [canActivateGuard],
        
    // },
    {
        path: '',
        component: HomeComponent,

    },
    {
        path: '**',
        component: NotFoundComponent,
    }

];
