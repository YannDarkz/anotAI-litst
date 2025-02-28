import { Routes } from '@angular/router';

import { canActivateGuard } from './guards/auth/can-activate.guard';
import { ListItemsComponent } from './components/list-items/list-items.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BuyItemComponent } from './components/buy-item/buy-item.component';

export const routes: Routes = [
    {
        path: 'listItems',
        component: ListItemsComponent,
        canActivate: [canActivateGuard],
        
    },
    {
        path: 'login',
        component: HomeComponent,

    },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
        path: '**',
        component: NotFoundComponent,
    }

];
