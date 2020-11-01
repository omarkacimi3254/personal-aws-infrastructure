#!/usr/bin/env node
import {App, Stack, StackProps, Stage} from "@aws-cdk/core/lib";
import {Util} from "./Util";
import {AwsInfrastructure} from "./aws-infrastructure";
import {CdkGithubPipeline} from "aws-cdk-github-pipeline";

export class AwsInfrastructurePipeline extends CdkGithubPipeline {
    constructor(app: App, pipelineStack: Stack, id: string, props?: StackProps) {
        super(app, pipelineStack, id, {
            ...props,
            installCommands: [],
            buildCommands: ['npm install'],
            projectName: Util.getProjectName(),
            githubProjectOwner: Util.getGithubProjectOwner(),
            stages: Util.getStages()
        })
    }

    protected createStacks(stageEnvironment: { stageScope: Stage; account: string; region: string }): Stack[] {
        return [ new AwsInfrastructure(stageEnvironment.stageScope, "infrastructure-stack-", {
            account: stageEnvironment.account,
            region: stageEnvironment.region
        }) ];
    }

}
