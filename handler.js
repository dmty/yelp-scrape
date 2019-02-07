'use strict';

const { getPage, parsePage, saveRatingsToDB } = require('./utils');

module.exports.scrape = async (event, context) => {
	try {
    // 1. fetch yelp page
    const page = await getPage(event);
    // 2. parse the page
    const yelpData = parsePage(page);
    // 3. save ratings to our db   
    const data = await saveRatingsToDB(yelpData, event);
    console.log(data);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Scraped ${event}`
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    }
  }

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
