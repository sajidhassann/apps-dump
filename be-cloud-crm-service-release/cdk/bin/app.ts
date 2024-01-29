#!/usr/bin/env node
require("dotenv").config();
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import {DefaultStackSynthesizer} from "aws-cdk-lib";
import {StaticStack} from "../lib/static/stack";
import {CrmDynamicStack} from "../lib/dynamic/stack";

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

const envLive = {account: getAccountID(), region: "ap-southeast-1"};
const crossAccountArn = `arn:aws:iam::${getAccountID()}:role/CrossAccountSignin-Tools`;

const app = new cdk.App();

const staticStack = new StaticStack(
    app,
    `CrmCdkStaticStack-${process.env.envName ?? 'dev'}`,
    {
        envName: process.env.envName ?? "dev",
        env: envLive,
        synthesizer: new DefaultStackSynthesizer({
            deployRoleArn: crossAccountArn,
        }),
    }
);
new CrmDynamicStack(
    app,
    `CrmCdkDynamicStack-${process.env.envName ?? 'dev'}`,
    {
        envName: process.env.envName ?? "dev",
        env: envLive,
        synthesizer: new DefaultStackSynthesizer({
            deployRoleArn: crossAccountArn,
        }),
        resources: {
            crmECR: staticStack.appECR,
            mixpanelECR: staticStack.mixpanelECR,
            table: staticStack.table,
            rds: staticStack.rds,
        },
    }
);
