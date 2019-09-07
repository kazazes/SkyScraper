import gql from "graphql-tag";

export const NEW_TRUNKED_CALLS = gql`
  subscription newTrunkedCalls {
    trunkedCalls {
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
