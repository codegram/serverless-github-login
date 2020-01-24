# Serverless GitHub login

A simple Lambda function deployed to AWS with Serverless Framework that allows implementing the [GitHub OAuth Web Application Flow](https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/#web-application-flow).

## Usage

- Update the `org` field on the `serverless.yml`
- Create the variables in AWS Systems Manager Parameter Store:
  - `/github-login/dev/clientId` OAuth client id for development app, type String
  - `/github-login/prod/clientId` OAuth client id for production app, type String
  - `/github-login/dev/clientSecret` OAuth client secret for development app, type SecureString
  - `/github-login/prod/clientSecret` OAuth client secret for production app, type SecureString
- Deploy:
  - `serverless deploy --stage prod`
  - `serverless deploy --stage dev`

From your client side you can now exchange the code for the token. For more information check [GitHub's documentation](https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/#web-application-flow).

```js
var code = window.location.href.match(/\?code=(.*)/)[1];

fetch(`${YOUR_AWS_URL}/login`, {
    method: "POST",
    body: JSON.stringify({
      code
    })
  })
```
