# Acclaim Badges

> TrueNFT Based Badges

## Overview

- Badge 1 Tutorial is located here: [github.com/sambacha/badge-1-tutorial/](https://github.com/sambacha/badge-1-tutorial/tree/master)

-

## Development

1. `yarn vercel:login` - First log in to Vercel so you can develop Vercel Serverless Functions locally by replicating the Vercel production environment with your localhost.

1. `yarn vercel` - Select the `Generic` scope and link to `sambacha/acclaim-badges`. This triggers a build, but just a preview deployment so production is unaffected.

1. `yarn vercel:env:pull` to have the Vercel CLI create your development `.env` file.

1. `yarn vercel:dev` - Runs `yarn dev` alongside Vercel functions.

## License

Apache-2.0
