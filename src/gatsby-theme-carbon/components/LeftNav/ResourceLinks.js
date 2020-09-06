/* eslint-disable react/jsx-filename-extension */
/**
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import ResourceLinks from 'gatsby-theme-carbon-base/src/components/LeftNav/ResourceLinks';
import AuthForm from '../../../components/AuthForm';

const links = [
  {
    title: 'GitHub',
    href: 'https://github.com/sambacha/nft-badges',
  },
  {
    title: 'Optinos',
    href: 'https://www.optino.xyz',
  },
];

const CustomResources = () => (
  <>
    <AuthForm />
    <ResourceLinks shouldOpenNewTabs links={links} />
  </>
);

export default CustomResources;
