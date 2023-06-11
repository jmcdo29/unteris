import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { DeityNav } from '@unteris/ui/deities';
import { History } from '@unteris/ui/history';
import { UiRace } from '@unteris/ui/race';
import { Root } from './root';

import { Welcome } from './welcome/welcome';

const routes = (setTheme: (theme: 'dark' | 'light') => void): RouteObject[] => {
  return [
    {
      path: '/',
      element: <Root setTheme={setTheme} />,
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
      ],
    },
  ];
};

export const router = (setTheme: (theme: 'dark' | 'light') => void) =>
  createBrowserRouter(routes(setTheme));
