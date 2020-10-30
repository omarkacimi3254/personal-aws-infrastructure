#!/usr/bin/env node
import {Construct, Duration, Stack} from '@aws-cdk/core';
import {StackProps} from "@aws-cdk/core/lib/stack";
import {Util} from "../../Util";
import {ComparisonOperator, Metric} from "@aws-cdk/aws-cloudwatch";
import {Topic} from "@aws-cdk/aws-sns";

export interface AwsInfrastructureProps extends StackProps {
    account: string | undefined,
    region: string | undefined
}

/**
 * Static site infrastructure, which deploys site content to an S3 bucket.
 *
 * The site redirects from HTTP to HTTPS, using a CloudFront distribution,
 * Route53 alias record, and ACM certificate.
 */
const amount = 5;

export class AwsInfrastructure extends Stack {
    constructor(parent: Construct, name: string, props: AwsInfrastructureProps) {
        super(parent, name, {...props, tags: Util.getApplicationTags()});
        new Metric({
            metricName: "EstimatedCharges",
            namespace: "AWS/Billing",
            period: Duration.hours(6),
            statistic: "Maximum",
            dimensions: {
                Currency: "USD",
            },
        }).createAlarm(this, `BillingAlarm${amount}Dollars`, {
            alarmName: `Billing Alert - Estimated Bill Exceeds ${amount}`,
            alarmDescription: `Account Billing Alert for ${amount}`,
            threshold: amount,
            evaluationPeriods: 1,
            comparisonOperator: ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
        });

        new Topic(this, `BillingAlert${amount}DollarsTopic`, {
            topicName: `Billing-Alert-${amount}Dollars`,
        });
    }
}
