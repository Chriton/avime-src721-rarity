This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

npm install
npm run dev
 Open [http://localhost:3000](http://localhost:3000) with your browser to see the app

## Using the app

- Paste the asset id of the Avime SRC-721 that you want the traits of (comma separated). Example: A11009555737458156000,A11149477965487233000,A14360992668463825000,A8532798063812652000
- Click "Get Avime traits". This will retrieve the traits of the Avime and display them in the textarea below.
- The "Traits Occurrences counter" textarea will be populated with the number of occurrences of each trait.
- Use the json in the "Traits Occurrences counter" textarea to calculate the rarity of each trait.

For reference see how the avime object has the traits structured in /utils/sr721.js