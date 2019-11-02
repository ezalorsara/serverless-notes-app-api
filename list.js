import { call } from "./libs/dynamodb-lib";
import { failure, success } from './libs/response-lib';

export async function main(event) {
  const params = {
    TableName: process.env.TableName,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": event.requestContext.identity.cognitoIdentityId
    }
  };
  console.log("PARAMS: ", params);
  try {
    const result = await call("query", params);
    console.log("RESULT: ", result);
    // Return the matching list of items in response body
    return success(result.Items);
  } catch (e) {
    console.log("ERROR: ", e);
    return failure({ status: false });
  }

}