import {
  Race,
  RaceWithAbilities,
  UserAccount,
  Deity,
  Location,
  PasswordResetRequest,
  PasswordReset,
  LoginBody,
  SignupUser,
} from '@unteris/shared/types';
import { z, ZodTypeAny } from 'zod';

export type method = 'get' | 'post' | 'patch' | 'put' | 'delete';

type PathToTypeMap = Record<
  string,
  [z.infer<ZodTypeAny>, z.infer<ZodTypeAny>?]
>;

export type SdkGeneric = Record<method, PathToTypeMap>;

export type RouteToType = {
  get: {
    'auth/me': [UserAccount];
    [key: `auth/verify-email?verificationToken=${string}`]: [
      { success: boolean }
    ];
    race: [Array<Pick<Race, 'id' | 'name'>>];
    [key: `race/${string}`]: [RaceWithAbilities];
    csrf: [{ csrfToken: string }];
    'session/refresh': [{ success: boolean }];
    [key: `deities/category/${string}`]: [Array<Pick<Deity, 'id' | 'name'>>];
    [key: `deities/location/${string}`]: [Array<Pick<Deity, 'id' | 'name'>>];
    [key: `deities/id/${string}`]: [Deity];
    locations: [Array<Pick<Location, 'id' | 'name'>>];
  };
  post: {
    'csrf/verify': [{ success: boolean }];
    'auth/signup': [{ success: boolean; id: UserAccount['id'] }, SignupUser];
    'auth/login': [
      {
        success: boolean;
        id: UserAccount['id'];
        displayName: UserAccount['name'];
      },
      LoginBody
    ];
    'auth/logout': [{ success: boolean }];
    'auth/password-reset-request': [{ success: boolean }, PasswordResetRequest];
    'auth/password-reset': [{ success: boolean }, PasswordReset];
  };
  patch: PathToTypeMap;
  put: PathToTypeMap;
  delete: PathToTypeMap;
};