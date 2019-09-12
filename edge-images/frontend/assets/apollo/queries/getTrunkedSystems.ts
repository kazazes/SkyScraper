import gql from "graphql-tag";

export const TRUNKED_SYSTEMS = gql`
  query trunkedSystems {
    trunkedSystems {
      id
      name
      shortName
      controlChannels
      updatedAt
      createdAt
      type
      talkgroups {
        id
        hex
        decimal
      }
    }
  }
`;
