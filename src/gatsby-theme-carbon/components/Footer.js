/* eslint-disable react/jsx-filename-extension */
/**
 * SPDX-License-Identifier: Apache-2.0
 */
import Footer from '@fr8/gatsby-theme/src/components/Footer';
import React from 'react';

const Content = ({ buildTime }) => (
  <>
    <p>
      Last updated
      {' '}
      {buildTime}
      <br />
      This is Free Software
      {' '}
      {new Date().getFullYear()}
      {' '}
      by The Authors
    </p>
  </>
);

const links = {
  firstCol: [
    {
      href: '#',
      linkText: 'POAP Tokens',
    },
    { href: '#', linkText: 'Privacy' },
    { href: '#', linkText: 'Terms of use' },
    {
      href: 'https://www.github.com/freight-trust/truenft',
      linkText: 'TrueNFT',
    },
  ],
  secondCol: [
    { href: '#', linkText: 'GDPR' },
    { href: '#', linkText: 'CCPA' },
  ],
};

const CustomFooter = () => <Footer links={links} Content={Content} />;

export default CustomFooter;
