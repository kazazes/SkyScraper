import gql from "graphql-tag";
export const NEW_TRANSCRIPTIONS = gql`
  subscription transcriptions {
    transcriptions {
      call {
        id
        createdAt
      }
      body
      words {
        text
        confidence
        end
        start
      }
    }
  }
`;
