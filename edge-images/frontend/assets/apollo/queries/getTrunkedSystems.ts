import gql from "graphql-tag";
export const TRUNKED_SYSTEMS = gql`
  query trunkedSystems {
    trunkedSystems {
      type
      name
      createdAt
      shortName
      talkgroups {
        id
        alphaTag
        description
        tag
        priority
        mode
      }
      id
    }
  }
`;
