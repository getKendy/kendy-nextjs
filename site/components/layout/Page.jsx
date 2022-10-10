import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import Header from './Header';

function Page({ children }) {
  return (
    <div>
      <Head>
        <title>GetKendy - Home</title>
      </Head>
      <Header />
      {children}
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.element.isRequired
}

export default Page;
