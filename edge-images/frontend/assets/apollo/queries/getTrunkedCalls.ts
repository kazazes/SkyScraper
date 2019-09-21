import gql from "graphql-tag";

export const TRUNKED_CALLS = gql`
  query trunkedCalls(
    $first: Int
    $skip: Int
    $orderBy: TrunkedCallOrderByInput
    $where: TrunkedCallWhereInput
  ) {
    trunkedCalls(first: $first, skip: $skip, orderBy: $orderBy, where: $where) {
      id
      createdAt
      frequency
      startTime
      endTime
      emergency
      talkgroup {
        decimal
        alphaTag
        description
        tag
      }
      system {
        id
        shortName
        type
      }
      duration
      audioPath
      remotePaths
      transcription {
        body
        words {
          text
          confidence
          start
          end
        }
      }
    }
  }
`;
