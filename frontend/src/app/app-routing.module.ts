import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const APP_ROUTES = {
  login: {
    route: 'login',
    url: () => APP_ROUTES.login.route
  },
  home: {
    route: 'home',
    url: () => APP_ROUTES.home.route
  },
  clubs: {
    list: {
      route: 'clubs/list',
      url: () => APP_ROUTES.clubs.list.route
    },
  },
  leagues: {
    list: {
      route: 'leagues/list',
      url: () => APP_ROUTES.leagues.list.route
    },
    table: {
      route: 'leagues/:leagueId/table',
      url: (leagueId: string = null) => {
        return leagueId !== null ? `leagues/${leagueId}/table` : 'leagues/table';
      }
    }
  },
  teams: {
    list: {
      route: 'teams/list',
      url: () => APP_ROUTES.teams.list.route
    },
    details: {
      route: 'teams/:teamId',
      url: (id: string) => `teams/${id}`
    },
  },
  referees: {
    list: {
      route: 'referees/list',
      url: () => APP_ROUTES.referees.list.route
    },
    refereeMatches: {
      route: 'referees/:refereeId/matches',
      url: (refereeId: string) => `referees/${refereeId}/matches`
    }
  },
  yourMatches: {
    list: {
      route: 'your-matches',
      url: () => APP_ROUTES.yourMatches.list.route
    },
    matchDetails: {
      route: 'your-matches/:matchId',
      url: (matchId: string) => `your-matches/${matchId}`
    }
  },
  schedule: {
    league: {
      route: 'schedule/league',
      url: (leagueId: string = null) => {
        if (leagueId === null) {
          return APP_ROUTES.schedule.league.route;
        } else {
          return `schedule/league/${leagueId}`;
        }
      }
    },
    match: {
      route: 'schedule/match/:matchId',
      url: (matchId: string) => {
        return `schedule/match/${matchId}`;
      }
    }
  },
  merchandises: {
    list: {
      route: 'merchandises/list',
      url: () => APP_ROUTES.merchandises.list.route
    }
  },
  invoices: {
    list: {
      route: 'invoices/list',
      url: () => APP_ROUTES.invoices.list.route
    },
    add: {
      route: 'invoices/add',
      url: () => APP_ROUTES.invoices.add.route
    }
  },
};

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main/main.module').then(mod => mod.MainModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then(mod => mod.LoginModule)
  },
  {
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
