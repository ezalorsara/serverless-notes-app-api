import { call } from "./libs/dynamodb-lib";
import { failure, success } from './libs/response-lib';

export async function main(event) {
    const params = {
        TableName: process.env.tableName,
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id
        }
    };

    try {
        const result = await call("get", params);
        if (result.Item) {
            // Return the retrieved item
            return success(result.Item);
        }
        else
        {
            return failure({ status: false, error: "Item not found." });
        }
    } catch (e) {
        return failure({ status: false });
    }

}