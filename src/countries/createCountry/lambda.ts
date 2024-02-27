import { PutCommand, PutCommandInput } from "@aws-sdk/lib-dynamodb";
import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  Context,
} from "aws-lambda";
import { randomUUID } from "crypto";
import { docClient } from "../../shared/dynamoDb";

const handler = async (
  event: APIGatewayProxyEventV2,
  _context: Context
): Promise<APIGatewayProxyResultV2> => {
  const country = JSON.parse(event.body || "");
  country.id = randomUUID();

  const params: PutCommandInput = {
    TableName: process.env["COUNTRIES_TABLE_NAME"],
    Item: country,
  };

  await docClient.send(new PutCommand(params));

  const response: APIGatewayProxyResultV2 = {
    statusCode: 201,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `User created with id: ${country.id}`,
    }),
  };

  return response;
};

export { handler };
