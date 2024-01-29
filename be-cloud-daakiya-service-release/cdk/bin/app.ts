#!/usr/bin/env node
require("dotenv").config();
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import {DefaultStackSynthesizer} from "aws-cdk-lib";
import {StaticStack} from "../lib/static/stack";
import {DynamicStack} from "../lib/dynamic/stack";

const getAccountID = (): string => {
  switch (process.env.envName) {
    case "dev":
      return "629776801916";
    case "qa":
      return "629776801916";
    case "staging":
      return "091875810272";
    case "release":
      return "977011067610";
  }
  return "";
};

const envLive = { account: getAccountID(), region: "ap-southeast-1" };
const crossAccountArn = `arn:aws:iam::${getAccountID()}:role/CrossAccountSignin-Tools`;

const app = new cdk.App();

export const APP_NAME = "Daakiya";

const staticStack = new StaticStack(
  app,
  `${APP_NAME}StaticStack-${process.env.envName}`,
  {
    envName: process.env.envName ?? "dev",
    env: envLive,
    synthesizer: new DefaultStackSynthesizer({
      deployRoleArn: crossAccountArn,
    }),
  }
);

new DynamicStack(app, `${APP_NAME}DynamicStack-${process.env.envName}`, {
  envName: process.env.envName ?? "dev",
  env: envLive,
  synthesizer: new DefaultStackSynthesizer({
    deployRoleArn: crossAccountArn,
  }),
  resources: {
    appECR: staticStack.appECR,
    goAppECR: staticStack.goAppECR,
    tables: staticStack.tables,
    rds: staticStack.rds
  },
});
