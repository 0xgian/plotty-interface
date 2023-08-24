# Plotty Interface
## Getting Started
First, run the development server:
```bash
yarn  dev
```

## Fixed/Custom Package by patch-package
1) Fix a bug in one of your dependencies
`nano node_modules/react-redux/dist/some-package.js`
2) Run patch-package to create a .patch file
`yarn patch-package some-package`
3) Apply your fix via npm package manager
`yarn install`

*Should focus editing on files in `/esm`, `.es.js` or see files in Sources browser-client for successful results.*