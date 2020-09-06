/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
/**
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import WrapRootElement from 'gatsby-theme-carbon-base/src/util/wrap-root-element';
import { ProvideAuth } from '../../util/hooks/use-auth';

function ShadowedWrap(props) {
  return (
    <ProvideAuth>
      <WrapRootElement {...props} />
    </ProvideAuth>
  );
}

export default ShadowedWrap;
