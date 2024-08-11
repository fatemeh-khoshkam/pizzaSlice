//import React from 'react';

import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import LinkButton from '../ui/LinkButton';

function Error() {
  const error = useRouteError() as Error;
  //console.log(error);

  const errorClass = 'flex items-center justify-center px-2 my-10';

  if (isRouteErrorResponse(error)) {
    return (
      <div className={errorClass}>
        <div className="text-center">
          <h1 className="text-9xl font-bold">Oops! {error.status}</h1>
          <p className="mt-4 text-2xl font-medium">{error.statusText}</p>
          {error.data?.message && (
            <p>
              <i>{error.data.message}</i>
            </p>
          )}
          <LinkButton to="-1">&larr; Go Back</LinkButton>
        </div>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div className={errorClass}>
        <div className="text-center">
          <h1 className="text-9xl font-bold">Oops! Unexpected Error</h1>
          <p className="mt-4 text-2xl font-medium">Something went wrong.</p>
          <p>
            <i>{error.message}</i>
          </p>
          <LinkButton to="-1">&larr; Go Back</LinkButton>
        </div>
      </div>
    );
  } else {
    return (
      <div className={errorClass}>
        <div className="text-center">
          <p className="mt-4 text-2xl font-medium">
            <i>{error.message}</i>
          </p>
          <LinkButton to="-1">&larr; Go Back</LinkButton>
        </div>
      </div>
    );
  }
}

export default Error;
