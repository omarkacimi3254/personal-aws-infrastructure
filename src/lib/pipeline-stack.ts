#!/usr/bin/env node
import {App, Stack, StackProps} from "@aws-cdk/core/lib";
import {AwsInfrastructurePipeline} from "./pipeline";

export class AwsInfrastructureStack extends Stack {
    constructor(scope: App, id: string, props?: StackProps) {
        super(scope, id, props)
        new AwsInfrastructurePipeline(scope, this, id + "-pipeline", props)
    }
}
