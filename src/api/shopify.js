// src/api/shopify.js
import { GraphQLClient } from "graphql-request";

const storefrontAccessToken =
   process.env.REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const endpoint = "https://poke-degen.myshopify.com/api/2022-01/graphql.json";

const client = new GraphQLClient(endpoint, {
   headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
   },
});

export default client;

export async function createCheckout() {
   const query = `
    mutation {
      checkoutCreate(input: {}) {
        checkout {
          id
          webUrl
        }
        checkoutUserErrors {
          code
          field
          message
        }
      }
    }
  `;

   try {
      const response = await client.request(query);
      return response.checkoutCreate.checkout;
   } catch (error) {
      console.error("Error creating checkout:", error);
      return null;
   }
}
