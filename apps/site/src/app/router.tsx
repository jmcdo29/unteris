import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { UiAuth } from '@unteris/ui/auth';
import { DeityNav } from '@unteris/ui/deities';
import { History } from '@unteris/ui/history';
import { UiRace } from '@unteris/ui/race';
import { Root } from './root';

import { Welcome } from './welcome/welcome';

const routes = (): RouteObject[] => {
  return [
    {
      path: '/',
      element: <Root />,
      children: [
        { index: true, element: <Welcome /> },

        {
          path: '/history',
          element: <History />,
        },
        {
          path: '/deities',
          element: <DeityNav />,
        },
        {
          path: '/races',
          element: <UiRace />,
        },
        {
          path: '/login',
          element: <UiAuth />,
        },
      ],
    },
  ];
};

export const router = () => createBrowserRouter(routes());
