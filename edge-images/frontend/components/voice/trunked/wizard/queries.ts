import gql from "~/node_modules/graphql-tag";

export const trunkedConfigs = gql`
  query {
    trunkedConfigs(orderBy: updatedAt_DESC) {
      id
      defaultMode
      captureDir
      callTimeout
      logFile
      frequencyFormat
      controlWarnRate
      statusAsString
      sources {
        center
        rate
        squelch
        error
        gain
        digitalRecorders
        digitalLevels
        analogRecorders
        analogLevels
        device
        modulation
      }
      systems {
        controlChannels
        channels
        alphatags
        type
        talkgroups {
          decimal
          mode
          alphaTag
          description
          tag
          group
          priority
        }
        recordUnknown
        shortName
        uploadScript
        audioArchive
        callLog
        bandplan
        bandplanBase
        bandplanSpacing
        bandplanOffset
        bandplanHigh
        talkgroupDisplayFormat
        delayCreateOutput
        hideEncrypted
        hideUnknownTalkgroups
      }
    }
  }
`;
