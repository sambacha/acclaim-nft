/**
 * SPDX-License-Identifier: Apache-2.0
 */
module.exports = {
  siteMetadata: {
    title: "Acclaim Ethereum Badges",
    description: "A site to apply for 'Ethereum' badges.",
    keywords:
      "ethereum,nft,governance,rewards,system,badges,tokens,erc721,tutorial,acclaim",
    lang: "en",
  },
  pathPrefix: ``,
  plugins: [
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Ethereum Badges",
        short_name: "Ethereum Badges",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#0062ff",
        display: "browser",
      },
    },
    {
      resolve: "gatsby-theme-carbon",
      options: {
        isSearchEnabled: false,
        repository: {
          baseUrl: "https://github.com/sambacha/acclaim-nft",
          branch: "master",
        },
      },
    },
  ],
};
