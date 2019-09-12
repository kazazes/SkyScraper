import gql from "graphql-tag";

export  const LOGIN = gql`
query login($user: UserWhereUniqueInput!, $password: String!) {
  login(user: $user, password: $password) {
    user {
      id
      email
      phone
      verified
    }
    token
  }
}
`
