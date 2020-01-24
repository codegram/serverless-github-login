"use strict";

const qs = require("querystring");
const axios = require("axios");

function authenticate(code) {
  const data = qs.stringify({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code
  });

  return axios
    .post("https://github.com/login/oauth/access_token", data, {
      headers: {
        "content-length": data.length
      }
    })
    .then(({ data }) => {
      return {
        token: qs.parse(data).access_token
      };
    })
    .catch(e => ({
      error: e.message
    }));
}

module.exports.handler = async event => {
  const body = JSON.parse(event.body);

  const result = {
    error: null,
    token: null
  };

  if (body) {
    const { error, token } = await authenticate(body.code);

    if (error || !token) {
      result.error = error || "bad_code";
    } else {
      result.token = token;
    }
  } else {
    result.error = "no_code";
  }

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(result, null, 2)
  };
};
