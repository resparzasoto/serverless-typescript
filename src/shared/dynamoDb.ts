import { DynamoDBClient, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const dbClientConfig: DynamoDBClientConfig = {
  region: process.env["AWS_REGION"],
};

const dbClient = new DynamoDBClient(dbClientConfig);
const docClient = DynamoDBDocumentClient.from(dbClient);

export { dbClient, docClient };
