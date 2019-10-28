import { call } from "./libs/dynamodb-lib";
import { failure, success } from './libs/response-lib';

export async function main(event) {
    const params = {
        TableName: process.env.tableName,
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
            ":userId" : event.requestContext.identity.cognitoIdentityId
        }
    };

    try {
        const result = await call("query", params);
        // Return the matching list of items in response body
        return success(result.Items);
    } catch (e) {
        return failure({ status: false });
    }

}