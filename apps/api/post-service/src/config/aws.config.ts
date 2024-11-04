import { registerAs } from '@nestjs/config';

export default registerAs('aws', () => ({
  region: process.env.AWS_REGION || 'us-east-1',
  vpcId: process.env.VPC_ID,
  rds: {
    host: process.env.RDS_HOST,
    port: parseInt(process.env.RDS_PORT, 10) || 5432,
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DATABASE,
  },
}));
