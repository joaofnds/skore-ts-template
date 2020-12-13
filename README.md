# Skore TypeScript Template

### Requirements

- Docker: We deploy projects in Kubernetes using Docker.
- [NVM](https://github.com/nvm-sh/nvm): We use it to manage Node Version.
- VSCode: We use here, and there is prettier and plugins configs for it.
- SonarQube Server: We use to measure our codebase health.

### Setting up

Create a new repo from these following [this instructions](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template).

Then do the following changes into your new repo:

#### NPM

Generate a personal access token in GitHub following [this instructions](https://docs.github.com/en/free-pro-team@latest/packages/guides/configuring-npm-for-use-with-github-packages#authenticating-with-a-personal-access-token)

Then create a `.npmrc` file:

```
//npm.pkg.github.com/:_authToken=YOUR_TOKEN
@skore-io:registry=https://npm.pkg.github.com/skore-io
```

_Althought all `@skore-io` packages are public GitHub's asks for a token._

#### Ensure node version

`nvm install`

#### Install dependencies

`npm install`

#### Github actions changes

Replace all `skore-ts-template` references to your repository name in: `wokflows/develop.yml`, `wokflows/main.yml`, `wokflows/pull_request.yml`.

Replace all `##SONARQUBE_URL##` references with you sonarqube server or remove it.

If you don't deploy your code to k8s then remove all reference for it in `workflows/develop.yml` and `main.yml` and delete `.k8s` folder.

### How to use

#### Local running

Start `mongodb` and `redis` with:

`npm run start:docker`

Start NestJS project:

`npm run start`

You can access `http://localhost:3000/graphql` and check Apollo Playground

### Running tests

We've two types of test `unit` and `load`, for `unit tests` we use Jest.

You can run the unit tests with:

`npm t`

_Unit tests depends on docker containers (redis and mongodb) running, you can run `npm run start:docker` if containers are't running_

We use `k6` for `load tests`

First you need bootstrap other containers with:

`npm run load:docker`

_If application containers are running, maybe you'll have to stop them and bootstrap this_

Then run the load tests:

`npm run load:test`

For more info check project Wiki's
