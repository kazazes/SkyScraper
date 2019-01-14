export const typeDefs = /* GraphQL */ `type AggregateTrunkRecorderConfig {
  count: Int!
}

type AggregateTrunkRecorderSource {
  count: Int!
}

type AggregateTrunkRecorderSystem {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar Long

type Mutation {
  createTrunkRecorderConfig(data: TrunkRecorderConfigCreateInput!): TrunkRecorderConfig!
  updateManyTrunkRecorderConfigs(data: TrunkRecorderConfigUpdateManyMutationInput!, where: TrunkRecorderConfigWhereInput): BatchPayload!
  deleteManyTrunkRecorderConfigs(where: TrunkRecorderConfigWhereInput): BatchPayload!
  createTrunkRecorderSource(data: TrunkRecorderSourceCreateInput!): TrunkRecorderSource!
  updateManyTrunkRecorderSources(data: TrunkRecorderSourceUpdateManyMutationInput!, where: TrunkRecorderSourceWhereInput): BatchPayload!
  deleteManyTrunkRecorderSources(where: TrunkRecorderSourceWhereInput): BatchPayload!
  createTrunkRecorderSystem(data: TrunkRecorderSystemCreateInput!): TrunkRecorderSystem!
  updateManyTrunkRecorderSystems(data: TrunkRecorderSystemUpdateManyMutationInput!, where: TrunkRecorderSystemWhereInput): BatchPayload!
  deleteManyTrunkRecorderSystems(where: TrunkRecorderSystemWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  trunkRecorderConfigs(where: TrunkRecorderConfigWhereInput, orderBy: TrunkRecorderConfigOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [TrunkRecorderConfig]!
  trunkRecorderConfigsConnection(where: TrunkRecorderConfigWhereInput, orderBy: TrunkRecorderConfigOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TrunkRecorderConfigConnection!
  trunkRecorderSources(where: TrunkRecorderSourceWhereInput, orderBy: TrunkRecorderSourceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [TrunkRecorderSource]!
  trunkRecorderSourcesConnection(where: TrunkRecorderSourceWhereInput, orderBy: TrunkRecorderSourceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TrunkRecorderSourceConnection!
  trunkRecorderSystems(where: TrunkRecorderSystemWhereInput, orderBy: TrunkRecorderSystemOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [TrunkRecorderSystem]!
  trunkRecorderSystemsConnection(where: TrunkRecorderSystemWhereInput, orderBy: TrunkRecorderSystemOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TrunkRecorderSystemConnection!
  node(id: ID!): Node
}

enum SmartnetBandplan {
  STANDARD_800
  REBAND_800
  SPLINTER_800
  CUSTOM_400
}

type Subscription {
  trunkRecorderConfig(where: TrunkRecorderConfigSubscriptionWhereInput): TrunkRecorderConfigSubscriptionPayload
  trunkRecorderSource(where: TrunkRecorderSourceSubscriptionWhereInput): TrunkRecorderSourceSubscriptionPayload
  trunkRecorderSystem(where: TrunkRecorderSystemSubscriptionWhereInput): TrunkRecorderSystemSubscriptionPayload
}

enum TalkgroupDisplayFormat {
  ID
  ID_TAG
  TAG_ID
}

enum TrunkedModulation {
  QPSK
  FSK4
}

enum TrunkedSystemType {
  SMARTNET
  P25
  CONVENTIONAL
  CONVENTIONAL_P25
}

type TrunkRecorderConfig {
  sources(where: TrunkRecorderSourceWhereInput, orderBy: TrunkRecorderSourceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [TrunkRecorderSource!]
  systems(where: TrunkRecorderSystemWhereInput, orderBy: TrunkRecorderSystemOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [TrunkRecorderSystem!]
  defaultMode: TrunkRecorderDefaultMode!
  captureDir: String!
  callTimeout: Int!
  logFile: Boolean!
  frequencyFormat: TrunkRecorderFrequencyFormat!
  controlWarnRate: Int!
  statusAsString: Boolean!
}

type TrunkRecorderConfigConnection {
  pageInfo: PageInfo!
  edges: [TrunkRecorderConfigEdge]!
  aggregate: AggregateTrunkRecorderConfig!
}

input TrunkRecorderConfigCreateInput {
  sources: TrunkRecorderSourceCreateManyInput
  systems: TrunkRecorderSystemCreateManyInput
  defaultMode: TrunkRecorderDefaultMode
  captureDir: String!
  callTimeout: Int
  logFile: Boolean
  frequencyFormat: TrunkRecorderFrequencyFormat
  controlWarnRate: Int
  statusAsString: Boolean
}

type TrunkRecorderConfigEdge {
  node: TrunkRecorderConfig!
  cursor: String!
}

enum TrunkRecorderConfigOrderByInput {
  defaultMode_ASC
  defaultMode_DESC
  captureDir_ASC
  captureDir_DESC
  callTimeout_ASC
  callTimeout_DESC
  logFile_ASC
  logFile_DESC
  frequencyFormat_ASC
  frequencyFormat_DESC
  controlWarnRate_ASC
  controlWarnRate_DESC
  statusAsString_ASC
  statusAsString_DESC
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type TrunkRecorderConfigPreviousValues {
  defaultMode: TrunkRecorderDefaultMode!
  captureDir: String!
  callTimeout: Int!
  logFile: Boolean!
  frequencyFormat: TrunkRecorderFrequencyFormat!
  controlWarnRate: Int!
  statusAsString: Boolean!
}

type TrunkRecorderConfigSubscriptionPayload {
  mutation: MutationType!
  node: TrunkRecorderConfig
  updatedFields: [String!]
  previousValues: TrunkRecorderConfigPreviousValues
}

input TrunkRecorderConfigSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: TrunkRecorderConfigWhereInput
  AND: [TrunkRecorderConfigSubscriptionWhereInput!]
  OR: [TrunkRecorderConfigSubscriptionWhereInput!]
  NOT: [TrunkRecorderConfigSubscriptionWhereInput!]
}

input TrunkRecorderConfigUpdateManyMutationInput {
  defaultMode: TrunkRecorderDefaultMode
  captureDir: String
  callTimeout: Int
  logFile: Boolean
  frequencyFormat: TrunkRecorderFrequencyFormat
  controlWarnRate: Int
  statusAsString: Boolean
}

input TrunkRecorderConfigWhereInput {
  sources_every: TrunkRecorderSourceWhereInput
  sources_some: TrunkRecorderSourceWhereInput
  sources_none: TrunkRecorderSourceWhereInput
  systems_every: TrunkRecorderSystemWhereInput
  systems_some: TrunkRecorderSystemWhereInput
  systems_none: TrunkRecorderSystemWhereInput
  defaultMode: TrunkRecorderDefaultMode
  defaultMode_not: TrunkRecorderDefaultMode
  defaultMode_in: [TrunkRecorderDefaultMode!]
  defaultMode_not_in: [TrunkRecorderDefaultMode!]
  captureDir: String
  captureDir_not: String
  captureDir_in: [String!]
  captureDir_not_in: [String!]
  captureDir_lt: String
  captureDir_lte: String
  captureDir_gt: String
  captureDir_gte: String
  captureDir_contains: String
  captureDir_not_contains: String
  captureDir_starts_with: String
  captureDir_not_starts_with: String
  captureDir_ends_with: String
  captureDir_not_ends_with: String
  callTimeout: Int
  callTimeout_not: Int
  callTimeout_in: [Int!]
  callTimeout_not_in: [Int!]
  callTimeout_lt: Int
  callTimeout_lte: Int
  callTimeout_gt: Int
  callTimeout_gte: Int
  logFile: Boolean
  logFile_not: Boolean
  frequencyFormat: TrunkRecorderFrequencyFormat
  frequencyFormat_not: TrunkRecorderFrequencyFormat
  frequencyFormat_in: [TrunkRecorderFrequencyFormat!]
  frequencyFormat_not_in: [TrunkRecorderFrequencyFormat!]
  controlWarnRate: Int
  controlWarnRate_not: Int
  controlWarnRate_in: [Int!]
  controlWarnRate_not_in: [Int!]
  controlWarnRate_lt: Int
  controlWarnRate_lte: Int
  controlWarnRate_gt: Int
  controlWarnRate_gte: Int
  statusAsString: Boolean
  statusAsString_not: Boolean
  AND: [TrunkRecorderConfigWhereInput!]
  OR: [TrunkRecorderConfigWhereInput!]
  NOT: [TrunkRecorderConfigWhereInput!]
}

enum TrunkRecorderDefaultMode {
  ANALOG
  DIGITAL
}

enum TrunkRecorderFrequencyFormat {
  EXP
  MHZ
  HZ
}

type TrunkRecorderSource {
  center: Float!
  rate: Float!
  squelch: Float!
  error: Float!
  gain: Float!
  digitalRecorders: Float!
  digitalLevels: Float
  analogRecorders: Float!
  analogLevels: Float
  device: String!
  modulation: TrunkedModulation!
}

type TrunkRecorderSourceConnection {
  pageInfo: PageInfo!
  edges: [TrunkRecorderSourceEdge]!
  aggregate: AggregateTrunkRecorderSource!
}

input TrunkRecorderSourceCreateInput {
  center: Float!
  rate: Float!
  squelch: Float
  error: Float
  gain: Float
  digitalRecorders: Float
  digitalLevels: Float
  analogRecorders: Float
  analogLevels: Float
  device: String!
  modulation: TrunkedModulation!
}

input TrunkRecorderSourceCreateManyInput {
  create: [TrunkRecorderSourceCreateInput!]
}

type TrunkRecorderSourceEdge {
  node: TrunkRecorderSource!
  cursor: String!
}

enum TrunkRecorderSourceOrderByInput {
  center_ASC
  center_DESC
  rate_ASC
  rate_DESC
  squelch_ASC
  squelch_DESC
  error_ASC
  error_DESC
  gain_ASC
  gain_DESC
  digitalRecorders_ASC
  digitalRecorders_DESC
  digitalLevels_ASC
  digitalLevels_DESC
  analogRecorders_ASC
  analogRecorders_DESC
  analogLevels_ASC
  analogLevels_DESC
  device_ASC
  device_DESC
  modulation_ASC
  modulation_DESC
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type TrunkRecorderSourcePreviousValues {
  center: Float!
  rate: Float!
  squelch: Float!
  error: Float!
  gain: Float!
  digitalRecorders: Float!
  digitalLevels: Float
  analogRecorders: Float!
  analogLevels: Float
  device: String!
  modulation: TrunkedModulation!
}

type TrunkRecorderSourceSubscriptionPayload {
  mutation: MutationType!
  node: TrunkRecorderSource
  updatedFields: [String!]
  previousValues: TrunkRecorderSourcePreviousValues
}

input TrunkRecorderSourceSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: TrunkRecorderSourceWhereInput
  AND: [TrunkRecorderSourceSubscriptionWhereInput!]
  OR: [TrunkRecorderSourceSubscriptionWhereInput!]
  NOT: [TrunkRecorderSourceSubscriptionWhereInput!]
}

input TrunkRecorderSourceUpdateManyMutationInput {
  center: Float
  rate: Float
  squelch: Float
  error: Float
  gain: Float
  digitalRecorders: Float
  digitalLevels: Float
  analogRecorders: Float
  analogLevels: Float
  device: String
  modulation: TrunkedModulation
}

input TrunkRecorderSourceWhereInput {
  center: Float
  center_not: Float
  center_in: [Float!]
  center_not_in: [Float!]
  center_lt: Float
  center_lte: Float
  center_gt: Float
  center_gte: Float
  rate: Float
  rate_not: Float
  rate_in: [Float!]
  rate_not_in: [Float!]
  rate_lt: Float
  rate_lte: Float
  rate_gt: Float
  rate_gte: Float
  squelch: Float
  squelch_not: Float
  squelch_in: [Float!]
  squelch_not_in: [Float!]
  squelch_lt: Float
  squelch_lte: Float
  squelch_gt: Float
  squelch_gte: Float
  error: Float
  error_not: Float
  error_in: [Float!]
  error_not_in: [Float!]
  error_lt: Float
  error_lte: Float
  error_gt: Float
  error_gte: Float
  gain: Float
  gain_not: Float
  gain_in: [Float!]
  gain_not_in: [Float!]
  gain_lt: Float
  gain_lte: Float
  gain_gt: Float
  gain_gte: Float
  digitalRecorders: Float
  digitalRecorders_not: Float
  digitalRecorders_in: [Float!]
  digitalRecorders_not_in: [Float!]
  digitalRecorders_lt: Float
  digitalRecorders_lte: Float
  digitalRecorders_gt: Float
  digitalRecorders_gte: Float
  digitalLevels: Float
  digitalLevels_not: Float
  digitalLevels_in: [Float!]
  digitalLevels_not_in: [Float!]
  digitalLevels_lt: Float
  digitalLevels_lte: Float
  digitalLevels_gt: Float
  digitalLevels_gte: Float
  analogRecorders: Float
  analogRecorders_not: Float
  analogRecorders_in: [Float!]
  analogRecorders_not_in: [Float!]
  analogRecorders_lt: Float
  analogRecorders_lte: Float
  analogRecorders_gt: Float
  analogRecorders_gte: Float
  analogLevels: Float
  analogLevels_not: Float
  analogLevels_in: [Float!]
  analogLevels_not_in: [Float!]
  analogLevels_lt: Float
  analogLevels_lte: Float
  analogLevels_gt: Float
  analogLevels_gte: Float
  device: String
  device_not: String
  device_in: [String!]
  device_not_in: [String!]
  device_lt: String
  device_lte: String
  device_gt: String
  device_gte: String
  device_contains: String
  device_not_contains: String
  device_starts_with: String
  device_not_starts_with: String
  device_ends_with: String
  device_not_ends_with: String
  modulation: TrunkedModulation
  modulation_not: TrunkedModulation
  modulation_in: [TrunkedModulation!]
  modulation_not_in: [TrunkedModulation!]
  AND: [TrunkRecorderSourceWhereInput!]
  OR: [TrunkRecorderSourceWhereInput!]
  NOT: [TrunkRecorderSourceWhereInput!]
}

type TrunkRecorderSystem {
  control_channels: [Float!]!
  channels: [Float!]!
  alphatags: [String!]!
  type: TrunkedSystemType!
  talkgroupsFile: String
  recordUnknown: Boolean
  shortName: String!
  uploadScript: String!
  audioArchive: Boolean!
  callLog: Boolean!
  bandplan: SmartnetBandplan!
  bandplanBase: Float
  bandplanHigh: Float
  bandplanSpacing: Float
  bandplanOffset: Float
  talkgroupDisplayFormat: TalkgroupDisplayFormat
  delayCreateOutput: Boolean
  hideEncrypted: Boolean!
  hideUnknownTalkgroups: Boolean!
}

type TrunkRecorderSystemConnection {
  pageInfo: PageInfo!
  edges: [TrunkRecorderSystemEdge]!
  aggregate: AggregateTrunkRecorderSystem!
}

input TrunkRecorderSystemCreatealphatagsInput {
  set: [String!]
}

input TrunkRecorderSystemCreatechannelsInput {
  set: [Float!]
}

input TrunkRecorderSystemCreatecontrol_channelsInput {
  set: [Float!]
}

input TrunkRecorderSystemCreateInput {
  control_channels: TrunkRecorderSystemCreatecontrol_channelsInput
  channels: TrunkRecorderSystemCreatechannelsInput
  alphatags: TrunkRecorderSystemCreatealphatagsInput
  type: TrunkedSystemType!
  talkgroupsFile: String
  recordUnknown: Boolean
  shortName: String!
  uploadScript: String!
  audioArchive: Boolean
  callLog: Boolean
  bandplan: SmartnetBandplan
  bandplanBase: Float
  bandplanHigh: Float
  bandplanSpacing: Float
  bandplanOffset: Float
  talkgroupDisplayFormat: TalkgroupDisplayFormat
  delayCreateOutput: Boolean
  hideEncrypted: Boolean
  hideUnknownTalkgroups: Boolean
}

input TrunkRecorderSystemCreateManyInput {
  create: [TrunkRecorderSystemCreateInput!]
}

type TrunkRecorderSystemEdge {
  node: TrunkRecorderSystem!
  cursor: String!
}

enum TrunkRecorderSystemOrderByInput {
  type_ASC
  type_DESC
  talkgroupsFile_ASC
  talkgroupsFile_DESC
  recordUnknown_ASC
  recordUnknown_DESC
  shortName_ASC
  shortName_DESC
  uploadScript_ASC
  uploadScript_DESC
  audioArchive_ASC
  audioArchive_DESC
  callLog_ASC
  callLog_DESC
  bandplan_ASC
  bandplan_DESC
  bandplanBase_ASC
  bandplanBase_DESC
  bandplanHigh_ASC
  bandplanHigh_DESC
  bandplanSpacing_ASC
  bandplanSpacing_DESC
  bandplanOffset_ASC
  bandplanOffset_DESC
  talkgroupDisplayFormat_ASC
  talkgroupDisplayFormat_DESC
  delayCreateOutput_ASC
  delayCreateOutput_DESC
  hideEncrypted_ASC
  hideEncrypted_DESC
  hideUnknownTalkgroups_ASC
  hideUnknownTalkgroups_DESC
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type TrunkRecorderSystemPreviousValues {
  control_channels: [Float!]!
  channels: [Float!]!
  alphatags: [String!]!
  type: TrunkedSystemType!
  talkgroupsFile: String
  recordUnknown: Boolean
  shortName: String!
  uploadScript: String!
  audioArchive: Boolean!
  callLog: Boolean!
  bandplan: SmartnetBandplan!
  bandplanBase: Float
  bandplanHigh: Float
  bandplanSpacing: Float
  bandplanOffset: Float
  talkgroupDisplayFormat: TalkgroupDisplayFormat
  delayCreateOutput: Boolean
  hideEncrypted: Boolean!
  hideUnknownTalkgroups: Boolean!
}

type TrunkRecorderSystemSubscriptionPayload {
  mutation: MutationType!
  node: TrunkRecorderSystem
  updatedFields: [String!]
  previousValues: TrunkRecorderSystemPreviousValues
}

input TrunkRecorderSystemSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: TrunkRecorderSystemWhereInput
  AND: [TrunkRecorderSystemSubscriptionWhereInput!]
  OR: [TrunkRecorderSystemSubscriptionWhereInput!]
  NOT: [TrunkRecorderSystemSubscriptionWhereInput!]
}

input TrunkRecorderSystemUpdatealphatagsInput {
  set: [String!]
}

input TrunkRecorderSystemUpdatechannelsInput {
  set: [Float!]
}

input TrunkRecorderSystemUpdatecontrol_channelsInput {
  set: [Float!]
}

input TrunkRecorderSystemUpdateManyMutationInput {
  control_channels: TrunkRecorderSystemUpdatecontrol_channelsInput
  channels: TrunkRecorderSystemUpdatechannelsInput
  alphatags: TrunkRecorderSystemUpdatealphatagsInput
  type: TrunkedSystemType
  talkgroupsFile: String
  recordUnknown: Boolean
  shortName: String
  uploadScript: String
  audioArchive: Boolean
  callLog: Boolean
  bandplan: SmartnetBandplan
  bandplanBase: Float
  bandplanHigh: Float
  bandplanSpacing: Float
  bandplanOffset: Float
  talkgroupDisplayFormat: TalkgroupDisplayFormat
  delayCreateOutput: Boolean
  hideEncrypted: Boolean
  hideUnknownTalkgroups: Boolean
}

input TrunkRecorderSystemWhereInput {
  type: TrunkedSystemType
  type_not: TrunkedSystemType
  type_in: [TrunkedSystemType!]
  type_not_in: [TrunkedSystemType!]
  talkgroupsFile: String
  talkgroupsFile_not: String
  talkgroupsFile_in: [String!]
  talkgroupsFile_not_in: [String!]
  talkgroupsFile_lt: String
  talkgroupsFile_lte: String
  talkgroupsFile_gt: String
  talkgroupsFile_gte: String
  talkgroupsFile_contains: String
  talkgroupsFile_not_contains: String
  talkgroupsFile_starts_with: String
  talkgroupsFile_not_starts_with: String
  talkgroupsFile_ends_with: String
  talkgroupsFile_not_ends_with: String
  recordUnknown: Boolean
  recordUnknown_not: Boolean
  shortName: String
  shortName_not: String
  shortName_in: [String!]
  shortName_not_in: [String!]
  shortName_lt: String
  shortName_lte: String
  shortName_gt: String
  shortName_gte: String
  shortName_contains: String
  shortName_not_contains: String
  shortName_starts_with: String
  shortName_not_starts_with: String
  shortName_ends_with: String
  shortName_not_ends_with: String
  uploadScript: String
  uploadScript_not: String
  uploadScript_in: [String!]
  uploadScript_not_in: [String!]
  uploadScript_lt: String
  uploadScript_lte: String
  uploadScript_gt: String
  uploadScript_gte: String
  uploadScript_contains: String
  uploadScript_not_contains: String
  uploadScript_starts_with: String
  uploadScript_not_starts_with: String
  uploadScript_ends_with: String
  uploadScript_not_ends_with: String
  audioArchive: Boolean
  audioArchive_not: Boolean
  callLog: Boolean
  callLog_not: Boolean
  bandplan: SmartnetBandplan
  bandplan_not: SmartnetBandplan
  bandplan_in: [SmartnetBandplan!]
  bandplan_not_in: [SmartnetBandplan!]
  bandplanBase: Float
  bandplanBase_not: Float
  bandplanBase_in: [Float!]
  bandplanBase_not_in: [Float!]
  bandplanBase_lt: Float
  bandplanBase_lte: Float
  bandplanBase_gt: Float
  bandplanBase_gte: Float
  bandplanHigh: Float
  bandplanHigh_not: Float
  bandplanHigh_in: [Float!]
  bandplanHigh_not_in: [Float!]
  bandplanHigh_lt: Float
  bandplanHigh_lte: Float
  bandplanHigh_gt: Float
  bandplanHigh_gte: Float
  bandplanSpacing: Float
  bandplanSpacing_not: Float
  bandplanSpacing_in: [Float!]
  bandplanSpacing_not_in: [Float!]
  bandplanSpacing_lt: Float
  bandplanSpacing_lte: Float
  bandplanSpacing_gt: Float
  bandplanSpacing_gte: Float
  bandplanOffset: Float
  bandplanOffset_not: Float
  bandplanOffset_in: [Float!]
  bandplanOffset_not_in: [Float!]
  bandplanOffset_lt: Float
  bandplanOffset_lte: Float
  bandplanOffset_gt: Float
  bandplanOffset_gte: Float
  talkgroupDisplayFormat: TalkgroupDisplayFormat
  talkgroupDisplayFormat_not: TalkgroupDisplayFormat
  talkgroupDisplayFormat_in: [TalkgroupDisplayFormat!]
  talkgroupDisplayFormat_not_in: [TalkgroupDisplayFormat!]
  delayCreateOutput: Boolean
  delayCreateOutput_not: Boolean
  hideEncrypted: Boolean
  hideEncrypted_not: Boolean
  hideUnknownTalkgroups: Boolean
  hideUnknownTalkgroups_not: Boolean
  AND: [TrunkRecorderSystemWhereInput!]
  OR: [TrunkRecorderSystemWhereInput!]
  NOT: [TrunkRecorderSystemWhereInput!]
}
`