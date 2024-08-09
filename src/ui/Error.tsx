//import React from 'react';

import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from 'react-router-dom';

function Error() {
  const navigate = useNavigate();
  const error = useRouteError() as Error;
  //console.log(error);

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Oops! {error.status}</h1>
        <p>{error.statusText}</p>
        {error.data?.message && (
          <p>
            <i>{error.data.message}</i>
          </p>
        )}
        <button onClick={() => navigate(-1)}>&larr; Go Back</button>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Oops! Unexpected Error</h1>
        <p>Something went wrong.</p>
        <p>
          <i>{error.message}</i>
        </p>
        <button onClick={() => navigate(-1)}>&larr; Go Back</button>
      </div>
    );
  } else {
    return (
      <div>
        <p>
          <i>{error.message}</i>
        </p>
        <button onClick={() => navigate(-1)}>&larr; Go Back</button>
      </div>
    );
  }
}

export default Error;
