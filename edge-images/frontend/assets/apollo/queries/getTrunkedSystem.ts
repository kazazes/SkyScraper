import gql from "graphql-tag";
export const TRUNKED_SYSTEM = gql`
  query trunkedSystem($where: TrunkedSystemWhereUniqueInput!) {
    trunkedSystem(where: $where) {
      id
      name
      shortName
      talkgroups {
        id
        hex
        decimal
      }
    }
  }
`;
