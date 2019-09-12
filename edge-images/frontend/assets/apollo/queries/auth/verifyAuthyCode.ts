import gql from "graphql-tag";

export const VERIFY_AUTHY_CODE = gql`
  query verifyAuthCode($user: UserWhereUniqueInput!, $token: String!) {
    verifyAuthyToken(user: $user, token: $token) {
      token
      user {
        email
        id
        role
      }
    }
  }
`;
