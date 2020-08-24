/**
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import WrapRootElement from 'gatsby-theme-carbon/src/util/wrap-root-element';
import { ProvideAuth } from '../../util/hooks/use-auth';

function ShadowedWrap(props) {
  return (
    <ProvideAuth>
      <WrapRootElement {...props} />
    </ProvideAuth>
  );
}

export default ShadowedWrap;
