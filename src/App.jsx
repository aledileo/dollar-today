import React, { useEffect, useState } from 'react';
import useFetch from "./useFetch";

const App = () => {

  const options = {
    method: 'GET',
    // mode: 'no-cors',
    // withCredentials: true,
    // credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`,
      // 'Access-Control-Allow-Origin': '*',
    },
    // referrer: 'no-referrer'
  };

  const url = 'http://localhost:3001/?start=2019-08-01&end=2019-08-16'

  const { response, error, isLoading } = useFetch(url, options);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error {JSON.stringify(error, null, 2)}</div>;

  return (
    <div>{response && response.avgPrice}</div>
  );
}

export default App;
