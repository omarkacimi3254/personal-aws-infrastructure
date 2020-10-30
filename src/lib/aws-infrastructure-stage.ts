#!/usr/bin/env node
import {Construct, Stage} from '@aws-cdk/core';

export interface StaticSiteProps {
    account: string | undefined,
    region: string | undefined
}

export class AwsInfrastructureStage extends Stage {
    constructor(parent: Construct, name: string, props: StaticSiteProps) {
        super(parent, name, {
            env: props
        });
        new AwsInfrastructure(this, name + "-stack", props)
    }
}
