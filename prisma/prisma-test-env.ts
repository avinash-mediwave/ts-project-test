/* eslint-disable @typescript-eslint/no-var-requires */
// https://github.com/ctrlplusb/prisma-pg-jest
import { Client } from 'pg';

import NodeEnvironment from 'jest-environment-node';
import { nanoid } from 'nanoid';
import util from 'util';
import cp from 'child_process';
const exec = util.promisify(cp.exec);

const prismaBinary = './node_modules/.bin/prisma2';

class PrismaTestEnvironment extends NodeEnvironment {
  constructor(config: any) {
    // @ts-ignore
    super(config);

    // Generate a unique schema identifier for this test context
    // @ts-ignore
    this.schema = `test_${nanoid()}`;

    // Generate the pg connection string for the test schema
    // @ts-ignore
    this.connectionString =
      process.env.CI_TEST_DATABASE_URL ||
      // @ts-ignore
      `postgresql://citest_postgres:citest_postgres@localhost:5432/ts_project_citest?schema=${this.schema}`;
  }

  async setup() {
    // Set the required environment variable to contain the connection string
    // to our database test schema
    // @ts-ignore
    process.env.DATABASE_URL = this.connectionString;
    // @ts-ignore
    this.global.process.env.DATABASE_URL = this.connectionString;

    // Run the migrations to ensure our schema has the required structure
    await exec(`${prismaBinary} db push`);

    return super.setup();
  }

  async teardown() {
    // Drop the schema after the tests have completed
    const client = new Client({
      // @ts-ignore
      connectionString: this.connectionString,
    });
    await client.connect();
    // @ts-ignore
    await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`);
    await client.end();
  }
}

module.exports = PrismaTestEnvironment;
