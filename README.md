# testing project skeleton

- [ ] typescript setup
- [ ] e2e tests
- [ ] commit hooks
  - [ ] prettier formatting
  - [ ] eslint

## Notes

### Locking npm and node versions

To use just a specific version of node and npm

1. Add `engines` section in package.json.
```
"engines": {
  "node": ">=18.0.0",
  "npm": ">=8.0.0",
  "yarn": "please-use-npm",
  "pnpm": "please-use-npm"
},
```
This also asks devs to use npm instead of yarn or pnpm

2. Create a `.npmrc` file with the following content
```
engine-strict=true
```

3. `.nvmrc` has the version of node suitable for the project.
Just run `nvm use` from the project folder to activate it.

### Good commit messages

```
$ npm install --save-dev @commitlint/{cli,config-conventional}
$ # setup commitlint.config.js file
$ npm install husky --save-dev
$ npx husky install
$ npx husky add .husky/commit-msg  'npx --no -- commitlint --edit ${1}'
```

A good commit message will follow this structure

```
type(scope?): subject  #scope is optional; multiple scopes are supported (current delimiter options: "/", "\" and ",")
```

for example,
```
fix(server): send cors headers
```

Read more at <https://github.com/conventional-changelog/commitlint>

### Setting up a typescript express project

```
$ npm i express
$ npm i -D ts-node-dev typescript @types/node @types/express
$ npx tsc --init
```

The last `tsc` command generates the `tsconfig.json` file needed to
compile js from ts files.
