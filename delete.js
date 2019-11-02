import { call } from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';
export async function main(event) {

  const params = {
    TableName: process.env.TableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    }
  };

  try {
    await call('delete', params);
    return success({ status: true });
  } catch (err) {
    // Not the best approach to log an error
    console.log(err);
    return failure({ status: false });
  }
}