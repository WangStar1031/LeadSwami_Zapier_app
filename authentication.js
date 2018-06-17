const querystring = require('querystring');

const getAccessToken = (z, bundle) => {
  // return {
  //   access_token: bundle.inputData.code;
  // }
  // z.console.log(bundle);
  // const promise = z.request('http://esl-ninja.com/card_game/accessZapier.php', {
  const promise = z.request('http://217.69.3.14:81/api/accessZapier', {
  // const promise = z.request(`${process.env.BASE_URL}/oauth/access-token`, {
    method: 'POST',
    body: {
      code: bundle.inputData.code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: 'authorization_code'
    },
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  });
  // Needs to return at minimum, `access_token`, and if your app also does refresh, then `refresh_token` too
  return promise.then((response) => {
    // z.console.log(response.content);
    if (response.status !== 200) {
      throw new Error('Unable to fetch access token: ' + response.content);
    }
    // const result = querystring.parse(response.content);
    // z.console.log(result);
    // z.console.log(result.access_token);
    // console.log(result);
    return {
      access_token: response.json.access_token
    };
  });
};


const testAuth = (z /*, bundle*/) => {
  // Normally you want to make a request to an endpoint that is either specifically designed to test auth, or one that
  // every user will have access to, such as an account or profile endpoint like /me.
  const promise = z.request({
    method: 'GET',
    url: `http://217.69.3.14:81/api/user`,
  });

  // This method can return any truthy value to indicate the credentials are valid.
  // Raise an error to show
  return promise.then((response) => {
    if (response.status === 401) {
      throw new Error('The access token you supplied is not vlaid');
    }
    return z.JSON.parse(response.content);
  });
};

module.exports = {
  type: 'oauth2',
  oauth2Config: {
    // Step 1 of the OAuth flow; specify where to send the user to authenticate with your API.
    // Zapier generates the state and redirect_uri, you are responsible for providing the rest.
    // Note: can also be a function that returns a string
    authorizeUrl: {
      url: `http://217.69.3.14:81/api/authZapier/`,
      params: {
        client_id: '{{process.env.CLIENT_ID}}',
        state: '{{bundle.inputData.state}}',
        redirect_uri: '{{bundle.inputData.redirect_uri}}',
        response_type: 'code'
      }
    },
    // Step 2 of the OAuth flow; Exchange a code for an access token.
    // This could also use the request shorthand.
    getAccessToken: getAccessToken,

    // If there is a specific scope you want to limit your Zapier app to, you can define it here.
    // Will get passed along to the authorizeUrl
    // scope: 'read,write'
  },
  // The test method allows Zapier to verify that the access token is valid. We'll execute this
  // method after the OAuth flow is complete to ensure everything is setup properly.
  test: testAuth,
  // assuming "username" is a key returned from the test
  connectionLabel: '{{username}}'
};
