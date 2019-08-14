import gql from "graphql-tag";
export const TRUNKED_CALLS = gql`
  query trunkedCalls(
    $first: Int
    $skip: Int
    $orderBy: TrunkedCallOrderByInput
  ) {
    trunkedCalls(first: $first, skip: $skip, orderBy: $orderBy) {
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
