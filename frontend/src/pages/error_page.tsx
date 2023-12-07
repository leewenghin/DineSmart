// NotFoundPage.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const NotFoundPage = () => {
    const location = useLocation();
    const { value } = location.state || {};

    console.log("123");
    console.log(location);
    return (
      <div>
        <h1>404 - Not Found</h1>
        <p>
          The requested URL <code>{location.pathname}</code> was not found.
        </p>
        {value && <p>Additional data: {value}</p>}
      </div>
    );
  };
export default NotFoundPage;
