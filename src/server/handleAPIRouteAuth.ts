import { getErrorMessage } from '@/lib/handle-error';
import { Session } from 'next-auth';
import { NextResponse } from 'next/server';
import { auth } from './auth';

const handleRouteWithAuth = (
  fn: (req: Request, session: Session) => Promise<Response>,
) => {
  return async (req: Request) => {
    try {
      // Authenticate the user
      const session = await auth();
      if (
        !session ||
        !session.user ||
        !session.user.id ||
        !session.user.email
      ) {
        return NextResponse.json(
          {
            success: false,
            message: 'User not authenticated',
            error: 'User not authenticated',
          },
          { status: 401 },
        );
      }

      // Pass the authenticated session to the route handler
      return await fn(req, session);
    } catch (error: unknown) {
      if (process.env.NODE_ENV === 'development')
        console.error('Error in route handler:', error);

      // Handle other unexpected errors
      const errorMessage = getErrorMessage(error);
      return NextResponse.json(
        {
          success: false,
          message: 'An error occurred. Please try again later.',
          error:
            process.env.NODE_ENV === 'development'
              ? errorMessage
              : 'An error occurred. Please try again later.',
        },
        { status: 500 },
      );
    }
  };
};

export default handleRouteWithAuth;
