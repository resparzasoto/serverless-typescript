# serverless-typescript
Serverless Typescript

# Bootstraping CDK with custom template
1. aws cloudformation deploy --template-file bootstrap-iam-roles.yaml --stack-name bootstrap-iam-roles --capabilities CAPABILITY_NAMED_IAM
2. aws cloudformation deploy --template-file bootstrap-iam-policies.yaml --stack-name bootstrap-iam-policies --capabilities CAPABILITY_NAMED_IAM

# Migration to CDK
1. sls deploy
2. cdk bootstrap aws://<AWS_ACCOUNT_ID>/<AWS_REGION> --template bootstrap-template.yaml --trust <AWS_ACCOUNT_ID> --termination-protection
   1. custom cloudformation execution policies deploy (optional): --cloudformation-execution-policies arn:<AWS_PARTITION>:iam::<AWS_ACCOUNT_ID>:policy/CustomCloudFormationExecutionPolicy
      1. uncomment AWS Managed [ReadOnlyAccess](https://github.com/resparzasoto/serverless-typescript/blob/master/bootstrap-iam-roles.yaml#L250) policy
      2. uncomment AWS Custom Managed [CustomCloudFormationExecutionPolicy](https://github.com/resparzasoto/serverless-typescript/blob/master/bootstrap-iam-roles.yaml#L251) policy
3. cdk migrate --stack-name serverless-typescript-dev --language typescript --from-stack
4. cdk deploy
5. empty serverless bucket
6. cdk destroy