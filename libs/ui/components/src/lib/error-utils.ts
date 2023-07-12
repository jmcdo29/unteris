import { DisplayError } from './error-disaply';

interface ZodError {
  path: string;
  message: string;
}

interface ValidationError {
  type: 'Validation';
  message: ZodError[];
}

interface AuthenticationError {
  type: 'Authentication';
  message: string[];
}

type ErrorFromServer = ValidationError | AuthenticationError;

const isObject = (val: unknown): val is Record<string, any> => {
  return typeof val === 'object' && val !== null;
};

const isServerError = (obj: Record<string, any>): obj is ErrorFromServer => {
  return 'type' in obj && 'message' in obj;
};

export const convertUnknownErrorToDisplayError = (
  err: unknown,
  title = 'Error'
): DisplayError => {
  if (
    typeof err === 'object' &&
    err !== null &&
    'message' in err &&
    typeof err.message === 'string'
  ) {
    try {
      err = JSON.parse(err.message);
    } catch {
      /* no op */
    }
  }
  if (err === null) {
    return {
      title: 'Internal Error',
      messages: ['An unknown error has occurred'],
    };
  }
  if (isObject(err)) {
    if ('body' in err && isObject(err.body) && isServerError(err.body)) {
      switch (err.body.type) {
        case 'Validation':
          return convertValidationErrorToDisaplyError(err.body, title);
        case 'Authentication':
          return { title: 'Authentication Error', messages: err.body.message };
        default:
          return {
            title: 'Unknown Server Error',
            messages: ['If this persists, contact the server admin'],
          };
      }
    }
  }
  return {
    title: 'Unknown Error',
    messages: [
      'How did you even do this? Contact the server admin and share your exact steps',
    ],
  };
};

export const convertValidationErrorToDisaplyError = (
  err: ValidationError,
  title = 'Validation Error'
): DisplayError => {
  return {
    title,
    messages: err.message.map((m) => m.message),
  };
};
