#!/usr/bin/env node
import {Util} from "../Util";
import {App} from "@aws-cdk/core";
import {AwsInfrastructureStack} from "./lib/pipeline-stack";

/**
 * The static website stack relies on getting the domain name from CDK context.
 * Use 'cdk synth -c domain=mystaticsite.com -c subdomain=www'
 * Or add the following to cdk.json:
 * {
 *   "context": {
 *     "domain": "mystaticsite.com",
 *     "subdomain": "www"
 *   }
 * }
 **/
const env = {
    account: process.env.CDK_DEPLOY_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEPLOY_REGION || process.env.CDK_DEFAULT_REGION
};
const app = new App();


new AwsInfrastructureStack(app, Util.getProjectName() + '-pipeline-stack', {
    env: env,
    tags: Util.getPipelineTags()
});

