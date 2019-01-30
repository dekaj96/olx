import React from 'react';

const Page404 = ({ location }) =>{
    return (
      <main className = "wrapper">
        <section className = "infoPage">
          <h1>
            404
          </h1>
          <h3>
            Sorry, we haven't found any match for <code>{location.pathname}</code>
          </h3>
        </section>
      </main>
    );
  }
  export default Page404;