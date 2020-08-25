/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/no-array-index-key */
/**
 * SPDX-License-Identifier: Apache-2.0
 */
import { ArticleCard, Column, Row } from '@fr8/gatsby-theme';
import { H2, P } from '@fr8/gatsby-theme/src/components/markdown';
import React, { useEffect, useState } from 'react';

import { SkeletonText } from 'carbon-components-react';
import style from './MyBadges.module.scss';
import { useAuth } from '../../util/hooks/use-auth.js';

const MyBadges = () => {
  const [badges, setBadges] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;

    fetch(`/api/github/badges?access_token=${token}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((emails) => {
        const flatBadges = emails.reduce((arr, email) => {
          arr.push(email.data);
          return arr;
        }, []);
        setBadges(flatBadges.flat());
      });
  }, [token]);

  if (!token) return null;

  return (
    <>
      <Row>
        <Column>
          <H2>My badges</H2>
        </Column>
      </Row>
      {!badges && (
        <Row>
          <Column>
            <SkeletonText width="445px" />
          </Column>
        </Row>
        // TODO: Add Ethereum Wallet Address tie-in
      )}
      {badges && badges.length === 0 && (
        <P>No badges found with your verified email addresses in GitHub.</P>
      )}
      {badges && badges.length > 0 && (
        <Row>
          {badges.map((badge, i) => (
            <Column key={i} colMd={3} colLg={3} noGutterMdLeft>
              <ArticleCard
                subTitle={
                  badge.state.charAt(0).toUpperCase() + badge.state.slice(1)
                }
                // @dev: expand badge info here
                author={badge.recipient_email}
                date={new Date(badge.issued_at_date).toLocaleDateString()}
                href={badge.badge_url}
                className={style.article}
              >
                <img src={badge.image_url} alt="" />
              </ArticleCard>
            </Column>
          ))}
        </Row>
      )}
    </>
  );
};

export default MyBadges;
