# boostrapping
CDK_NEW_BOOTSTRAP=1 AWS_PROFILE=personal-live cdk bootstrap --trust ${pipelineAccount}  --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess aws://${targetAccount}/eu-central-1

# deploying
npm install
AWS_PROFILE=${yourProfile} npx cdk deploy
