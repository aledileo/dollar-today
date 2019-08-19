import React from 'react';
import useFetch from "./useFetch";

const DollarTodayPrice = ({ location }) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const url = 'http://localhost:3001/'

  const { response, error, isLoading } = useFetch(url, options);
  
  if (!response || isLoading) return <div>Loading...</div>;
  
  if (error) return <div>Error {JSON.stringify(error, null, 2)}</div>;

  console.log(location);
  
  return (
    <section className="hero is-fullheight">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title is-size-1 has-text-black-bis">
            $ {response.v}
          </h1>
          <h2 className="subtitle has-text-black-ter">
            USD - ARS
          </h2>
        </div>
      </div>
    <div class="hero-foot has-text-centered">
      <span>Rate reflects the latest closing price ({response.d})</span>   
    </div>
    </section>
  );
}

export default DollarTodayPrice;