/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
/**
 * SPDX-License-Identifier: Apache-2.0
 */
import DefaultTemplate from 'gatsby-theme-carbon-base/src/templates/Default';
import React from 'react';

const HomeTitle = () => <span>NFT Badges</span>;

const customProps = {
  Title: HomeTitle,
};

function ShadowedHomepage(props) {
  return <DefaultTemplate {...props} {...customProps} />;
}

export default ShadowedHomepage;
