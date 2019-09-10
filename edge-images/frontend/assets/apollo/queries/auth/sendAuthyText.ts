import gql from "graphql-tag";

export const SEND_AUTHY_TEXT = gql`
  query sendAuthyText($user: UserWhereUniqueInput!) {
    sendAuthyVerification(user: $user)
  }
`;
