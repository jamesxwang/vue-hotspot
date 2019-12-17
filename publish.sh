# npm patch
npm version patch

# build demo & docs
npm run demo
npm run build

# publish to npmjs.com
cp -r ./src/components .
npm publish
rm -rf ./components