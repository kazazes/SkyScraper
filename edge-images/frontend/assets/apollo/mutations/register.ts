import gql from "graphql-tag";

export const REGISTER_ADMIN = gql`
    mutation ($email: String!, $password: String!, $phone: String!) {
      register(email: $email, password: $password, phone: $phone) {
        id
      }
    }
`;
