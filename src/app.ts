import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";

import {graphqlHTTP} from "express-graphql";
import { GraphQLError } from "graphql";
import queryComplexity, {
  simpleEstimator,
  fieldExtensionsEstimator,
} from "graphql-query-complexity";
import { buildSchema } from "type-graphql";
import PostResolver from "./resolvers/blogPosts.resolver"

import Router from "./routes";

// App
const app: Application = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use(morgan("tiny"))

// REST Routes
app.use("/api", Router);

// GraphQl
const appConfig = async (): Promise<Application> =>{
  const schema = await buildSchema({
      resolvers: [PostResolver],
      nullableByDefault: true,
      emitSchemaFile: true,
  });

  app.use(
    "/graphql",
    graphqlHTTP(async (req, res, { variables }: any) => ({
      schema,
      graphiql: true,
      validationRules: [
        /**
         * This provides GraphQL query analysis to reject complex queries to your GraphQL server.
         * This can be used to protect your GraphQL servers
         * against resource exhaustion and DoS attacks.
         * More documentation can be found (here)[https://github.com/ivome/graphql-query-complexity]
         */
        queryComplexity({
          // The maximum allowed query complexity, queries above this threshold will be rejected
          maximumComplexity: 20,
          // The query variables. This is needed because the variables are not available
          // in the visitor of the graphql-js library
          variables,
          // Optional callback function to retrieve the determined query complexity
          // Will be invoked weather the query is rejected or not
          // This can be used for logging or to implement rate limiting
          onComplete: (complexity: number) => {
            // tslint:disable-next-line: no-console
            console.log("Determined query complexity: ", complexity);
          },
          createError: (max: number, actual: number) => {
            return new GraphQLError(
              `Query is too complex: ${actual}. Maximum allowed complexity: ${max}`,
            );
          },
          // Add any number of estimators. The estimators are invoked in order, the first
          // numeric value that is being returned by an estimator is used as the field complexity.
          // If no estimator returns a value, an exception is raised.
          estimators: [
            // fieldConfigEstimator(),
            fieldExtensionsEstimator(),
            // Add more estimators here...
            // This will assign each field a complexity of 1 if no other estimator
            // returned a value.
            simpleEstimator({
              defaultComplexity: 1,
            }),
          ],
        }),
      ],
    })),
  );

  return app;
}

export default appConfig