import gql from "graphql-tag";

export const TRUNKED_SYSTEM_STATS = gql`
  query trunkedSystemsStats {
    trunkedSystemsStats {
      system {
        shortName
        name
        id
      }
      systemId
      callCount
      talkgroupCount
    }
  }
`;
