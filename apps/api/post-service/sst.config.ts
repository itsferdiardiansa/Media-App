import * as ec2 from "aws-cdk-lib/aws-ec2"
import * as rds from "aws-cdk-lib/aws-rds"
import * as secretsmanager from "aws-cdk-lib/aws-secretsmanager"
import * as lambda from "aws-cdk-lib/aws-lambda"
import * as apigateway from "aws-cdk-lib/aws-apigateway"

export default {
  config() {
    return {
      name: "nestjs-media-app",
      region: "us-east-1",
    };
  },
  async stacks(stack) {
    const vpc = new ec2.Vpc(stack, "NestVpc", {
      maxAzs: 2,
    });

    const dbSecret = new secretsmanager.Secret(stack, "DBSecret", {
      generateSecretString: {
        secretStringTemplate: JSON.stringify({ username: "admin" }),
        generateStringKey: "password",
      },
    });

    const rdsInstance = new rds.DatabaseInstance(stack, "NestPostgres", {
      engine: rds.DatabaseInstanceEngine.postgres({ version: rds.PostgresEngineVersion.VER_13_3 }),
      vpc,
      credentials: rds.Credentials.fromSecret(dbSecret),
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE2, ec2.InstanceSize.MICRO),
      multiAz: false,
      allocatedStorage: 20,
      publiclyAccessible: false,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_ISOLATED },
    });

    const databaseUrl = `postgresql://${dbSecret.secretValueFromJson("username")}:${dbSecret.secretValueFromJson("password")}@${rdsInstance.dbInstanceEndpointAddress}:${rdsInstance.dbInstanceEndpointPort}/${rdsInstance.instanceIdentifier}`;

    const nestLambda = new lambda.Function(stack, "NestLambda", {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "main.handler",
      code: lambda.Code.fromAsset("dist"), 
      environment: {
        DATABASE_URL: databaseUrl,
      },
      vpc,
    });

    const api = new apigateway.LambdaRestApi(stack, "NestApiGateway", {
      handler: nestLambda,
      proxy: true,
    });

    stack.addOutputs({
      ApiEndpoint: api.url,
      DatabaseConnection: databaseUrl,
    });
  },
};
