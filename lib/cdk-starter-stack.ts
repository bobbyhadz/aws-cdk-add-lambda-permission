import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import {NodejsFunction} from 'aws-cdk-lib/aws-lambda-nodejs';
import * as cdk from 'aws-cdk-lib';
import * as path from 'path';

export class CdkStarterStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 👇 define the Lambda
    const myFunction = new NodejsFunction(this, 'my-function', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'main',
      entry: path.join(__dirname, `/../src/my-lambda/index.ts`),
    });

    // 👇 create a policy statement
    const s3ListBucketsPolicy = new iam.PolicyStatement({
      actions: ['s3:ListAllMyBuckets'],
      resources: ['arn:aws:s3:::*'],
    });

    // 👇 add the policy to the Function's role
    myFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'list-buckets-policy', {
        statements: [s3ListBucketsPolicy],
      }),
    );
  }
}
