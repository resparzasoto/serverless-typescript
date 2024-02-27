import { ScanCommand, ScanCommandInput } from "@aws-sdk/client-dynamodb";
import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  Context,
} from "aws-lambda";
import { docClient } from "../../shared/dynamoDb";

const handler = async (
  _event: APIGatewayProxyEventV2,
  _context: Context
): Promise<APIGatewayProxyResultV2> => {
  const params: ScanCommandInput = {
    TableName: process.env["COUNTRIES_TABLE_NAME"],
  };

  const result = await docClient.send(new ScanCommand(params));

  const response: APIGatewayProxyResultV2 = {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: result.Items,
    }),
  };

  return response;
};

export { handler };
