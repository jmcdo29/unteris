import { createBrowserRouter, RouteObject } from 'react-router-dom';
import {
  EmailVerification,
  PasswordReset,
  UiAuth,
  User,
} from '@unteris/ui/auth';
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
        {
          path: '/verify',
          element: <EmailVerification />,
        },
        {
          path: '/me',
          element: <User />,
        },
        {
          path: '/reset-password',
          element: <PasswordReset />,
        },
      ],
    },
  ];
};

export const router = () => createBrowserRouter(routes());
