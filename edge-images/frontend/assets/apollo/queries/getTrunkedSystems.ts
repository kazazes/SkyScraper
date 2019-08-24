import gql from "graphql-tag";
export const TRUNKED_SYSTEMS = gql`
  query trunkedSystems {
    trunkedSystems {
      type
      createdAt
      shortName
      id
    }
  }
`;
