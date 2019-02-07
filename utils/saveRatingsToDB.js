const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (yelpData, businessName) => {
  return new Promise((resolve, reject) => {
    const date = JSON.stringify(new Date());
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Item: {
        id: uuid.v1(),
        businessName,
        scrapedAt: date,
        ...yelpData,
      }
    };
    
    dynamoDb.put(params, (error, data) => {
      if (error) {
        console.log(`Error saving data to DynamoDB: ${JSON.stringify(error)}`);
        reject(`Error saving data to DynamoDB: ${JSON.stringify(error)}`);
      } else {
        console.log('data:=> ', data);
        resolve(params.Item);
      }
    });
  })
};