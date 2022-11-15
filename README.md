# Testing project skeleton

A list of things to do for a sample express project.

- [X] typescript setup
- [x] e2e tests
- [X] commit hooks
  - [X] commit message formatting
  - [X] prettier formatting
  - [X] eslint

## The project

This is a simple CRUD typescript rest api. The postman collection is in
the `contrib` folder.

First steps.

```
$ nvm use
$ npm i
$ npm run prepare
```
## Notes on how the project is setup

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

Default list includes

```
[
  'build',
  'chore',
  'ci',
  'docs',
  'feat',
  'fix',
  'perf',
  'refactor',
  'revert',
  'style',
  'test'
];
```

### Setting up a typescript express project

```
$ npm i express
$ npm i -D ts-node-dev typescript @types/node @types/express
$ npx tsc --init
```

The last `tsc` command generates the `tsconfig.json` file needed by
the typescript compiler to compile js from ts files.

Eslint and prettier are for linting and formatting our code respectively

```
$ npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
$ npm install --save-dev prettier
$ npm install --save-dev eslint-config-prettier eslint-plugin-prettier
```

Have the eslint and prettier plugins installed in vscode.

Create `.eslintignore`, `.eslintrc` and `.prettierrc` files. These configure
how eslint and prettier behave.

- Add `prettier-format` script to `package.json`
- Add `lint` script to `package.json`

```
$ npx husky add .husky/pre-commit "npm run prettier-format && npm run lint"
```

We have a problem with this approach. All files will get a lint check and
formatted, regardless of whether they are new staged files. We dont want that.
Hence [lint-staged](https://github.com/okonet/lint-staged)

```
$ npm i lint-staged
```

Create a `.lintstagedrc` file with the commands we need to run for
the git staged files. See [examples](https://github.com/okonet/lint-staged#examples).

Update our old husky `pre-commit` hook to say

```
npx lint-staged
```

### Catering multiple dev operating systems

```
$ npm i -D run-script-os
```

Commands like `rm`, `ls` are specific to linux and mac(darwin). This package
gives the same interface for these actions via one command in `package.json`.

Check the `prettier-format` script for an example.

### End to end testing

```
$ npm i -D supertest jest ts-jest @types/jest @types/supertest
```

Update `tsconfig.json` to skip compiling test files

```
$ npx ts-jest config:init
```

Update `package.json` to include `test` script.

### Prisma

This will be our ORM. We can connect to SQL and NoSQL type dbs with prisma.
Read more at https://www.prisma.io/docs/getting-started/quickstart

```
$ npm i -D prisma
$ npx prisma init --datasource-provider postgresql
```

The second command will generate a schema.prisma file.
Install the vscode extension for prisma and add this in your vscode settings

```
"[prisma]": {
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "Prisma.prisma"
},
```

After creating our first model

```
$ npx prisma migrate dev --name init
```

For testing, we need to mock prisma. The following repo is
used as a reference for our implementation.

- <https://github.com/ctrlplusb/prisma-pg-jest/>

Create a CI test database with

```
CREATE USER citest_postgres WITH PASSWORD 'citest_postgres';
CREATE DATABASE ts_project_citest;
GRANT ALL PRIVILEGES ON DATABASE "ts_project_citest" to citest_postgres;
```

## References

- <https://khalilstemmler.com/blogs/typescript/eslint-for-typescript/>
- <https://github.com/stemmlerjs/simple-typescript-starter>
- <https://www.freecodecamp.org/news/how-to-use-commitlint-to-write-good-commit-messages/>
- <https://github.com/kriscfoster/typescript-postgres-typeorm> & <https://www.youtube.com/watch?v=Ml51d87uoPo>
- <https://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/>
- <https://dev.to/nathan_sheryak/how-to-test-a-typescript-express-api-with-jest-for-dummies-like-me-4epd>
- <https://github.com/ctrlplusb/prisma-pg-jest>
- <https://github.com/TomDoesTech/Testing-Express-REST-API/blob/main/src/__tests__/user.test.ts>
