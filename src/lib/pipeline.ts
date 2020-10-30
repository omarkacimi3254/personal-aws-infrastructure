#!/usr/bin/env node
import {App, Stack, StackProps} from "@aws-cdk/core/lib";
import {AwsInfrastructureStage} from "./aws-infrastructure-stage";
import {Util} from "./Util";
import {CdkGithubPipeline} from "aws-cdk-github-pipeline";

export class AwsInfrastructurePipeline extends CdkGithubPipeline {
    constructor(app: App, pipelineStack: Stack, id: string, props?: StackProps) {
        super(app, pipelineStack, id, {
            ...props,
            installCommands: [],
            buildCommands: ['npm install'],
            projectName: Util.getProjectName(),
            githubProjectOwner: Util.getGithubProjectOwner(),
            stages: [{
                account: Util.getLiveStage().account,
                region: Util.getLiveStage().region
            }]
        })
    }

    protected createStage(stageEnvironment: {
        pipelineStack: Stack,
        account: string,
        region: string
    }) {
        return new AwsInfrastructureStage(stageEnvironment.pipelineStack, 'live-stage', stageEnvironment)
    }
}
