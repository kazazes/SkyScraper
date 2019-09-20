export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  DateTime: any,
  Long: any,
};

export type AggregateBaseTrunkedSystem = {
   __typename?: 'AggregateBaseTrunkedSystem',
  count: Scalars['Int'],
};

export type AggregateDump1090Aircraft = {
   __typename?: 'AggregateDump1090Aircraft',
  count: Scalars['Int'],
};

export type AggregateDump1090Message = {
   __typename?: 'AggregateDump1090Message',
  count: Scalars['Int'],
};

export type AggregateSiteFrequency = {
   __typename?: 'AggregateSiteFrequency',
  count: Scalars['Int'],
};

export type AggregateSystemSite = {
   __typename?: 'AggregateSystemSite',
  count: Scalars['Int'],
};

export type AggregateTranscription = {
   __typename?: 'AggregateTranscription',
  count: Scalars['Int'],
};

export type AggregateTranscriptionWord = {
   __typename?: 'AggregateTranscriptionWord',
  count: Scalars['Int'],
};

export type AggregateTrunkedCall = {
   __typename?: 'AggregateTrunkedCall',
  count: Scalars['Int'],
};

export type AggregateTrunkedCallFrequencyTime = {
   __typename?: 'AggregateTrunkedCallFrequencyTime',
  count: Scalars['Int'],
};

export type AggregateTrunkedCallSource = {
   __typename?: 'AggregateTrunkedCallSource',
  count: Scalars['Int'],
};

export type AggregateTrunkedConfig = {
   __typename?: 'AggregateTrunkedConfig',
  count: Scalars['Int'],
};

export type AggregateTrunkedSource = {
   __typename?: 'AggregateTrunkedSource',
  count: Scalars['Int'],
};

export type AggregateTrunkedSystem = {
   __typename?: 'AggregateTrunkedSystem',
  count: Scalars['Int'],
};

export type AggregateTrunkedTalkgroup = {
   __typename?: 'AggregateTrunkedTalkgroup',
  count: Scalars['Int'],
};

export type AggregateUser = {
   __typename?: 'AggregateUser',
  count: Scalars['Int'],
};

export type BaseTrunkedSystem = {
   __typename?: 'BaseTrunkedSystem',
  id: Scalars['ID'],
  name: Scalars['String'],
  shortName: Scalars['String'],
  county?: Maybe<Scalars['String']>,
  systemType?: Maybe<TrunkedSystemType>,
  systemId?: Maybe<Scalars['String']>,
  state?: Maybe<Scalars['String']>,
  sites?: Maybe<Array<SystemSite>>,
  talkgroups?: Maybe<Array<TrunkedTalkgroup>>,
};


export type BaseTrunkedSystemSitesArgs = {
  where?: Maybe<SystemSiteWhereInput>,
  orderBy?: Maybe<SystemSiteOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type BaseTrunkedSystemTalkgroupsArgs = {
  where?: Maybe<TrunkedTalkgroupWhereInput>,
  orderBy?: Maybe<TrunkedTalkgroupOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};

export type BaseTrunkedSystemConnection = {
   __typename?: 'BaseTrunkedSystemConnection',
  pageInfo: PageInfo,
  edges: Array<Maybe<BaseTrunkedSystemEdge>>,
  aggregate: AggregateBaseTrunkedSystem,
};

export type BaseTrunkedSystemCreateInput = {
  id?: Maybe<Scalars['ID']>,
  name: Scalars['String'],
  shortName: Scalars['String'],
  county?: Maybe<Scalars['String']>,
  systemType?: Maybe<TrunkedSystemType>,
  systemId?: Maybe<Scalars['String']>,
  state?: Maybe<Scalars['String']>,
  sites?: Maybe<SystemSiteCreateManyInput>,
  talkgroups?: Maybe<TrunkedTalkgroupCreateManyInput>,
};

export type BaseTrunkedSystemEdge = {
   __typename?: 'BaseTrunkedSystemEdge',
  node: BaseTrunkedSystem,
  cursor: Scalars['String'],
};

export enum BaseTrunkedSystemOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  ShortNameAsc = 'shortName_ASC',
  ShortNameDesc = 'shortName_DESC',
  CountyAsc = 'county_ASC',
  CountyDesc = 'county_DESC',
  SystemTypeAsc = 'systemType_ASC',
  SystemTypeDesc = 'systemType_DESC',
  SystemIdAsc = 'systemId_ASC',
  SystemIdDesc = 'systemId_DESC',
  StateAsc = 'state_ASC',
  StateDesc = 'state_DESC'
}

export type BaseTrunkedSystemPreviousValues = {
   __typename?: 'BaseTrunkedSystemPreviousValues',
  id: Scalars['ID'],
  name: Scalars['String'],
  shortName: Scalars['String'],
  county?: Maybe<Scalars['String']>,
  systemType?: Maybe<TrunkedSystemType>,
  systemId?: Maybe<Scalars['String']>,
  state?: Maybe<Scalars['String']>,
};

export type BaseTrunkedSystemSubscriptionPayload = {
   __typename?: 'BaseTrunkedSystemSubscriptionPayload',
  mutation: MutationType,
  node?: Maybe<BaseTrunkedSystem>,
  updatedFields?: Maybe<Array<Scalars['String']>>,
  previousValues?: Maybe<BaseTrunkedSystemPreviousValues>,
};

export type BaseTrunkedSystemSubscriptionWhereInput = {
  mutation_in?: Maybe<Array<MutationType>>,
  updatedFields_contains?: Maybe<Scalars['String']>,
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>,
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>,
  node?: Maybe<BaseTrunkedSystemWhereInput>,
  AND?: Maybe<Array<BaseTrunkedSystemSubscriptionWhereInput>>,
  OR?: Maybe<Array<BaseTrunkedSystemSubscriptionWhereInput>>,
  NOT?: Maybe<Array<BaseTrunkedSystemSubscriptionWhereInput>>,
};

export type BaseTrunkedSystemUpdateInput = {
  name?: Maybe<Scalars['String']>,
  shortName?: Maybe<Scalars['String']>,
  county?: Maybe<Scalars['String']>,
  systemType?: Maybe<TrunkedSystemType>,
  systemId?: Maybe<Scalars['String']>,
  state?: Maybe<Scalars['String']>,
  sites?: Maybe<SystemSiteUpdateManyInput>,
  talkgroups?: Maybe<TrunkedTalkgroupUpdateManyInput>,
};

export type BaseTrunkedSystemUpdateManyMutationInput = {
  name?: Maybe<Scalars['String']>,
  shortName?: Maybe<Scalars['String']>,
  county?: Maybe<Scalars['String']>,
  systemType?: Maybe<TrunkedSystemType>,
  systemId?: Maybe<Scalars['String']>,
  state?: Maybe<Scalars['String']>,
};

export type BaseTrunkedSystemWhereInput = {
  id?: Maybe<Scalars['ID']>,
  id_not?: Maybe<Scalars['ID']>,
  id_in?: Maybe<Array<Scalars['ID']>>,
  id_not_in?: Maybe<Array<Scalars['ID']>>,
  id_lt?: Maybe<Scalars['ID']>,
  id_lte?: Maybe<Scalars['ID']>,
  id_gt?: Maybe<Scalars['ID']>,
  id_gte?: Maybe<Scalars['ID']>,
  id_contains?: Maybe<Scalars['ID']>,
  id_not_contains?: Maybe<Scalars['ID']>,
  id_starts_with?: Maybe<Scalars['ID']>,
  id_not_starts_with?: Maybe<Scalars['ID']>,
  id_ends_with?: Maybe<Scalars['ID']>,
  id_not_ends_with?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  name_not?: Maybe<Scalars['String']>,
  name_in?: Maybe<Array<Scalars['String']>>,
  name_not_in?: Maybe<Array<Scalars['String']>>,
  name_lt?: Maybe<Scalars['String']>,
  name_lte?: Maybe<Scalars['String']>,
  name_gt?: Maybe<Scalars['String']>,
  name_gte?: Maybe<Scalars['String']>,
  name_contains?: Maybe<Scalars['String']>,
  name_not_contains?: Maybe<Scalars['String']>,
  name_starts_with?: Maybe<Scalars['String']>,
  name_not_starts_with?: Maybe<Scalars['String']>,
  name_ends_with?: Maybe<Scalars['String']>,
  name_not_ends_with?: Maybe<Scalars['String']>,
  shortName?: Maybe<Scalars['String']>,
  shortName_not?: Maybe<Scalars['String']>,
  shortName_in?: Maybe<Array<Scalars['String']>>,
  shortName_not_in?: Maybe<Array<Scalars['String']>>,
  shortName_lt?: Maybe<Scalars['String']>,
  shortName_lte?: Maybe<Scalars['String']>,
  shortName_gt?: Maybe<Scalars['String']>,
  shortName_gte?: Maybe<Scalars['String']>,
  shortName_contains?: Maybe<Scalars['String']>,
  shortName_not_contains?: Maybe<Scalars['String']>,
  shortName_starts_with?: Maybe<Scalars['String']>,
  shortName_not_starts_with?: Maybe<Scalars['String']>,
  shortName_ends_with?: Maybe<Scalars['String']>,
  shortName_not_ends_with?: Maybe<Scalars['String']>,
  county?: Maybe<Scalars['String']>,
  county_not?: Maybe<Scalars['String']>,
  county_in?: Maybe<Array<Scalars['String']>>,
  county_not_in?: Maybe<Array<Scalars['String']>>,
  county_lt?: Maybe<Scalars['String']>,
  county_lte?: Maybe<Scalars['String']>,
  county_gt?: Maybe<Scalars['String']>,
  county_gte?: Maybe<Scalars['String']>,
  county_contains?: Maybe<Scalars['String']>,
  county_not_contains?: Maybe<Scalars['String']>,
  county_starts_with?: Maybe<Scalars['String']>,
  county_not_starts_with?: Maybe<Scalars['String']>,
  county_ends_with?: Maybe<Scalars['String']>,
  county_not_ends_with?: Maybe<Scalars['String']>,
  systemType?: Maybe<TrunkedSystemType>,
  systemType_not?: Maybe<TrunkedSystemType>,
  systemType_in?: Maybe<Array<TrunkedSystemType>>,
  systemType_not_in?: Maybe<Array<TrunkedSystemType>>,
  systemId?: Maybe<Scalars['String']>,
  systemId_not?: Maybe<Scalars['String']>,
  systemId_in?: Maybe<Array<Scalars['String']>>,
  systemId_not_in?: Maybe<Array<Scalars['String']>>,
  systemId_lt?: Maybe<Scalars['String']>,
  systemId_lte?: Maybe<Scalars['String']>,
  systemId_gt?: Maybe<Scalars['String']>,
  systemId_gte?: Maybe<Scalars['String']>,
  systemId_contains?: Maybe<Scalars['String']>,
  systemId_not_contains?: Maybe<Scalars['String']>,
  systemId_starts_with?: Maybe<Scalars['String']>,
  systemId_not_starts_with?: Maybe<Scalars['String']>,
  systemId_ends_with?: Maybe<Scalars['String']>,
  systemId_not_ends_with?: Maybe<Scalars['String']>,
  state?: Maybe<Scalars['String']>,
  state_not?: Maybe<Scalars['String']>,
  state_in?: Maybe<Array<Scalars['String']>>,
  state_not_in?: Maybe<Array<Scalars['String']>>,
  state_lt?: Maybe<Scalars['String']>,
  state_lte?: Maybe<Scalars['String']>,
  state_gt?: Maybe<Scalars['String']>,
  state_gte?: Maybe<Scalars['String']>,
  state_contains?: Maybe<Scalars['String']>,
  state_not_contains?: Maybe<Scalars['String']>,
  state_starts_with?: Maybe<Scalars['String']>,
  state_not_starts_with?: Maybe<Scalars['String']>,
  state_ends_with?: Maybe<Scalars['String']>,
  state_not_ends_with?: Maybe<Scalars['String']>,
  sites_every?: Maybe<SystemSiteWhereInput>,
  sites_some?: Maybe<SystemSiteWhereInput>,
  sites_none?: Maybe<SystemSiteWhereInput>,
  talkgroups_every?: Maybe<TrunkedTalkgroupWhereInput>,
  talkgroups_some?: Maybe<TrunkedTalkgroupWhereInput>,
  talkgroups_none?: Maybe<TrunkedTalkgroupWhereInput>,
  AND?: Maybe<Array<BaseTrunkedSystemWhereInput>>,
  OR?: Maybe<Array<BaseTrunkedSystemWhereInput>>,
  NOT?: Maybe<Array<BaseTrunkedSystemWhereInput>>,
};

export type BaseTrunkedSystemWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>,
};

export type BatchPayload = {
   __typename?: 'BatchPayload',
  count: Scalars['Long'],
};


export type Dump1090Aircraft = {
   __typename?: 'Dump1090Aircraft',
  id: Scalars['ID'],
  IcaoID?: Maybe<Scalars['String']>,
};

export type Dump1090AircraftConnection = {
   __typename?: 'Dump1090AircraftConnection',
  pageInfo: PageInfo,
  edges: Array<Maybe<Dump1090AircraftEdge>>,
  aggregate: AggregateDump1090Aircraft,
};

export type Dump1090AircraftCreateInput = {
  id?: Maybe<Scalars['ID']>,
  IcaoID?: Maybe<Scalars['String']>,
};

export type Dump1090AircraftCreateOneInput = {
  create?: Maybe<Dump1090AircraftCreateInput>,
  connect?: Maybe<Dump1090AircraftWhereUniqueInput>,
};

export type Dump1090AircraftEdge = {
   __typename?: 'Dump1090AircraftEdge',
  node: Dump1090Aircraft,
  cursor: Scalars['String'],
};

export enum Dump1090AircraftOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  IcaoIdAsc = 'IcaoID_ASC',
  IcaoIdDesc = 'IcaoID_DESC'
}

export type Dump1090AircraftPreviousValues = {
   __typename?: 'Dump1090AircraftPreviousValues',
  id: Scalars['ID'],
  IcaoID?: Maybe<Scalars['String']>,
};

export type Dump1090AircraftSubscriptionPayload = {
   __typename?: 'Dump1090AircraftSubscriptionPayload',
  mutation: MutationType,
  node?: Maybe<Dump1090Aircraft>,
  updatedFields?: Maybe<Array<Scalars['String']>>,
  previousValues?: Maybe<Dump1090AircraftPreviousValues>,
};

export type Dump1090AircraftSubscriptionWhereInput = {
  mutation_in?: Maybe<Array<MutationType>>,
  updatedFields_contains?: Maybe<Scalars['String']>,
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>,
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>,
  node?: Maybe<Dump1090AircraftWhereInput>,
  AND?: Maybe<Array<Dump1090AircraftSubscriptionWhereInput>>,
  OR?: Maybe<Array<Dump1090AircraftSubscriptionWhereInput>>,
  NOT?: Maybe<Array<Dump1090AircraftSubscriptionWhereInput>>,
};

export type Dump1090AircraftUpdateDataInput = {
  IcaoID?: Maybe<Scalars['String']>,
};

export type Dump1090AircraftUpdateInput = {
  IcaoID?: Maybe<Scalars['String']>,
};

export type Dump1090AircraftUpdateManyMutationInput = {
  IcaoID?: Maybe<Scalars['String']>,
};

export type Dump1090AircraftUpdateOneInput = {
  create?: Maybe<Dump1090AircraftCreateInput>,
  update?: Maybe<Dump1090AircraftUpdateDataInput>,
  upsert?: Maybe<Dump1090AircraftUpsertNestedInput>,
  delete?: Maybe<Scalars['Boolean']>,
  disconnect?: Maybe<Scalars['Boolean']>,
  connect?: Maybe<Dump1090AircraftWhereUniqueInput>,
};

export type Dump1090AircraftUpsertNestedInput = {
  update: Dump1090AircraftUpdateDataInput,
  create: Dump1090AircraftCreateInput,
};

export type Dump1090AircraftWhereInput = {
  id?: Maybe<Scalars['ID']>,
  id_not?: Maybe<Scalars['ID']>,
  id_in?: Maybe<Array<Scalars['ID']>>,
  id_not_in?: Maybe<Array<Scalars['ID']>>,
  id_lt?: Maybe<Scalars['ID']>,
  id_lte?: Maybe<Scalars['ID']>,
  id_gt?: Maybe<Scalars['ID']>,
  id_gte?: Maybe<Scalars['ID']>,
  id_contains?: Maybe<Scalars['ID']>,
  id_not_contains?: Maybe<Scalars['ID']>,
  id_starts_with?: Maybe<Scalars['ID']>,
  id_not_starts_with?: Maybe<Scalars['ID']>,
  id_ends_with?: Maybe<Scalars['ID']>,
  id_not_ends_with?: Maybe<Scalars['ID']>,
  IcaoID?: Maybe<Scalars['String']>,
  IcaoID_not?: Maybe<Scalars['String']>,
  IcaoID_in?: Maybe<Array<Scalars['String']>>,
  IcaoID_not_in?: Maybe<Array<Scalars['String']>>,
  IcaoID_lt?: Maybe<Scalars['String']>,
  IcaoID_lte?: Maybe<Scalars['String']>,
  IcaoID_gt?: Maybe<Scalars['String']>,
  IcaoID_gte?: Maybe<Scalars['String']>,
  IcaoID_contains?: Maybe<Scalars['String']>,
  IcaoID_not_contains?: Maybe<Scalars['String']>,
  IcaoID_starts_with?: Maybe<Scalars['String']>,
  IcaoID_not_starts_with?: Maybe<Scalars['String']>,
  IcaoID_ends_with?: Maybe<Scalars['String']>,
  IcaoID_not_ends_with?: Maybe<Scalars['String']>,
  AND?: Maybe<Array<Dump1090AircraftWhereInput>>,
  OR?: Maybe<Array<Dump1090AircraftWhereInput>>,
  NOT?: Maybe<Array<Dump1090AircraftWhereInput>>,
};

export type Dump1090AircraftWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>,
  IcaoID?: Maybe<Scalars['String']>,
};

export type Dump1090Message = {
   __typename?: 'Dump1090Message',
  id: Scalars['ID'],
  messageType: Dump1090MessageType,
  transmissionType: Dump1090TransmissionType,
  aircraft?: Maybe<Dump1090Aircraft>,
  generated: Scalars['DateTime'],
  logged: Scalars['DateTime'],
  flightId?: Maybe<Scalars['String']>,
  squawk?: Maybe<Scalars['String']>,
  alert?: Maybe<Scalars['Boolean']>,
  emergency?: Maybe<Scalars['Boolean']>,
  isOnGround?: Maybe<Scalars['Boolean']>,
  latitude?: Maybe<Scalars['Float']>,
  longitude?: Maybe<Scalars['Float']>,
  verticalRate?: Maybe<Scalars['Int']>,
  track?: Maybe<Scalars['Int']>,
  groupSpeed?: Maybe<Scalars['Int']>,
  callsign?: Maybe<Scalars['String']>,
  altitude?: Maybe<Scalars['Int']>,
};

export type Dump1090MessageConnection = {
   __typename?: 'Dump1090MessageConnection',
  pageInfo: PageInfo,
  edges: Array<Maybe<Dump1090MessageEdge>>,
  aggregate: AggregateDump1090Message,
};

export type Dump1090MessageCreateInput = {
  id?: Maybe<Scalars['ID']>,
  messageType: Dump1090MessageType,
  transmissionType: Dump1090TransmissionType,
  aircraft?: Maybe<Dump1090AircraftCreateOneInput>,
  generated: Scalars['DateTime'],
  logged: Scalars['DateTime'],
  flightId?: Maybe<Scalars['String']>,
  squawk?: Maybe<Scalars['String']>,
  alert?: Maybe<Scalars['Boolean']>,
  emergency?: Maybe<Scalars['Boolean']>,
  isOnGround?: Maybe<Scalars['Boolean']>,
  latitude?: Maybe<Scalars['Float']>,
  longitude?: Maybe<Scalars['Float']>,
  verticalRate?: Maybe<Scalars['Int']>,
  track?: Maybe<Scalars['Int']>,
  groupSpeed?: Maybe<Scalars['Int']>,
  callsign?: Maybe<Scalars['String']>,
  altitude?: Maybe<Scalars['Int']>,
};

export type Dump1090MessageEdge = {
   __typename?: 'Dump1090MessageEdge',
  node: Dump1090Message,
  cursor: Scalars['String'],
};

export enum Dump1090MessageOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  MessageTypeAsc = 'messageType_ASC',
  MessageTypeDesc = 'messageType_DESC',
  TransmissionTypeAsc = 'transmissionType_ASC',
  TransmissionTypeDesc = 'transmissionType_DESC',
  GeneratedAsc = 'generated_ASC',
  GeneratedDesc = 'generated_DESC',
  LoggedAsc = 'logged_ASC',
  LoggedDesc = 'logged_DESC',
  FlightIdAsc = 'flightId_ASC',
  FlightIdDesc = 'flightId_DESC',
  SquawkAsc = 'squawk_ASC',
  SquawkDesc = 'squawk_DESC',
  AlertAsc = 'alert_ASC',
  AlertDesc = 'alert_DESC',
  EmergencyAsc = 'emergency_ASC',
  EmergencyDesc = 'emergency_DESC',
  IsOnGroundAsc = 'isOnGround_ASC',
  IsOnGroundDesc = 'isOnGround_DESC',
  LatitudeAsc = 'latitude_ASC',
  LatitudeDesc = 'latitude_DESC',
  LongitudeAsc = 'longitude_ASC',
  LongitudeDesc = 'longitude_DESC',
  VerticalRateAsc = 'verticalRate_ASC',
  VerticalRateDesc = 'verticalRate_DESC',
  TrackAsc = 'track_ASC',
  TrackDesc = 'track_DESC',
  GroupSpeedAsc = 'groupSpeed_ASC',
  GroupSpeedDesc = 'groupSpeed_DESC',
  CallsignAsc = 'callsign_ASC',
  CallsignDesc = 'callsign_DESC',
  AltitudeAsc = 'altitude_ASC',
  AltitudeDesc = 'altitude_DESC'
}

export type Dump1090MessagePreviousValues = {
   __typename?: 'Dump1090MessagePreviousValues',
  id: Scalars['ID'],
  messageType: Dump1090MessageType,
  transmissionType: Dump1090TransmissionType,
  generated: Scalars['DateTime'],
  logged: Scalars['DateTime'],
  flightId?: Maybe<Scalars['String']>,
  squawk?: Maybe<Scalars['String']>,
  alert?: Maybe<Scalars['Boolean']>,
  emergency?: Maybe<Scalars['Boolean']>,
  isOnGround?: Maybe<Scalars['Boolean']>,
  latitude?: Maybe<Scalars['Float']>,
  longitude?: Maybe<Scalars['Float']>,
  verticalRate?: Maybe<Scalars['Int']>,
  track?: Maybe<Scalars['Int']>,
  groupSpeed?: Maybe<Scalars['Int']>,
  callsign?: Maybe<Scalars['String']>,
  altitude?: Maybe<Scalars['Int']>,
};

export type Dump1090MessageSubscriptionPayload = {
   __typename?: 'Dump1090MessageSubscriptionPayload',
  mutation: MutationType,
  node?: Maybe<Dump1090Message>,
  updatedFields?: Maybe<Array<Scalars['String']>>,
  previousValues?: Maybe<Dump1090MessagePreviousValues>,
};

export type Dump1090MessageSubscriptionWhereInput = {
  mutation_in?: Maybe<Array<MutationType>>,
  updatedFields_contains?: Maybe<Scalars['String']>,
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>,
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>,
  node?: Maybe<Dump1090MessageWhereInput>,
  AND?: Maybe<Array<Dump1090MessageSubscriptionWhereInput>>,
  OR?: Maybe<Array<Dump1090MessageSubscriptionWhereInput>>,
  NOT?: Maybe<Array<Dump1090MessageSubscriptionWhereInput>>,
};

export enum Dump1090MessageType {
  SelectionChange = 'SELECTION_CHANGE',
  NewId = 'NEW_ID',
  NewAircraft = 'NEW_AIRCRAFT',
  StatusAircraft = 'STATUS_AIRCRAFT',
  Click = 'CLICK',
  Transmission = 'TRANSMISSION'
}

export type Dump1090MessageUpdateInput = {
  messageType?: Maybe<Dump1090MessageType>,
  transmissionType?: Maybe<Dump1090TransmissionType>,
  aircraft?: Maybe<Dump1090AircraftUpdateOneInput>,
  generated?: Maybe<Scalars['DateTime']>,
  logged?: Maybe<Scalars['DateTime']>,
  flightId?: Maybe<Scalars['String']>,
  squawk?: Maybe<Scalars['String']>,
  alert?: Maybe<Scalars['Boolean']>,
  emergency?: Maybe<Scalars['Boolean']>,
  isOnGround?: Maybe<Scalars['Boolean']>,
  latitude?: Maybe<Scalars['Float']>,
  longitude?: Maybe<Scalars['Float']>,
  verticalRate?: Maybe<Scalars['Int']>,
  track?: Maybe<Scalars['Int']>,
  groupSpeed?: Maybe<Scalars['Int']>,
  callsign?: Maybe<Scalars['String']>,
  altitude?: Maybe<Scalars['Int']>,
};

export type Dump1090MessageUpdateManyMutationInput = {
  messageType?: Maybe<Dump1090MessageType>,
  transmissionType?: Maybe<Dump1090TransmissionType>,
  generated?: Maybe<Scalars['DateTime']>,
  logged?: Maybe<Scalars['DateTime']>,
  flightId?: Maybe<Scalars['String']>,
  squawk?: Maybe<Scalars['String']>,
  alert?: Maybe<Scalars['Boolean']>,
  emergency?: Maybe<Scalars['Boolean']>,
  isOnGround?: Maybe<Scalars['Boolean']>,
  latitude?: Maybe<Scalars['Float']>,
  longitude?: Maybe<Scalars['Float']>,
  verticalRate?: Maybe<Scalars['Int']>,
  track?: Maybe<Scalars['Int']>,
  groupSpeed?: Maybe<Scalars['Int']>,
  callsign?: Maybe<Scalars['String']>,
  altitude?: Maybe<Scalars['Int']>,
};

export type Dump1090MessageWhereInput = {
  id?: Maybe<Scalars['ID']>,
  id_not?: Maybe<Scalars['ID']>,
  id_in?: Maybe<Array<Scalars['ID']>>,
  id_not_in?: Maybe<Array<Scalars['ID']>>,
  id_lt?: Maybe<Scalars['ID']>,
  id_lte?: Maybe<Scalars['ID']>,
  id_gt?: Maybe<Scalars['ID']>,
  id_gte?: Maybe<Scalars['ID']>,
  id_contains?: Maybe<Scalars['ID']>,
  id_not_contains?: Maybe<Scalars['ID']>,
  id_starts_with?: Maybe<Scalars['ID']>,
  id_not_starts_with?: Maybe<Scalars['ID']>,
  id_ends_with?: Maybe<Scalars['ID']>,
  id_not_ends_with?: Maybe<Scalars['ID']>,
  messageType?: Maybe<Dump1090MessageType>,
  messageType_not?: Maybe<Dump1090MessageType>,
  messageType_in?: Maybe<Array<Dump1090MessageType>>,
  messageType_not_in?: Maybe<Array<Dump1090MessageType>>,
  transmissionType?: Maybe<Dump1090TransmissionType>,
  transmissionType_not?: Maybe<Dump1090TransmissionType>,
  transmissionType_in?: Maybe<Array<Dump1090TransmissionType>>,
  transmissionType_not_in?: Maybe<Array<Dump1090TransmissionType>>,
  aircraft?: Maybe<Dump1090AircraftWhereInput>,
  generated?: Maybe<Scalars['DateTime']>,
  generated_not?: Maybe<Scalars['DateTime']>,
  generated_in?: Maybe<Array<Scalars['DateTime']>>,
  generated_not_in?: Maybe<Array<Scalars['DateTime']>>,
  generated_lt?: Maybe<Scalars['DateTime']>,
  generated_lte?: Maybe<Scalars['DateTime']>,
  generated_gt?: Maybe<Scalars['DateTime']>,
  generated_gte?: Maybe<Scalars['DateTime']>,
  logged?: Maybe<Scalars['DateTime']>,
  logged_not?: Maybe<Scalars['DateTime']>,
  logged_in?: Maybe<Array<Scalars['DateTime']>>,
  logged_not_in?: Maybe<Array<Scalars['DateTime']>>,
  logged_lt?: Maybe<Scalars['DateTime']>,
  logged_lte?: Maybe<Scalars['DateTime']>,
  logged_gt?: Maybe<Scalars['DateTime']>,
  logged_gte?: Maybe<Scalars['DateTime']>,
  flightId?: Maybe<Scalars['String']>,
  flightId_not?: Maybe<Scalars['String']>,
  flightId_in?: Maybe<Array<Scalars['String']>>,
  flightId_not_in?: Maybe<Array<Scalars['String']>>,
  flightId_lt?: Maybe<Scalars['String']>,
  flightId_lte?: Maybe<Scalars['String']>,
  flightId_gt?: Maybe<Scalars['String']>,
  flightId_gte?: Maybe<Scalars['String']>,
  flightId_contains?: Maybe<Scalars['String']>,
  flightId_not_contains?: Maybe<Scalars['String']>,
  flightId_starts_with?: Maybe<Scalars['String']>,
  flightId_not_starts_with?: Maybe<Scalars['String']>,
  flightId_ends_with?: Maybe<Scalars['String']>,
  flightId_not_ends_with?: Maybe<Scalars['String']>,
  squawk?: Maybe<Scalars['String']>,
  squawk_not?: Maybe<Scalars['String']>,
  squawk_in?: Maybe<Array<Scalars['String']>>,
  squawk_not_in?: Maybe<Array<Scalars['String']>>,
  squawk_lt?: Maybe<Scalars['String']>,
  squawk_lte?: Maybe<Scalars['String']>,
  squawk_gt?: Maybe<Scalars['String']>,
  squawk_gte?: Maybe<Scalars['String']>,
  squawk_contains?: Maybe<Scalars['String']>,
  squawk_not_contains?: Maybe<Scalars['String']>,
  squawk_starts_with?: Maybe<Scalars['String']>,
  squawk_not_starts_with?: Maybe<Scalars['String']>,
  squawk_ends_with?: Maybe<Scalars['String']>,
  squawk_not_ends_with?: Maybe<Scalars['String']>,
  alert?: Maybe<Scalars['Boolean']>,
  alert_not?: Maybe<Scalars['Boolean']>,
  emergency?: Maybe<Scalars['Boolean']>,
  emergency_not?: Maybe<Scalars['Boolean']>,
  isOnGround?: Maybe<Scalars['Boolean']>,
  isOnGround_not?: Maybe<Scalars['Boolean']>,
  latitude?: Maybe<Scalars['Float']>,
  latitude_not?: Maybe<Scalars['Float']>,
  latitude_in?: Maybe<Array<Scalars['Float']>>,
  latitude_not_in?: Maybe<Array<Scalars['Float']>>,
  latitude_lt?: Maybe<Scalars['Float']>,
  latitude_lte?: Maybe<Scalars['Float']>,
  latitude_gt?: Maybe<Scalars['Float']>,
  latitude_gte?: Maybe<Scalars['Float']>,
  longitude?: Maybe<Scalars['Float']>,
  longitude_not?: Maybe<Scalars['Float']>,
  longitude_in?: Maybe<Array<Scalars['Float']>>,
  longitude_not_in?: Maybe<Array<Scalars['Float']>>,
  longitude_lt?: Maybe<Scalars['Float']>,
  longitude_lte?: Maybe<Scalars['Float']>,
  longitude_gt?: Maybe<Scalars['Float']>,
  longitude_gte?: Maybe<Scalars['Float']>,
  verticalRate?: Maybe<Scalars['Int']>,
  verticalRate_not?: Maybe<Scalars['Int']>,
  verticalRate_in?: Maybe<Array<Scalars['Int']>>,
  verticalRate_not_in?: Maybe<Array<Scalars['Int']>>,
  verticalRate_lt?: Maybe<Scalars['Int']>,
  verticalRate_lte?: Maybe<Scalars['Int']>,
  verticalRate_gt?: Maybe<Scalars['Int']>,
  verticalRate_gte?: Maybe<Scalars['Int']>,
  track?: Maybe<Scalars['Int']>,
  track_not?: Maybe<Scalars['Int']>,
  track_in?: Maybe<Array<Scalars['Int']>>,
  track_not_in?: Maybe<Array<Scalars['Int']>>,
  track_lt?: Maybe<Scalars['Int']>,
  track_lte?: Maybe<Scalars['Int']>,
  track_gt?: Maybe<Scalars['Int']>,
  track_gte?: Maybe<Scalars['Int']>,
  groupSpeed?: Maybe<Scalars['Int']>,
  groupSpeed_not?: Maybe<Scalars['Int']>,
  groupSpeed_in?: Maybe<Array<Scalars['Int']>>,
  groupSpeed_not_in?: Maybe<Array<Scalars['Int']>>,
  groupSpeed_lt?: Maybe<Scalars['Int']>,
  groupSpeed_lte?: Maybe<Scalars['Int']>,
  groupSpeed_gt?: Maybe<Scalars['Int']>,
  groupSpeed_gte?: Maybe<Scalars['Int']>,
  callsign?: Maybe<Scalars['String']>,
  callsign_not?: Maybe<Scalars['String']>,
  callsign_in?: Maybe<Array<Scalars['String']>>,
  callsign_not_in?: Maybe<Array<Scalars['String']>>,
  callsign_lt?: Maybe<Scalars['String']>,
  callsign_lte?: Maybe<Scalars['String']>,
  callsign_gt?: Maybe<Scalars['String']>,
  callsign_gte?: Maybe<Scalars['String']>,
  callsign_contains?: Maybe<Scalars['String']>,
  callsign_not_contains?: Maybe<Scalars['String']>,
  callsign_starts_with?: Maybe<Scalars['String']>,
  callsign_not_starts_with?: Maybe<Scalars['String']>,
  callsign_ends_with?: Maybe<Scalars['String']>,
  callsign_not_ends_with?: Maybe<Scalars['String']>,
  altitude?: Maybe<Scalars['Int']>,
  altitude_not?: Maybe<Scalars['Int']>,
  altitude_in?: Maybe<Array<Scalars['Int']>>,
  altitude_not_in?: Maybe<Array<Scalars['Int']>>,
  altitude_lt?: Maybe<Scalars['Int']>,
  altitude_lte?: Maybe<Scalars['Int']>,
  altitude_gt?: Maybe<Scalars['Int']>,
  altitude_gte?: Maybe<Scalars['Int']>,
  AND?: Maybe<Array<Dump1090MessageWhereInput>>,
  OR?: Maybe<Array<Dump1090MessageWhereInput>>,
  NOT?: Maybe<Array<Dump1090MessageWhereInput>>,
};

export type Dump1090MessageWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>,
};

export enum Dump1090TransmissionType {
  EsIdentAndCategory = 'ES_IDENT_AND_CATEGORY',
  EsSurfacePos = 'ES_SURFACE_POS',
  EsAirbornePos = 'ES_AIRBORNE_POS',
  EsAirborneVel = 'ES_AIRBORNE_VEL',
  SurveillanceAlt = 'SURVEILLANCE_ALT',
  SurveillanceId = 'SURVEILLANCE_ID',
  AirToAir = 'AIR_TO_AIR',
  AllCallReply = 'ALL_CALL_REPLY'
}

export type LoginResponse = {
   __typename?: 'LoginResponse',
  token?: Maybe<Scalars['String']>,
  user?: Maybe<User>,
};


export type Mutation = {
   __typename?: 'Mutation',
  createTrunkedSystem: TrunkedSystem,
  register: User,
  login: LoginResponse,
  upsertBaseTrunkedSystem: BaseTrunkedSystem,
  createBaseTrunkedSystem: BaseTrunkedSystem,
  updateBaseTrunkedSystem?: Maybe<BaseTrunkedSystem>,
  updateManyBaseTrunkedSystems: BatchPayload,
  deleteBaseTrunkedSystem?: Maybe<BaseTrunkedSystem>,
  deleteManyBaseTrunkedSystems: BatchPayload,
  createDump1090Aircraft: Dump1090Aircraft,
  updateDump1090Aircraft?: Maybe<Dump1090Aircraft>,
  updateManyDump1090Aircrafts: BatchPayload,
  upsertDump1090Aircraft: Dump1090Aircraft,
  deleteDump1090Aircraft?: Maybe<Dump1090Aircraft>,
  deleteManyDump1090Aircrafts: BatchPayload,
  createDump1090Message: Dump1090Message,
  updateDump1090Message?: Maybe<Dump1090Message>,
  updateManyDump1090Messages: BatchPayload,
  upsertDump1090Message: Dump1090Message,
  deleteDump1090Message?: Maybe<Dump1090Message>,
  deleteManyDump1090Messages: BatchPayload,
  createSiteFrequency: SiteFrequency,
  updateSiteFrequency?: Maybe<SiteFrequency>,
  updateManySiteFrequencies: BatchPayload,
  upsertSiteFrequency: SiteFrequency,
  deleteSiteFrequency?: Maybe<SiteFrequency>,
  deleteManySiteFrequencies: BatchPayload,
  createSystemSite: SystemSite,
  updateSystemSite?: Maybe<SystemSite>,
  updateManySystemSites: BatchPayload,
  upsertSystemSite: SystemSite,
  deleteSystemSite?: Maybe<SystemSite>,
  deleteManySystemSites: BatchPayload,
  createTranscription: Transcription,
  updateTranscription?: Maybe<Transcription>,
  updateManyTranscriptions: BatchPayload,
  upsertTranscription: Transcription,
  deleteTranscription?: Maybe<Transcription>,
  deleteManyTranscriptions: BatchPayload,
  createTranscriptionWord: TranscriptionWord,
  updateTranscriptionWord?: Maybe<TranscriptionWord>,
  updateManyTranscriptionWords: BatchPayload,
  upsertTranscriptionWord: TranscriptionWord,
  deleteTranscriptionWord?: Maybe<TranscriptionWord>,
  deleteManyTranscriptionWords: BatchPayload,
  createTrunkedCall: TrunkedCall,
  updateTrunkedCall?: Maybe<TrunkedCall>,
  updateManyTrunkedCalls: BatchPayload,
  upsertTrunkedCall: TrunkedCall,
  deleteTrunkedCall?: Maybe<TrunkedCall>,
  deleteManyTrunkedCalls: BatchPayload,
  createTrunkedCallFrequencyTime: TrunkedCallFrequencyTime,
  updateTrunkedCallFrequencyTime?: Maybe<TrunkedCallFrequencyTime>,
  updateManyTrunkedCallFrequencyTimes: BatchPayload,
  upsertTrunkedCallFrequencyTime: TrunkedCallFrequencyTime,
  deleteTrunkedCallFrequencyTime?: Maybe<TrunkedCallFrequencyTime>,
  deleteManyTrunkedCallFrequencyTimes: BatchPayload,
  createTrunkedCallSource: TrunkedCallSource,
  updateTrunkedCallSource?: Maybe<TrunkedCallSource>,
  updateManyTrunkedCallSources: BatchPayload,
  upsertTrunkedCallSource: TrunkedCallSource,
  deleteTrunkedCallSource?: Maybe<TrunkedCallSource>,
  deleteManyTrunkedCallSources: BatchPayload,
  createTrunkedConfig: TrunkedConfig,
  updateTrunkedConfig?: Maybe<TrunkedConfig>,
  updateManyTrunkedConfigs: BatchPayload,
  upsertTrunkedConfig: TrunkedConfig,
  deleteTrunkedConfig?: Maybe<TrunkedConfig>,
  deleteManyTrunkedConfigs: BatchPayload,
  createTrunkedSource: TrunkedSource,
  updateTrunkedSource?: Maybe<TrunkedSource>,
  updateManyTrunkedSources: BatchPayload,
  upsertTrunkedSource: TrunkedSource,
  deleteTrunkedSource?: Maybe<TrunkedSource>,
  deleteManyTrunkedSources: BatchPayload,
  updateTrunkedSystem?: Maybe<TrunkedSystem>,
  updateManyTrunkedSystems: BatchPayload,
  upsertTrunkedSystem: TrunkedSystem,
  deleteTrunkedSystem?: Maybe<TrunkedSystem>,
  deleteManyTrunkedSystems: BatchPayload,
  createTrunkedTalkgroup: TrunkedTalkgroup,
  updateTrunkedTalkgroup?: Maybe<TrunkedTalkgroup>,
  updateManyTrunkedTalkgroups: BatchPayload,
  upsertTrunkedTalkgroup: TrunkedTalkgroup,
  deleteTrunkedTalkgroup?: Maybe<TrunkedTalkgroup>,
  deleteManyTrunkedTalkgroups: BatchPayload,
  createUser: User,
  updateUser?: Maybe<User>,
  updateManyUsers: BatchPayload,
  upsertUser: User,
  deleteUser?: Maybe<User>,
  deleteManyUsers: BatchPayload,
};


export type MutationCreateTrunkedSystemArgs = {
  system?: Maybe<TrunkedSystemCreateInput>,
  data: TrunkedSystemCreateInput
};


export type MutationRegisterArgs = {
  email: Scalars['String'],
  password: Scalars['String'],
  phone: Scalars['String']
};


export type MutationLoginArgs = {
  username: Scalars['String'],
  password: Scalars['String']
};


export type MutationUpsertBaseTrunkedSystemArgs = {
  where: BaseTrunkedSystemWhereUniqueInput,
  create: BaseTrunkedSystemCreateInput,
  update: BaseTrunkedSystemUpdateInput
};


export type MutationCreateBaseTrunkedSystemArgs = {
  data: BaseTrunkedSystemCreateInput
};


export type MutationUpdateBaseTrunkedSystemArgs = {
  data: BaseTrunkedSystemUpdateInput,
  where: BaseTrunkedSystemWhereUniqueInput
};


export type MutationUpdateManyBaseTrunkedSystemsArgs = {
  data: BaseTrunkedSystemUpdateManyMutationInput,
  where?: Maybe<BaseTrunkedSystemWhereInput>
};


export type MutationDeleteBaseTrunkedSystemArgs = {
  where: BaseTrunkedSystemWhereUniqueInput
};


export type MutationDeleteManyBaseTrunkedSystemsArgs = {
  where?: Maybe<BaseTrunkedSystemWhereInput>
};


export type MutationCreateDump1090AircraftArgs = {
  data: Dump1090AircraftCreateInput
};


export type MutationUpdateDump1090AircraftArgs = {
  data: Dump1090AircraftUpdateInput,
  where: Dump1090AircraftWhereUniqueInput
};


export type MutationUpdateManyDump1090AircraftsArgs = {
  data: Dump1090AircraftUpdateManyMutationInput,
  where?: Maybe<Dump1090AircraftWhereInput>
};


export type MutationUpsertDump1090AircraftArgs = {
  where: Dump1090AircraftWhereUniqueInput,
  create: Dump1090AircraftCreateInput,
  update: Dump1090AircraftUpdateInput
};


export type MutationDeleteDump1090AircraftArgs = {
  where: Dump1090AircraftWhereUniqueInput
};


export type MutationDeleteManyDump1090AircraftsArgs = {
  where?: Maybe<Dump1090AircraftWhereInput>
};


export type MutationCreateDump1090MessageArgs = {
  data: Dump1090MessageCreateInput
};


export type MutationUpdateDump1090MessageArgs = {
  data: Dump1090MessageUpdateInput,
  where: Dump1090MessageWhereUniqueInput
};


export type MutationUpdateManyDump1090MessagesArgs = {
  data: Dump1090MessageUpdateManyMutationInput,
  where?: Maybe<Dump1090MessageWhereInput>
};


export type MutationUpsertDump1090MessageArgs = {
  where: Dump1090MessageWhereUniqueInput,
  create: Dump1090MessageCreateInput,
  update: Dump1090MessageUpdateInput
};


export type MutationDeleteDump1090MessageArgs = {
  where: Dump1090MessageWhereUniqueInput
};


export type MutationDeleteManyDump1090MessagesArgs = {
  where?: Maybe<Dump1090MessageWhereInput>
};


export type MutationCreateSiteFrequencyArgs = {
  data: SiteFrequencyCreateInput
};


export type MutationUpdateSiteFrequencyArgs = {
  data: SiteFrequencyUpdateInput,
  where: SiteFrequencyWhereUniqueInput
};


export type MutationUpdateManySiteFrequenciesArgs = {
  data: SiteFrequencyUpdateManyMutationInput,
  where?: Maybe<SiteFrequencyWhereInput>
};


export type MutationUpsertSiteFrequencyArgs = {
  where: SiteFrequencyWhereUniqueInput,
  create: SiteFrequencyCreateInput,
  update: SiteFrequencyUpdateInput
};


export type MutationDeleteSiteFrequencyArgs = {
  where: SiteFrequencyWhereUniqueInput
};


export type MutationDeleteManySiteFrequenciesArgs = {
  where?: Maybe<SiteFrequencyWhereInput>
};


export type MutationCreateSystemSiteArgs = {
  data: SystemSiteCreateInput
};


export type MutationUpdateSystemSiteArgs = {
  data: SystemSiteUpdateInput,
  where: SystemSiteWhereUniqueInput
};


export type MutationUpdateManySystemSitesArgs = {
  data: SystemSiteUpdateManyMutationInput,
  where?: Maybe<SystemSiteWhereInput>
};


export type MutationUpsertSystemSiteArgs = {
  where: SystemSiteWhereUniqueInput,
  create: SystemSiteCreateInput,
  update: SystemSiteUpdateInput
};


export type MutationDeleteSystemSiteArgs = {
  where: SystemSiteWhereUniqueInput
};


export type MutationDeleteManySystemSitesArgs = {
  where?: Maybe<SystemSiteWhereInput>
};


export type MutationCreateTranscriptionArgs = {
  data: TranscriptionCreateInput
};


export type MutationUpdateTranscriptionArgs = {
  data: TranscriptionUpdateInput,
  where: TranscriptionWhereUniqueInput
};


export type MutationUpdateManyTranscriptionsArgs = {
  data: TranscriptionUpdateManyMutationInput,
  where?: Maybe<TranscriptionWhereInput>
};


export type MutationUpsertTranscriptionArgs = {
  where: TranscriptionWhereUniqueInput,
  create: TranscriptionCreateInput,
  update: TranscriptionUpdateInput
};


export type MutationDeleteTranscriptionArgs = {
  where: TranscriptionWhereUniqueInput
};


export type MutationDeleteManyTranscriptionsArgs = {
  where?: Maybe<TranscriptionWhereInput>
};


export type MutationCreateTranscriptionWordArgs = {
  data: TranscriptionWordCreateInput
};


export type MutationUpdateTranscriptionWordArgs = {
  data: TranscriptionWordUpdateInput,
  where: TranscriptionWordWhereUniqueInput
};


export type MutationUpdateManyTranscriptionWordsArgs = {
  data: TranscriptionWordUpdateManyMutationInput,
  where?: Maybe<TranscriptionWordWhereInput>
};


export type MutationUpsertTranscriptionWordArgs = {
  where: TranscriptionWordWhereUniqueInput,
  create: TranscriptionWordCreateInput,
  update: TranscriptionWordUpdateInput
};


export type MutationDeleteTranscriptionWordArgs = {
  where: TranscriptionWordWhereUniqueInput
};


export type MutationDeleteManyTranscriptionWordsArgs = {
  where?: Maybe<TranscriptionWordWhereInput>
};


export type MutationCreateTrunkedCallArgs = {
  data: TrunkedCallCreateInput
};


export type MutationUpdateTrunkedCallArgs = {
  data: TrunkedCallUpdateInput,
  where: TrunkedCallWhereUniqueInput
};


export type MutationUpdateManyTrunkedCallsArgs = {
  data: TrunkedCallUpdateManyMutationInput,
  where?: Maybe<TrunkedCallWhereInput>
};


export type MutationUpsertTrunkedCallArgs = {
  where: TrunkedCallWhereUniqueInput,
  create: TrunkedCallCreateInput,
  update: TrunkedCallUpdateInput
};


export type MutationDeleteTrunkedCallArgs = {
  where: TrunkedCallWhereUniqueInput
};


export type MutationDeleteManyTrunkedCallsArgs = {
  where?: Maybe<TrunkedCallWhereInput>
};


export type MutationCreateTrunkedCallFrequencyTimeArgs = {
  data: TrunkedCallFrequencyTimeCreateInput
};


export type MutationUpdateTrunkedCallFrequencyTimeArgs = {
  data: TrunkedCallFrequencyTimeUpdateInput,
  where: TrunkedCallFrequencyTimeWhereUniqueInput
};


export type MutationUpdateManyTrunkedCallFrequencyTimesArgs = {
  data: TrunkedCallFrequencyTimeUpdateManyMutationInput,
  where?: Maybe<TrunkedCallFrequencyTimeWhereInput>
};


export type MutationUpsertTrunkedCallFrequencyTimeArgs = {
  where: TrunkedCallFrequencyTimeWhereUniqueInput,
  create: TrunkedCallFrequencyTimeCreateInput,
  update: TrunkedCallFrequencyTimeUpdateInput
};


export type MutationDeleteTrunkedCallFrequencyTimeArgs = {
  where: TrunkedCallFrequencyTimeWhereUniqueInput
};


export type MutationDeleteManyTrunkedCallFrequencyTimesArgs = {
  where?: Maybe<TrunkedCallFrequencyTimeWhereInput>
};


export type MutationCreateTrunkedCallSourceArgs = {
  data: TrunkedCallSourceCreateInput
};


export type MutationUpdateTrunkedCallSourceArgs = {
  data: TrunkedCallSourceUpdateInput,
  where: TrunkedCallSourceWhereUniqueInput
};


export type MutationUpdateManyTrunkedCallSourcesArgs = {
  data: TrunkedCallSourceUpdateManyMutationInput,
  where?: Maybe<TrunkedCallSourceWhereInput>
};


export type MutationUpsertTrunkedCallSourceArgs = {
  where: TrunkedCallSourceWhereUniqueInput,
  create: TrunkedCallSourceCreateInput,
  update: TrunkedCallSourceUpdateInput
};


export type MutationDeleteTrunkedCallSourceArgs = {
  where: TrunkedCallSourceWhereUniqueInput
};


export type MutationDeleteManyTrunkedCallSourcesArgs = {
  where?: Maybe<TrunkedCallSourceWhereInput>
};


export type MutationCreateTrunkedConfigArgs = {
  data: TrunkedConfigCreateInput
};


export type MutationUpdateTrunkedConfigArgs = {
  data: TrunkedConfigUpdateInput,
  where: TrunkedConfigWhereUniqueInput
};


export type MutationUpdateManyTrunkedConfigsArgs = {
  data: TrunkedConfigUpdateManyMutationInput,
  where?: Maybe<TrunkedConfigWhereInput>
};


export type MutationUpsertTrunkedConfigArgs = {
  where: TrunkedConfigWhereUniqueInput,
  create: TrunkedConfigCreateInput,
  update: TrunkedConfigUpdateInput
};


export type MutationDeleteTrunkedConfigArgs = {
  where: TrunkedConfigWhereUniqueInput
};


export type MutationDeleteManyTrunkedConfigsArgs = {
  where?: Maybe<TrunkedConfigWhereInput>
};


export type MutationCreateTrunkedSourceArgs = {
  data: TrunkedSourceCreateInput
};


export type MutationUpdateTrunkedSourceArgs = {
  data: TrunkedSourceUpdateInput,
  where: TrunkedSourceWhereUniqueInput
};


export type MutationUpdateManyTrunkedSourcesArgs = {
  data: TrunkedSourceUpdateManyMutationInput,
  where?: Maybe<TrunkedSourceWhereInput>
};


export type MutationUpsertTrunkedSourceArgs = {
  where: TrunkedSourceWhereUniqueInput,
  create: TrunkedSourceCreateInput,
  update: TrunkedSourceUpdateInput
};


export type MutationDeleteTrunkedSourceArgs = {
  where: TrunkedSourceWhereUniqueInput
};


export type MutationDeleteManyTrunkedSourcesArgs = {
  where?: Maybe<TrunkedSourceWhereInput>
};


export type MutationUpdateTrunkedSystemArgs = {
  data: TrunkedSystemUpdateInput,
  where: TrunkedSystemWhereUniqueInput
};


export type MutationUpdateManyTrunkedSystemsArgs = {
  data: TrunkedSystemUpdateManyMutationInput,
  where?: Maybe<TrunkedSystemWhereInput>
};


export type MutationUpsertTrunkedSystemArgs = {
  where: TrunkedSystemWhereUniqueInput,
  create: TrunkedSystemCreateInput,
  update: TrunkedSystemUpdateInput
};


export type MutationDeleteTrunkedSystemArgs = {
  where: TrunkedSystemWhereUniqueInput
};


export type MutationDeleteManyTrunkedSystemsArgs = {
  where?: Maybe<TrunkedSystemWhereInput>
};


export type MutationCreateTrunkedTalkgroupArgs = {
  data: TrunkedTalkgroupCreateInput
};


export type MutationUpdateTrunkedTalkgroupArgs = {
  data: TrunkedTalkgroupUpdateInput,
  where: TrunkedTalkgroupWhereUniqueInput
};


export type MutationUpdateManyTrunkedTalkgroupsArgs = {
  data: TrunkedTalkgroupUpdateManyMutationInput,
  where?: Maybe<TrunkedTalkgroupWhereInput>
};


export type MutationUpsertTrunkedTalkgroupArgs = {
  where: TrunkedTalkgroupWhereUniqueInput,
  create: TrunkedTalkgroupCreateInput,
  update: TrunkedTalkgroupUpdateInput
};


export type MutationDeleteTrunkedTalkgroupArgs = {
  where: TrunkedTalkgroupWhereUniqueInput
};


export type MutationDeleteManyTrunkedTalkgroupsArgs = {
  where?: Maybe<TrunkedTalkgroupWhereInput>
};


export type MutationCreateUserArgs = {
  data: UserCreateInput
};


export type MutationUpdateUserArgs = {
  data: UserUpdateInput,
  where: UserWhereUniqueInput
};


export type MutationUpdateManyUsersArgs = {
  data: UserUpdateManyMutationInput,
  where?: Maybe<UserWhereInput>
};


export type MutationUpsertUserArgs = {
  where: UserWhereUniqueInput,
  create: UserCreateInput,
  update: UserUpdateInput
};


export type MutationDeleteUserArgs = {
  where: UserWhereUniqueInput
};


export type MutationDeleteManyUsersArgs = {
  where?: Maybe<UserWhereInput>
};

export enum MutationType {
  Created = 'CREATED',
  Updated = 'UPDATED',
  Deleted = 'DELETED'
}

export type Node = {
  id: Scalars['ID'],
};

export type PageInfo = {
   __typename?: 'PageInfo',
  hasNextPage: Scalars['Boolean'],
  hasPreviousPage: Scalars['Boolean'],
  startCursor?: Maybe<Scalars['String']>,
  endCursor?: Maybe<Scalars['String']>,
};

export type Query = {
   __typename?: 'Query',
  trunkedCalls: Array<Maybe<TrunkedCall>>,
  trunkedSystems: Array<Maybe<TrunkedSystem>>,
  trunkedSystem?: Maybe<TrunkedSystem>,
  trunkedSystemStats?: Maybe<TrunkedSystemStats>,
  trunkedSystemsStats?: Maybe<Array<TrunkedSystemStats>>,
  currentUser: User,
  deviceRegistered: Scalars['Boolean'],
  sendAuthyVerification: Scalars['Boolean'],
  verifyAuthyToken?: Maybe<LoginResponse>,
  login?: Maybe<LoginResponse>,
  baseTrunkedSystem?: Maybe<BaseTrunkedSystem>,
  baseTrunkedSystems: Array<Maybe<BaseTrunkedSystem>>,
  baseTrunkedSystemsConnection: BaseTrunkedSystemConnection,
  dump1090Aircraft?: Maybe<Dump1090Aircraft>,
  dump1090Aircrafts: Array<Maybe<Dump1090Aircraft>>,
  dump1090AircraftsConnection: Dump1090AircraftConnection,
  dump1090Message?: Maybe<Dump1090Message>,
  dump1090Messages: Array<Maybe<Dump1090Message>>,
  dump1090MessagesConnection: Dump1090MessageConnection,
  siteFrequency?: Maybe<SiteFrequency>,
  siteFrequencies: Array<Maybe<SiteFrequency>>,
  siteFrequenciesConnection: SiteFrequencyConnection,
  systemSite?: Maybe<SystemSite>,
  systemSites: Array<Maybe<SystemSite>>,
  systemSitesConnection: SystemSiteConnection,
  transcription?: Maybe<Transcription>,
  transcriptions: Array<Maybe<Transcription>>,
  transcriptionsConnection: TranscriptionConnection,
  transcriptionWord?: Maybe<TranscriptionWord>,
  transcriptionWords: Array<Maybe<TranscriptionWord>>,
  transcriptionWordsConnection: TranscriptionWordConnection,
  trunkedCall?: Maybe<TrunkedCall>,
  trunkedCallsConnection: TrunkedCallConnection,
  trunkedCallFrequencyTime?: Maybe<TrunkedCallFrequencyTime>,
  trunkedCallFrequencyTimes: Array<Maybe<TrunkedCallFrequencyTime>>,
  trunkedCallFrequencyTimesConnection: TrunkedCallFrequencyTimeConnection,
  trunkedCallSource?: Maybe<TrunkedCallSource>,
  trunkedCallSources: Array<Maybe<TrunkedCallSource>>,
  trunkedCallSourcesConnection: TrunkedCallSourceConnection,
  trunkedConfig?: Maybe<TrunkedConfig>,
  trunkedConfigs: Array<Maybe<TrunkedConfig>>,
  trunkedConfigsConnection: TrunkedConfigConnection,
  trunkedSource?: Maybe<TrunkedSource>,
  trunkedSources: Array<Maybe<TrunkedSource>>,
  trunkedSourcesConnection: TrunkedSourceConnection,
  trunkedSystemsConnection: TrunkedSystemConnection,
  trunkedTalkgroup?: Maybe<TrunkedTalkgroup>,
  trunkedTalkgroups: Array<Maybe<TrunkedTalkgroup>>,
  trunkedTalkgroupsConnection: TrunkedTalkgroupConnection,
  user?: Maybe<User>,
  users: Array<Maybe<User>>,
  usersConnection: UserConnection,
  node?: Maybe<Node>,
};


export type QueryTrunkedCallsArgs = {
  where?: Maybe<TrunkedCallWhereInput>,
  orderBy?: Maybe<TrunkedCallOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryTrunkedSystemsArgs = {
  where?: Maybe<TrunkedSystemWhereInput>,
  orderBy?: Maybe<TrunkedSystemOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryTrunkedSystemArgs = {
  where: TrunkedSystemWhereUniqueInput
};


export type QueryTrunkedSystemStatsArgs = {
  where: TrunkedSystemWhereUniqueInput
};


export type QuerySendAuthyVerificationArgs = {
  user: UserWhereUniqueInput
};


export type QueryVerifyAuthyTokenArgs = {
  user: UserWhereUniqueInput,
  token: Scalars['String']
};


export type QueryLoginArgs = {
  user: UserWhereUniqueInput,
  password: Scalars['String']
};


export type QueryBaseTrunkedSystemArgs = {
  where: BaseTrunkedSystemWhereUniqueInput
};


export type QueryBaseTrunkedSystemsArgs = {
  where?: Maybe<BaseTrunkedSystemWhereInput>,
  orderBy?: Maybe<BaseTrunkedSystemOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryBaseTrunkedSystemsConnectionArgs = {
  where?: Maybe<BaseTrunkedSystemWhereInput>,
  orderBy?: Maybe<BaseTrunkedSystemOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryDump1090AircraftArgs = {
  where: Dump1090AircraftWhereUniqueInput
};


export type QueryDump1090AircraftsArgs = {
  where?: Maybe<Dump1090AircraftWhereInput>,
  orderBy?: Maybe<Dump1090AircraftOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryDump1090AircraftsConnectionArgs = {
  where?: Maybe<Dump1090AircraftWhereInput>,
  orderBy?: Maybe<Dump1090AircraftOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryDump1090MessageArgs = {
  where: Dump1090MessageWhereUniqueInput
};


export type QueryDump1090MessagesArgs = {
  where?: Maybe<Dump1090MessageWhereInput>,
  orderBy?: Maybe<Dump1090MessageOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryDump1090MessagesConnectionArgs = {
  where?: Maybe<Dump1090MessageWhereInput>,
  orderBy?: Maybe<Dump1090MessageOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QuerySiteFrequencyArgs = {
  where: SiteFrequencyWhereUniqueInput
};


export type QuerySiteFrequenciesArgs = {
  where?: Maybe<SiteFrequencyWhereInput>,
  orderBy?: Maybe<SiteFrequencyOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QuerySiteFrequenciesConnectionArgs = {
  where?: Maybe<SiteFrequencyWhereInput>,
  orderBy?: Maybe<SiteFrequencyOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QuerySystemSiteArgs = {
  where: SystemSiteWhereUniqueInput
};


export type QuerySystemSitesArgs = {
  where?: Maybe<SystemSiteWhereInput>,
  orderBy?: Maybe<SystemSiteOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QuerySystemSitesConnectionArgs = {
  where?: Maybe<SystemSiteWhereInput>,
  orderBy?: Maybe<SystemSiteOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryTranscriptionArgs = {
  where: TranscriptionWhereUniqueInput
};


export type QueryTranscriptionsArgs = {
  where?: Maybe<TranscriptionWhereInput>,
  orderBy?: Maybe<TranscriptionOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryTranscriptionsConnectionArgs = {
  where?: Maybe<TranscriptionWhereInput>,
  orderBy?: Maybe<TranscriptionOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryTranscriptionWordArgs = {
  where: TranscriptionWordWhereUniqueInput
};


export type QueryTranscriptionWordsArgs = {
  where?: Maybe<TranscriptionWordWhereInput>,
  orderBy?: Maybe<TranscriptionWordOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryTranscriptionWordsConnectionArgs = {
  where?: Maybe<TranscriptionWordWhereInput>,
  orderBy?: Maybe<TranscriptionWordOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryTrunkedCallArgs = {
  where: TrunkedCallWhereUniqueInput
};


export type QueryTrunkedCallsConnectionArgs = {
  where?: Maybe<TrunkedCallWhereInput>,
  orderBy?: Maybe<TrunkedCallOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryTrunkedCallFrequencyTimeArgs = {
  where: TrunkedCallFrequencyTimeWhereUniqueInput
};


export type QueryTrunkedCallFrequencyTimesArgs = {
  where?: Maybe<TrunkedCallFrequencyTimeWhereInput>,
  orderBy?: Maybe<TrunkedCallFrequencyTimeOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryTrunkedCallFrequencyTimesConnectionArgs = {
  where?: Maybe<TrunkedCallFrequencyTimeWhereInput>,
  orderBy?: Maybe<TrunkedCallFrequencyTimeOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryTrunkedCallSourceArgs = {
  where: TrunkedCallSourceWhereUniqueInput
};


export type QueryTrunkedCallSourcesArgs = {
  where?: Maybe<TrunkedCallSourceWhereInput>,
  orderBy?: Maybe<TrunkedCallSourceOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryTrunkedCallSourcesConnectionArgs = {
  where?: Maybe<TrunkedCallSourceWhereInput>,
  orderBy?: Maybe<TrunkedCallSourceOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryTrunkedConfigArgs = {
  where: TrunkedConfigWhereUniqueInput
};


export type QueryTrunkedConfigsArgs = {
  where?: Maybe<TrunkedConfigWhereInput>,
  orderBy?: Maybe<TrunkedConfigOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryTrunkedConfigsConnectionArgs = {
  where?: Maybe<TrunkedConfigWhereInput>,
  orderBy?: Maybe<TrunkedConfigOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryTrunkedSourceArgs = {
  where: TrunkedSourceWhereUniqueInput
};


export type QueryTrunkedSourcesArgs = {
  where?: Maybe<TrunkedSourceWhereInput>,
  orderBy?: Maybe<TrunkedSourceOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryTrunkedSourcesConnectionArgs = {
  where?: Maybe<TrunkedSourceWhereInput>,
  orderBy?: Maybe<TrunkedSourceOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryTrunkedSystemsConnectionArgs = {
  where?: Maybe<TrunkedSystemWhereInput>,
  orderBy?: Maybe<TrunkedSystemOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryTrunkedTalkgroupArgs = {
  where: TrunkedTalkgroupWhereUniqueInput
};


export type QueryTrunkedTalkgroupsArgs = {
  where?: Maybe<TrunkedTalkgroupWhereInput>,
  orderBy?: Maybe<TrunkedTalkgroupOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryTrunkedTalkgroupsConnectionArgs = {
  where?: Maybe<TrunkedTalkgroupWhereInput>,
  orderBy?: Maybe<TrunkedTalkgroupOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput
};


export type QueryUsersArgs = {
  where?: Maybe<UserWhereInput>,
  orderBy?: Maybe<UserOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryUsersConnectionArgs = {
  where?: Maybe<UserWhereInput>,
  orderBy?: Maybe<UserOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryNodeArgs = {
  id: Scalars['ID']
};

export enum SiteControl {
  Alternate = 'ALTERNATE',
  Primary = 'PRIMARY',
  None = 'NONE'
}

export type SiteFrequency = {
   __typename?: 'SiteFrequency',
  id: Scalars['ID'],
  control: SiteControl,
  frequency: Scalars['Float'],
};

export type SiteFrequencyConnection = {
   __typename?: 'SiteFrequencyConnection',
  pageInfo: PageInfo,
  edges: Array<Maybe<SiteFrequencyEdge>>,
  aggregate: AggregateSiteFrequency,
};

export type SiteFrequencyCreateInput = {
  id?: Maybe<Scalars['ID']>,
  control: SiteControl,
  frequency: Scalars['Float'],
};

export type SiteFrequencyCreateManyInput = {
  create?: Maybe<Array<SiteFrequencyCreateInput>>,
  connect?: Maybe<Array<SiteFrequencyWhereUniqueInput>>,
};

export type SiteFrequencyEdge = {
   __typename?: 'SiteFrequencyEdge',
  node: SiteFrequency,
  cursor: Scalars['String'],
};

export enum SiteFrequencyOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  ControlAsc = 'control_ASC',
  ControlDesc = 'control_DESC',
  FrequencyAsc = 'frequency_ASC',
  FrequencyDesc = 'frequency_DESC'
}

export type SiteFrequencyPreviousValues = {
   __typename?: 'SiteFrequencyPreviousValues',
  id: Scalars['ID'],
  control: SiteControl,
  frequency: Scalars['Float'],
};

export type SiteFrequencyScalarWhereInput = {
  id?: Maybe<Scalars['ID']>,
  id_not?: Maybe<Scalars['ID']>,
  id_in?: Maybe<Array<Scalars['ID']>>,
  id_not_in?: Maybe<Array<Scalars['ID']>>,
  id_lt?: Maybe<Scalars['ID']>,
  id_lte?: Maybe<Scalars['ID']>,
  id_gt?: Maybe<Scalars['ID']>,
  id_gte?: Maybe<Scalars['ID']>,
  id_contains?: Maybe<Scalars['ID']>,
  id_not_contains?: Maybe<Scalars['ID']>,
  id_starts_with?: Maybe<Scalars['ID']>,
  id_not_starts_with?: Maybe<Scalars['ID']>,
  id_ends_with?: Maybe<Scalars['ID']>,
  id_not_ends_with?: Maybe<Scalars['ID']>,
  control?: Maybe<SiteControl>,
  control_not?: Maybe<SiteControl>,
  control_in?: Maybe<Array<SiteControl>>,
  control_not_in?: Maybe<Array<SiteControl>>,
  frequency?: Maybe<Scalars['Float']>,
  frequency_not?: Maybe<Scalars['Float']>,
  frequency_in?: Maybe<Array<Scalars['Float']>>,
  frequency_not_in?: Maybe<Array<Scalars['Float']>>,
  frequency_lt?: Maybe<Scalars['Float']>,
  frequency_lte?: Maybe<Scalars['Float']>,
  frequency_gt?: Maybe<Scalars['Float']>,
  frequency_gte?: Maybe<Scalars['Float']>,
  AND?: Maybe<Array<SiteFrequencyScalarWhereInput>>,
  OR?: Maybe<Array<SiteFrequencyScalarWhereInput>>,
  NOT?: Maybe<Array<SiteFrequencyScalarWhereInput>>,
};

export type SiteFrequencySubscriptionPayload = {
   __typename?: 'SiteFrequencySubscriptionPayload',
  mutation: MutationType,
  node?: Maybe<SiteFrequency>,
  updatedFields?: Maybe<Array<Scalars['String']>>,
  previousValues?: Maybe<SiteFrequencyPreviousValues>,
};

export type SiteFrequencySubscriptionWhereInput = {
  mutation_in?: Maybe<Array<MutationType>>,
  updatedFields_contains?: Maybe<Scalars['String']>,
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>,
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>,
  node?: Maybe<SiteFrequencyWhereInput>,
  AND?: Maybe<Array<SiteFrequencySubscriptionWhereInput>>,
  OR?: Maybe<Array<SiteFrequencySubscriptionWhereInput>>,
  NOT?: Maybe<Array<SiteFrequencySubscriptionWhereInput>>,
};

export type SiteFrequencyUpdateDataInput = {
  control?: Maybe<SiteControl>,
  frequency?: Maybe<Scalars['Float']>,
};

export type SiteFrequencyUpdateInput = {
  control?: Maybe<SiteControl>,
  frequency?: Maybe<Scalars['Float']>,
};

export type SiteFrequencyUpdateManyDataInput = {
  control?: Maybe<SiteControl>,
  frequency?: Maybe<Scalars['Float']>,
};

export type SiteFrequencyUpdateManyInput = {
  create?: Maybe<Array<SiteFrequencyCreateInput>>,
  update?: Maybe<Array<SiteFrequencyUpdateWithWhereUniqueNestedInput>>,
  upsert?: Maybe<Array<SiteFrequencyUpsertWithWhereUniqueNestedInput>>,
  delete?: Maybe<Array<SiteFrequencyWhereUniqueInput>>,
  connect?: Maybe<Array<SiteFrequencyWhereUniqueInput>>,
  set?: Maybe<Array<SiteFrequencyWhereUniqueInput>>,
  disconnect?: Maybe<Array<SiteFrequencyWhereUniqueInput>>,
  deleteMany?: Maybe<Array<SiteFrequencyScalarWhereInput>>,
  updateMany?: Maybe<Array<SiteFrequencyUpdateManyWithWhereNestedInput>>,
};

export type SiteFrequencyUpdateManyMutationInput = {
  control?: Maybe<SiteControl>,
  frequency?: Maybe<Scalars['Float']>,
};

export type SiteFrequencyUpdateManyWithWhereNestedInput = {
  where: SiteFrequencyScalarWhereInput,
  data: SiteFrequencyUpdateManyDataInput,
};

export type SiteFrequencyUpdateWithWhereUniqueNestedInput = {
  where: SiteFrequencyWhereUniqueInput,
  data: SiteFrequencyUpdateDataInput,
};

export type SiteFrequencyUpsertWithWhereUniqueNestedInput = {
  where: SiteFrequencyWhereUniqueInput,
  update: SiteFrequencyUpdateDataInput,
  create: SiteFrequencyCreateInput,
};

export type SiteFrequencyWhereInput = {
  id?: Maybe<Scalars['ID']>,
  id_not?: Maybe<Scalars['ID']>,
  id_in?: Maybe<Array<Scalars['ID']>>,
  id_not_in?: Maybe<Array<Scalars['ID']>>,
  id_lt?: Maybe<Scalars['ID']>,
  id_lte?: Maybe<Scalars['ID']>,
  id_gt?: Maybe<Scalars['ID']>,
  id_gte?: Maybe<Scalars['ID']>,
  id_contains?: Maybe<Scalars['ID']>,
  id_not_contains?: Maybe<Scalars['ID']>,
  id_starts_with?: Maybe<Scalars['ID']>,
  id_not_starts_with?: Maybe<Scalars['ID']>,
  id_ends_with?: Maybe<Scalars['ID']>,
  id_not_ends_with?: Maybe<Scalars['ID']>,
  control?: Maybe<SiteControl>,
  control_not?: Maybe<SiteControl>,
  control_in?: Maybe<Array<SiteControl>>,
  control_not_in?: Maybe<Array<SiteControl>>,
  frequency?: Maybe<Scalars['Float']>,
  frequency_not?: Maybe<Scalars['Float']>,
  frequency_in?: Maybe<Array<Scalars['Float']>>,
  frequency_not_in?: Maybe<Array<Scalars['Float']>>,
  frequency_lt?: Maybe<Scalars['Float']>,
  frequency_lte?: Maybe<Scalars['Float']>,
  frequency_gt?: Maybe<Scalars['Float']>,
  frequency_gte?: Maybe<Scalars['Float']>,
  AND?: Maybe<Array<SiteFrequencyWhereInput>>,
  OR?: Maybe<Array<SiteFrequencyWhereInput>>,
  NOT?: Maybe<Array<SiteFrequencyWhereInput>>,
};

export type SiteFrequencyWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>,
};

export type Subscription = {
   __typename?: 'Subscription',
  trunkedCalls?: Maybe<TrunkedCall>,
  transcriptions?: Maybe<Transcription>,
  baseTrunkedSystem?: Maybe<BaseTrunkedSystemSubscriptionPayload>,
  dump1090Aircraft?: Maybe<Dump1090AircraftSubscriptionPayload>,
  dump1090Message?: Maybe<Dump1090MessageSubscriptionPayload>,
  siteFrequency?: Maybe<SiteFrequencySubscriptionPayload>,
  systemSite?: Maybe<SystemSiteSubscriptionPayload>,
  transcription?: Maybe<TranscriptionSubscriptionPayload>,
  transcriptionWord?: Maybe<TranscriptionWordSubscriptionPayload>,
  trunkedCall?: Maybe<TrunkedCallSubscriptionPayload>,
  trunkedCallFrequencyTime?: Maybe<TrunkedCallFrequencyTimeSubscriptionPayload>,
  trunkedCallSource?: Maybe<TrunkedCallSourceSubscriptionPayload>,
  trunkedConfig?: Maybe<TrunkedConfigSubscriptionPayload>,
  trunkedSource?: Maybe<TrunkedSourceSubscriptionPayload>,
  trunkedSystem?: Maybe<TrunkedSystemSubscriptionPayload>,
  trunkedTalkgroup?: Maybe<TrunkedTalkgroupSubscriptionPayload>,
  user?: Maybe<UserSubscriptionPayload>,
};


export type SubscriptionBaseTrunkedSystemArgs = {
  where?: Maybe<BaseTrunkedSystemSubscriptionWhereInput>
};


export type SubscriptionDump1090AircraftArgs = {
  where?: Maybe<Dump1090AircraftSubscriptionWhereInput>
};


export type SubscriptionDump1090MessageArgs = {
  where?: Maybe<Dump1090MessageSubscriptionWhereInput>
};


export type SubscriptionSiteFrequencyArgs = {
  where?: Maybe<SiteFrequencySubscriptionWhereInput>
};


export type SubscriptionSystemSiteArgs = {
  where?: Maybe<SystemSiteSubscriptionWhereInput>
};


export type SubscriptionTranscriptionArgs = {
  where?: Maybe<TranscriptionSubscriptionWhereInput>
};


export type SubscriptionTranscriptionWordArgs = {
  where?: Maybe<TranscriptionWordSubscriptionWhereInput>
};


export type SubscriptionTrunkedCallArgs = {
  where?: Maybe<TrunkedCallSubscriptionWhereInput>
};


export type SubscriptionTrunkedCallFrequencyTimeArgs = {
  where?: Maybe<TrunkedCallFrequencyTimeSubscriptionWhereInput>
};


export type SubscriptionTrunkedCallSourceArgs = {
  where?: Maybe<TrunkedCallSourceSubscriptionWhereInput>
};


export type SubscriptionTrunkedConfigArgs = {
  where?: Maybe<TrunkedConfigSubscriptionWhereInput>
};


export type SubscriptionTrunkedSourceArgs = {
  where?: Maybe<TrunkedSourceSubscriptionWhereInput>
};


export type SubscriptionTrunkedSystemArgs = {
  where?: Maybe<TrunkedSystemSubscriptionWhereInput>
};


export type SubscriptionTrunkedTalkgroupArgs = {
  where?: Maybe<TrunkedTalkgroupSubscriptionWhereInput>
};


export type SubscriptionUserArgs = {
  where?: Maybe<UserSubscriptionWhereInput>
};

export type SystemSite = {
   __typename?: 'SystemSite',
  id: Scalars['ID'],
  frequencies?: Maybe<Array<SiteFrequency>>,
  siteCounty?: Maybe<Scalars['String']>,
  siteId: Scalars['String'],
  siteLink: Scalars['String'],
  siteName: Scalars['String'],
};


export type SystemSiteFrequenciesArgs = {
  where?: Maybe<SiteFrequencyWhereInput>,
  orderBy?: Maybe<SiteFrequencyOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};

export type SystemSiteConnection = {
   __typename?: 'SystemSiteConnection',
  pageInfo: PageInfo,
  edges: Array<Maybe<SystemSiteEdge>>,
  aggregate: AggregateSystemSite,
};

export type SystemSiteCreateInput = {
  id?: Maybe<Scalars['ID']>,
  frequencies?: Maybe<SiteFrequencyCreateManyInput>,
  siteCounty?: Maybe<Scalars['String']>,
  siteId: Scalars['String'],
  siteLink: Scalars['String'],
  siteName: Scalars['String'],
};

export type SystemSiteCreateManyInput = {
  create?: Maybe<Array<SystemSiteCreateInput>>,
  connect?: Maybe<Array<SystemSiteWhereUniqueInput>>,
};

export type SystemSiteEdge = {
   __typename?: 'SystemSiteEdge',
  node: SystemSite,
  cursor: Scalars['String'],
};

export enum SystemSiteOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  SiteCountyAsc = 'siteCounty_ASC',
  SiteCountyDesc = 'siteCounty_DESC',
  SiteIdAsc = 'siteId_ASC',
  SiteIdDesc = 'siteId_DESC',
  SiteLinkAsc = 'siteLink_ASC',
  SiteLinkDesc = 'siteLink_DESC',
  SiteNameAsc = 'siteName_ASC',
  SiteNameDesc = 'siteName_DESC'
}

export type SystemSitePreviousValues = {
   __typename?: 'SystemSitePreviousValues',
  id: Scalars['ID'],
  siteCounty?: Maybe<Scalars['String']>,
  siteId: Scalars['String'],
  siteLink: Scalars['String'],
  siteName: Scalars['String'],
};

export type SystemSiteScalarWhereInput = {
  id?: Maybe<Scalars['ID']>,
  id_not?: Maybe<Scalars['ID']>,
  id_in?: Maybe<Array<Scalars['ID']>>,
  id_not_in?: Maybe<Array<Scalars['ID']>>,
  id_lt?: Maybe<Scalars['ID']>,
  id_lte?: Maybe<Scalars['ID']>,
  id_gt?: Maybe<Scalars['ID']>,
  id_gte?: Maybe<Scalars['ID']>,
  id_contains?: Maybe<Scalars['ID']>,
  id_not_contains?: Maybe<Scalars['ID']>,
  id_starts_with?: Maybe<Scalars['ID']>,
  id_not_starts_with?: Maybe<Scalars['ID']>,
  id_ends_with?: Maybe<Scalars['ID']>,
  id_not_ends_with?: Maybe<Scalars['ID']>,
  siteCounty?: Maybe<Scalars['String']>,
  siteCounty_not?: Maybe<Scalars['String']>,
  siteCounty_in?: Maybe<Array<Scalars['String']>>,
  siteCounty_not_in?: Maybe<Array<Scalars['String']>>,
  siteCounty_lt?: Maybe<Scalars['String']>,
  siteCounty_lte?: Maybe<Scalars['String']>,
  siteCounty_gt?: Maybe<Scalars['String']>,
  siteCounty_gte?: Maybe<Scalars['String']>,
  siteCounty_contains?: Maybe<Scalars['String']>,
  siteCounty_not_contains?: Maybe<Scalars['String']>,
  siteCounty_starts_with?: Maybe<Scalars['String']>,
  siteCounty_not_starts_with?: Maybe<Scalars['String']>,
  siteCounty_ends_with?: Maybe<Scalars['String']>,
  siteCounty_not_ends_with?: Maybe<Scalars['String']>,
  siteId?: Maybe<Scalars['String']>,
  siteId_not?: Maybe<Scalars['String']>,
  siteId_in?: Maybe<Array<Scalars['String']>>,
  siteId_not_in?: Maybe<Array<Scalars['String']>>,
  siteId_lt?: Maybe<Scalars['String']>,
  siteId_lte?: Maybe<Scalars['String']>,
  siteId_gt?: Maybe<Scalars['String']>,
  siteId_gte?: Maybe<Scalars['String']>,
  siteId_contains?: Maybe<Scalars['String']>,
  siteId_not_contains?: Maybe<Scalars['String']>,
  siteId_starts_with?: Maybe<Scalars['String']>,
  siteId_not_starts_with?: Maybe<Scalars['String']>,
  siteId_ends_with?: Maybe<Scalars['String']>,
  siteId_not_ends_with?: Maybe<Scalars['String']>,
  siteLink?: Maybe<Scalars['String']>,
  siteLink_not?: Maybe<Scalars['String']>,
  siteLink_in?: Maybe<Array<Scalars['String']>>,
  siteLink_not_in?: Maybe<Array<Scalars['String']>>,
  siteLink_lt?: Maybe<Scalars['String']>,
  siteLink_lte?: Maybe<Scalars['String']>,
  siteLink_gt?: Maybe<Scalars['String']>,
  siteLink_gte?: Maybe<Scalars['String']>,
  siteLink_contains?: Maybe<Scalars['String']>,
  siteLink_not_contains?: Maybe<Scalars['String']>,
  siteLink_starts_with?: Maybe<Scalars['String']>,
  siteLink_not_starts_with?: Maybe<Scalars['String']>,
  siteLink_ends_with?: Maybe<Scalars['String']>,
  siteLink_not_ends_with?: Maybe<Scalars['String']>,
  siteName?: Maybe<Scalars['String']>,
  siteName_not?: Maybe<Scalars['String']>,
  siteName_in?: Maybe<Array<Scalars['String']>>,
  siteName_not_in?: Maybe<Array<Scalars['String']>>,
  siteName_lt?: Maybe<Scalars['String']>,
  siteName_lte?: Maybe<Scalars['String']>,
  siteName_gt?: Maybe<Scalars['String']>,
  siteName_gte?: Maybe<Scalars['String']>,
  siteName_contains?: Maybe<Scalars['String']>,
  siteName_not_contains?: Maybe<Scalars['String']>,
  siteName_starts_with?: Maybe<Scalars['String']>,
  siteName_not_starts_with?: Maybe<Scalars['String']>,
  siteName_ends_with?: Maybe<Scalars['String']>,
  siteName_not_ends_with?: Maybe<Scalars['String']>,
  AND?: Maybe<Array<SystemSiteScalarWhereInput>>,
  OR?: Maybe<Array<SystemSiteScalarWhereInput>>,
  NOT?: Maybe<Array<SystemSiteScalarWhereInput>>,
};

export type SystemSiteSubscriptionPayload = {
   __typename?: 'SystemSiteSubscriptionPayload',
  mutation: MutationType,
  node?: Maybe<SystemSite>,
  updatedFields?: Maybe<Array<Scalars['String']>>,
  previousValues?: Maybe<SystemSitePreviousValues>,
};

export type SystemSiteSubscriptionWhereInput = {
  mutation_in?: Maybe<Array<MutationType>>,
  updatedFields_contains?: Maybe<Scalars['String']>,
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>,
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>,
  node?: Maybe<SystemSiteWhereInput>,
  AND?: Maybe<Array<SystemSiteSubscriptionWhereInput>>,
  OR?: Maybe<Array<SystemSiteSubscriptionWhereInput>>,
  NOT?: Maybe<Array<SystemSiteSubscriptionWhereInput>>,
};

export type SystemSiteUpdateDataInput = {
  frequencies?: Maybe<SiteFrequencyUpdateManyInput>,
  siteCounty?: Maybe<Scalars['String']>,
  siteId?: Maybe<Scalars['String']>,
  siteLink?: Maybe<Scalars['String']>,
  siteName?: Maybe<Scalars['String']>,
};

export type SystemSiteUpdateInput = {
  frequencies?: Maybe<SiteFrequencyUpdateManyInput>,
  siteCounty?: Maybe<Scalars['String']>,
  siteId?: Maybe<Scalars['String']>,
  siteLink?: Maybe<Scalars['String']>,
  siteName?: Maybe<Scalars['String']>,
};

export type SystemSiteUpdateManyDataInput = {
  siteCounty?: Maybe<Scalars['String']>,
  siteId?: Maybe<Scalars['String']>,
  siteLink?: Maybe<Scalars['String']>,
  siteName?: Maybe<Scalars['String']>,
};

export type SystemSiteUpdateManyInput = {
  create?: Maybe<Array<SystemSiteCreateInput>>,
  update?: Maybe<Array<SystemSiteUpdateWithWhereUniqueNestedInput>>,
  upsert?: Maybe<Array<SystemSiteUpsertWithWhereUniqueNestedInput>>,
  delete?: Maybe<Array<SystemSiteWhereUniqueInput>>,
  connect?: Maybe<Array<SystemSiteWhereUniqueInput>>,
  set?: Maybe<Array<SystemSiteWhereUniqueInput>>,
  disconnect?: Maybe<Array<SystemSiteWhereUniqueInput>>,
  deleteMany?: Maybe<Array<SystemSiteScalarWhereInput>>,
  updateMany?: Maybe<Array<SystemSiteUpdateManyWithWhereNestedInput>>,
};

export type SystemSiteUpdateManyMutationInput = {
  siteCounty?: Maybe<Scalars['String']>,
  siteId?: Maybe<Scalars['String']>,
  siteLink?: Maybe<Scalars['String']>,
  siteName?: Maybe<Scalars['String']>,
};

export type SystemSiteUpdateManyWithWhereNestedInput = {
  where: SystemSiteScalarWhereInput,
  data: SystemSiteUpdateManyDataInput,
};

export type SystemSiteUpdateWithWhereUniqueNestedInput = {
  where: SystemSiteWhereUniqueInput,
  data: SystemSiteUpdateDataInput,
};

export type SystemSiteUpsertWithWhereUniqueNestedInput = {
  where: SystemSiteWhereUniqueInput,
  update: SystemSiteUpdateDataInput,
  create: SystemSiteCreateInput,
};

export type SystemSiteWhereInput = {
  id?: Maybe<Scalars['ID']>,
  id_not?: Maybe<Scalars['ID']>,
  id_in?: Maybe<Array<Scalars['ID']>>,
  id_not_in?: Maybe<Array<Scalars['ID']>>,
  id_lt?: Maybe<Scalars['ID']>,
  id_lte?: Maybe<Scalars['ID']>,
  id_gt?: Maybe<Scalars['ID']>,
  id_gte?: Maybe<Scalars['ID']>,
  id_contains?: Maybe<Scalars['ID']>,
  id_not_contains?: Maybe<Scalars['ID']>,
  id_starts_with?: Maybe<Scalars['ID']>,
  id_not_starts_with?: Maybe<Scalars['ID']>,
  id_ends_with?: Maybe<Scalars['ID']>,
  id_not_ends_with?: Maybe<Scalars['ID']>,
  frequencies_every?: Maybe<SiteFrequencyWhereInput>,
  frequencies_some?: Maybe<SiteFrequencyWhereInput>,
  frequencies_none?: Maybe<SiteFrequencyWhereInput>,
  siteCounty?: Maybe<Scalars['String']>,
  siteCounty_not?: Maybe<Scalars['String']>,
  siteCounty_in?: Maybe<Array<Scalars['String']>>,
  siteCounty_not_in?: Maybe<Array<Scalars['String']>>,
  siteCounty_lt?: Maybe<Scalars['String']>,
  siteCounty_lte?: Maybe<Scalars['String']>,
  siteCounty_gt?: Maybe<Scalars['String']>,
  siteCounty_gte?: Maybe<Scalars['String']>,
  siteCounty_contains?: Maybe<Scalars['String']>,
  siteCounty_not_contains?: Maybe<Scalars['String']>,
  siteCounty_starts_with?: Maybe<Scalars['String']>,
  siteCounty_not_starts_with?: Maybe<Scalars['String']>,
  siteCounty_ends_with?: Maybe<Scalars['String']>,
  siteCounty_not_ends_with?: Maybe<Scalars['String']>,
  siteId?: Maybe<Scalars['String']>,
  siteId_not?: Maybe<Scalars['String']>,
  siteId_in?: Maybe<Array<Scalars['String']>>,
  siteId_not_in?: Maybe<Array<Scalars['String']>>,
  siteId_lt?: Maybe<Scalars['String']>,
  siteId_lte?: Maybe<Scalars['String']>,
  siteId_gt?: Maybe<Scalars['String']>,
  siteId_gte?: Maybe<Scalars['String']>,
  siteId_contains?: Maybe<Scalars['String']>,
  siteId_not_contains?: Maybe<Scalars['String']>,
  siteId_starts_with?: Maybe<Scalars['String']>,
  siteId_not_starts_with?: Maybe<Scalars['String']>,
  siteId_ends_with?: Maybe<Scalars['String']>,
  siteId_not_ends_with?: Maybe<Scalars['String']>,
  siteLink?: Maybe<Scalars['String']>,
  siteLink_not?: Maybe<Scalars['String']>,
  siteLink_in?: Maybe<Array<Scalars['String']>>,
  siteLink_not_in?: Maybe<Array<Scalars['String']>>,
  siteLink_lt?: Maybe<Scalars['String']>,
  siteLink_lte?: Maybe<Scalars['String']>,
  siteLink_gt?: Maybe<Scalars['String']>,
  siteLink_gte?: Maybe<Scalars['String']>,
  siteLink_contains?: Maybe<Scalars['String']>,
  siteLink_not_contains?: Maybe<Scalars['String']>,
  siteLink_starts_with?: Maybe<Scalars['String']>,
  siteLink_not_starts_with?: Maybe<Scalars['String']>,
  siteLink_ends_with?: Maybe<Scalars['String']>,
  siteLink_not_ends_with?: Maybe<Scalars['String']>,
  siteName?: Maybe<Scalars['String']>,
  siteName_not?: Maybe<Scalars['String']>,
  siteName_in?: Maybe<Array<Scalars['String']>>,
  siteName_not_in?: Maybe<Array<Scalars['String']>>,
  siteName_lt?: Maybe<Scalars['String']>,
  siteName_lte?: Maybe<Scalars['String']>,
  siteName_gt?: Maybe<Scalars['String']>,
  siteName_gte?: Maybe<Scalars['String']>,
  siteName_contains?: Maybe<Scalars['String']>,
  siteName_not_contains?: Maybe<Scalars['String']>,
  siteName_starts_with?: Maybe<Scalars['String']>,
  siteName_not_starts_with?: Maybe<Scalars['String']>,
  siteName_ends_with?: Maybe<Scalars['String']>,
  siteName_not_ends_with?: Maybe<Scalars['String']>,
  AND?: Maybe<Array<SystemSiteWhereInput>>,
  OR?: Maybe<Array<SystemSiteWhereInput>>,
  NOT?: Maybe<Array<SystemSiteWhereInput>>,
};

export type SystemSiteWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>,
};

export type Transcription = {
   __typename?: 'Transcription',
  id: Scalars['ID'],
  updatedAt: Scalars['DateTime'],
  createdAt: Scalars['DateTime'],
  call: TrunkedCall,
  languageModel: Scalars['String'],
  beta: Scalars['Float'],
  body: Scalars['String'],
  words?: Maybe<Array<TranscriptionWord>>,
  duration: Scalars['Float'],
  alpha: Scalars['Float'],
};


export type TranscriptionWordsArgs = {
  where?: Maybe<TranscriptionWordWhereInput>,
  orderBy?: Maybe<TranscriptionWordOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};

export type TranscriptionConnection = {
   __typename?: 'TranscriptionConnection',
  pageInfo: PageInfo,
  edges: Array<Maybe<TranscriptionEdge>>,
  aggregate: AggregateTranscription,
};

export type TranscriptionCreateInput = {
  id?: Maybe<Scalars['ID']>,
  call: TrunkedCallCreateOneWithoutTranscriptionInput,
  languageModel: Scalars['String'],
  beta: Scalars['Float'],
  body: Scalars['String'],
  words?: Maybe<TranscriptionWordCreateManyWithoutTranscriptionInput>,
  duration: Scalars['Float'],
  alpha: Scalars['Float'],
};

export type TranscriptionCreateOneWithoutCallInput = {
  create?: Maybe<TranscriptionCreateWithoutCallInput>,
  connect?: Maybe<TranscriptionWhereUniqueInput>,
};

export type TranscriptionCreateOneWithoutWordsInput = {
  create?: Maybe<TranscriptionCreateWithoutWordsInput>,
  connect?: Maybe<TranscriptionWhereUniqueInput>,
};

export type TranscriptionCreateWithoutCallInput = {
  id?: Maybe<Scalars['ID']>,
  languageModel: Scalars['String'],
  beta: Scalars['Float'],
  body: Scalars['String'],
  words?: Maybe<TranscriptionWordCreateManyWithoutTranscriptionInput>,
  duration: Scalars['Float'],
  alpha: Scalars['Float'],
};

export type TranscriptionCreateWithoutWordsInput = {
  id?: Maybe<Scalars['ID']>,
  call: TrunkedCallCreateOneWithoutTranscriptionInput,
  languageModel: Scalars['String'],
  beta: Scalars['Float'],
  body: Scalars['String'],
  duration: Scalars['Float'],
  alpha: Scalars['Float'],
};

export type TranscriptionEdge = {
   __typename?: 'TranscriptionEdge',
  node: Transcription,
  cursor: Scalars['String'],
};

export enum TranscriptionOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  LanguageModelAsc = 'languageModel_ASC',
  LanguageModelDesc = 'languageModel_DESC',
  BetaAsc = 'beta_ASC',
  BetaDesc = 'beta_DESC',
  BodyAsc = 'body_ASC',
  BodyDesc = 'body_DESC',
  DurationAsc = 'duration_ASC',
  DurationDesc = 'duration_DESC',
  AlphaAsc = 'alpha_ASC',
  AlphaDesc = 'alpha_DESC'
}

export type TranscriptionPreviousValues = {
   __typename?: 'TranscriptionPreviousValues',
  id: Scalars['ID'],
  updatedAt: Scalars['DateTime'],
  createdAt: Scalars['DateTime'],
  languageModel: Scalars['String'],
  beta: Scalars['Float'],
  body: Scalars['String'],
  duration: Scalars['Float'],
  alpha: Scalars['Float'],
};

export type TranscriptionSubscriptionPayload = {
   __typename?: 'TranscriptionSubscriptionPayload',
  mutation: MutationType,
  node?: Maybe<Transcription>,
  updatedFields?: Maybe<Array<Scalars['String']>>,
  previousValues?: Maybe<TranscriptionPreviousValues>,
};

export type TranscriptionSubscriptionWhereInput = {
  mutation_in?: Maybe<Array<MutationType>>,
  updatedFields_contains?: Maybe<Scalars['String']>,
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>,
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>,
  node?: Maybe<TranscriptionWhereInput>,
  AND?: Maybe<Array<TranscriptionSubscriptionWhereInput>>,
  OR?: Maybe<Array<TranscriptionSubscriptionWhereInput>>,
  NOT?: Maybe<Array<TranscriptionSubscriptionWhereInput>>,
};

export type TranscriptionUpdateInput = {
  call?: Maybe<TrunkedCallUpdateOneRequiredWithoutTranscriptionInput>,
  languageModel?: Maybe<Scalars['String']>,
  beta?: Maybe<Scalars['Float']>,
  body?: Maybe<Scalars['String']>,
  words?: Maybe<TranscriptionWordUpdateManyWithoutTranscriptionInput>,
  duration?: Maybe<Scalars['Float']>,
  alpha?: Maybe<Scalars['Float']>,
};

export type TranscriptionUpdateManyMutationInput = {
  languageModel?: Maybe<Scalars['String']>,
  beta?: Maybe<Scalars['Float']>,
  body?: Maybe<Scalars['String']>,
  duration?: Maybe<Scalars['Float']>,
  alpha?: Maybe<Scalars['Float']>,
};

export type TranscriptionUpdateOneRequiredWithoutWordsInput = {
  create?: Maybe<TranscriptionCreateWithoutWordsInput>,
  update?: Maybe<TranscriptionUpdateWithoutWordsDataInput>,
  upsert?: Maybe<TranscriptionUpsertWithoutWordsInput>,
  connect?: Maybe<TranscriptionWhereUniqueInput>,
};

export type TranscriptionUpdateOneWithoutCallInput = {
  create?: Maybe<TranscriptionCreateWithoutCallInput>,
  update?: Maybe<TranscriptionUpdateWithoutCallDataInput>,
  upsert?: Maybe<TranscriptionUpsertWithoutCallInput>,
  delete?: Maybe<Scalars['Boolean']>,
  disconnect?: Maybe<Scalars['Boolean']>,
  connect?: Maybe<TranscriptionWhereUniqueInput>,
};

export type TranscriptionUpdateWithoutCallDataInput = {
  languageModel?: Maybe<Scalars['String']>,
  beta?: Maybe<Scalars['Float']>,
  body?: Maybe<Scalars['String']>,
  words?: Maybe<TranscriptionWordUpdateManyWithoutTranscriptionInput>,
  duration?: Maybe<Scalars['Float']>,
  alpha?: Maybe<Scalars['Float']>,
};

export type TranscriptionUpdateWithoutWordsDataInput = {
  call?: Maybe<TrunkedCallUpdateOneRequiredWithoutTranscriptionInput>,
  languageModel?: Maybe<Scalars['String']>,
  beta?: Maybe<Scalars['Float']>,
  body?: Maybe<Scalars['String']>,
  duration?: Maybe<Scalars['Float']>,
  alpha?: Maybe<Scalars['Float']>,
};

export type TranscriptionUpsertWithoutCallInput = {
  update: TranscriptionUpdateWithoutCallDataInput,
  create: TranscriptionCreateWithoutCallInput,
};

export type TranscriptionUpsertWithoutWordsInput = {
  update: TranscriptionUpdateWithoutWordsDataInput,
  create: TranscriptionCreateWithoutWordsInput,
};

export type TranscriptionWhereInput = {
  id?: Maybe<Scalars['ID']>,
  id_not?: Maybe<Scalars['ID']>,
  id_in?: Maybe<Array<Scalars['ID']>>,
  id_not_in?: Maybe<Array<Scalars['ID']>>,
  id_lt?: Maybe<Scalars['ID']>,
  id_lte?: Maybe<Scalars['ID']>,
  id_gt?: Maybe<Scalars['ID']>,
  id_gte?: Maybe<Scalars['ID']>,
  id_contains?: Maybe<Scalars['ID']>,
  id_not_contains?: Maybe<Scalars['ID']>,
  id_starts_with?: Maybe<Scalars['ID']>,
  id_not_starts_with?: Maybe<Scalars['ID']>,
  id_ends_with?: Maybe<Scalars['ID']>,
  id_not_ends_with?: Maybe<Scalars['ID']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
  updatedAt_not?: Maybe<Scalars['DateTime']>,
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_lt?: Maybe<Scalars['DateTime']>,
  updatedAt_lte?: Maybe<Scalars['DateTime']>,
  updatedAt_gt?: Maybe<Scalars['DateTime']>,
  updatedAt_gte?: Maybe<Scalars['DateTime']>,
  createdAt?: Maybe<Scalars['DateTime']>,
  createdAt_not?: Maybe<Scalars['DateTime']>,
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_lt?: Maybe<Scalars['DateTime']>,
  createdAt_lte?: Maybe<Scalars['DateTime']>,
  createdAt_gt?: Maybe<Scalars['DateTime']>,
  createdAt_gte?: Maybe<Scalars['DateTime']>,
  call?: Maybe<TrunkedCallWhereInput>,
  languageModel?: Maybe<Scalars['String']>,
  languageModel_not?: Maybe<Scalars['String']>,
  languageModel_in?: Maybe<Array<Scalars['String']>>,
  languageModel_not_in?: Maybe<Array<Scalars['String']>>,
  languageModel_lt?: Maybe<Scalars['String']>,
  languageModel_lte?: Maybe<Scalars['String']>,
  languageModel_gt?: Maybe<Scalars['String']>,
  languageModel_gte?: Maybe<Scalars['String']>,
  languageModel_contains?: Maybe<Scalars['String']>,
  languageModel_not_contains?: Maybe<Scalars['String']>,
  languageModel_starts_with?: Maybe<Scalars['String']>,
  languageModel_not_starts_with?: Maybe<Scalars['String']>,
  languageModel_ends_with?: Maybe<Scalars['String']>,
  languageModel_not_ends_with?: Maybe<Scalars['String']>,
  beta?: Maybe<Scalars['Float']>,
  beta_not?: Maybe<Scalars['Float']>,
  beta_in?: Maybe<Array<Scalars['Float']>>,
  beta_not_in?: Maybe<Array<Scalars['Float']>>,
  beta_lt?: Maybe<Scalars['Float']>,
  beta_lte?: Maybe<Scalars['Float']>,
  beta_gt?: Maybe<Scalars['Float']>,
  beta_gte?: Maybe<Scalars['Float']>,
  body?: Maybe<Scalars['String']>,
  body_not?: Maybe<Scalars['String']>,
  body_in?: Maybe<Array<Scalars['String']>>,
  body_not_in?: Maybe<Array<Scalars['String']>>,
  body_lt?: Maybe<Scalars['String']>,
  body_lte?: Maybe<Scalars['String']>,
  body_gt?: Maybe<Scalars['String']>,
  body_gte?: Maybe<Scalars['String']>,
  body_contains?: Maybe<Scalars['String']>,
  body_not_contains?: Maybe<Scalars['String']>,
  body_starts_with?: Maybe<Scalars['String']>,
  body_not_starts_with?: Maybe<Scalars['String']>,
  body_ends_with?: Maybe<Scalars['String']>,
  body_not_ends_with?: Maybe<Scalars['String']>,
  words_every?: Maybe<TranscriptionWordWhereInput>,
  words_some?: Maybe<TranscriptionWordWhereInput>,
  words_none?: Maybe<TranscriptionWordWhereInput>,
  duration?: Maybe<Scalars['Float']>,
  duration_not?: Maybe<Scalars['Float']>,
  duration_in?: Maybe<Array<Scalars['Float']>>,
  duration_not_in?: Maybe<Array<Scalars['Float']>>,
  duration_lt?: Maybe<Scalars['Float']>,
  duration_lte?: Maybe<Scalars['Float']>,
  duration_gt?: Maybe<Scalars['Float']>,
  duration_gte?: Maybe<Scalars['Float']>,
  alpha?: Maybe<Scalars['Float']>,
  alpha_not?: Maybe<Scalars['Float']>,
  alpha_in?: Maybe<Array<Scalars['Float']>>,
  alpha_not_in?: Maybe<Array<Scalars['Float']>>,
  alpha_lt?: Maybe<Scalars['Float']>,
  alpha_lte?: Maybe<Scalars['Float']>,
  alpha_gt?: Maybe<Scalars['Float']>,
  alpha_gte?: Maybe<Scalars['Float']>,
  AND?: Maybe<Array<TranscriptionWhereInput>>,
  OR?: Maybe<Array<TranscriptionWhereInput>>,
  NOT?: Maybe<Array<TranscriptionWhereInput>>,
};

export type TranscriptionWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>,
};

export type TranscriptionWord = {
   __typename?: 'TranscriptionWord',
  id: Scalars['ID'],
  updatedAt: Scalars['DateTime'],
  createdAt: Scalars['DateTime'],
  text: Scalars['String'],
  transcription: Transcription,
  confidence: Scalars['Float'],
  end: Scalars['Int'],
  start: Scalars['Int'],
};

export type TranscriptionWordConnection = {
   __typename?: 'TranscriptionWordConnection',
  pageInfo: PageInfo,
  edges: Array<Maybe<TranscriptionWordEdge>>,
  aggregate: AggregateTranscriptionWord,
};

export type TranscriptionWordCreateInput = {
  id?: Maybe<Scalars['ID']>,
  text: Scalars['String'],
  transcription: TranscriptionCreateOneWithoutWordsInput,
  confidence: Scalars['Float'],
  end: Scalars['Int'],
  start: Scalars['Int'],
};

export type TranscriptionWordCreateManyWithoutTranscriptionInput = {
  create?: Maybe<Array<TranscriptionWordCreateWithoutTranscriptionInput>>,
  connect?: Maybe<Array<TranscriptionWordWhereUniqueInput>>,
};

export type TranscriptionWordCreateWithoutTranscriptionInput = {
  id?: Maybe<Scalars['ID']>,
  text: Scalars['String'],
  confidence: Scalars['Float'],
  end: Scalars['Int'],
  start: Scalars['Int'],
};

export type TranscriptionWordEdge = {
   __typename?: 'TranscriptionWordEdge',
  node: TranscriptionWord,
  cursor: Scalars['String'],
};

export enum TranscriptionWordOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  TextAsc = 'text_ASC',
  TextDesc = 'text_DESC',
  ConfidenceAsc = 'confidence_ASC',
  ConfidenceDesc = 'confidence_DESC',
  EndAsc = 'end_ASC',
  EndDesc = 'end_DESC',
  StartAsc = 'start_ASC',
  StartDesc = 'start_DESC'
}

export type TranscriptionWordPreviousValues = {
   __typename?: 'TranscriptionWordPreviousValues',
  id: Scalars['ID'],
  updatedAt: Scalars['DateTime'],
  createdAt: Scalars['DateTime'],
  text: Scalars['String'],
  confidence: Scalars['Float'],
  end: Scalars['Int'],
  start: Scalars['Int'],
};

export type TranscriptionWordScalarWhereInput = {
  id?: Maybe<Scalars['ID']>,
  id_not?: Maybe<Scalars['ID']>,
  id_in?: Maybe<Array<Scalars['ID']>>,
  id_not_in?: Maybe<Array<Scalars['ID']>>,
  id_lt?: Maybe<Scalars['ID']>,
  id_lte?: Maybe<Scalars['ID']>,
  id_gt?: Maybe<Scalars['ID']>,
  id_gte?: Maybe<Scalars['ID']>,
  id_contains?: Maybe<Scalars['ID']>,
  id_not_contains?: Maybe<Scalars['ID']>,
  id_starts_with?: Maybe<Scalars['ID']>,
  id_not_starts_with?: Maybe<Scalars['ID']>,
  id_ends_with?: Maybe<Scalars['ID']>,
  id_not_ends_with?: Maybe<Scalars['ID']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
  updatedAt_not?: Maybe<Scalars['DateTime']>,
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_lt?: Maybe<Scalars['DateTime']>,
  updatedAt_lte?: Maybe<Scalars['DateTime']>,
  updatedAt_gt?: Maybe<Scalars['DateTime']>,
  updatedAt_gte?: Maybe<Scalars['DateTime']>,
  createdAt?: Maybe<Scalars['DateTime']>,
  createdAt_not?: Maybe<Scalars['DateTime']>,
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_lt?: Maybe<Scalars['DateTime']>,
  createdAt_lte?: Maybe<Scalars['DateTime']>,
  createdAt_gt?: Maybe<Scalars['DateTime']>,
  createdAt_gte?: Maybe<Scalars['DateTime']>,
  text?: Maybe<Scalars['String']>,
  text_not?: Maybe<Scalars['String']>,
  text_in?: Maybe<Array<Scalars['String']>>,
  text_not_in?: Maybe<Array<Scalars['String']>>,
  text_lt?: Maybe<Scalars['String']>,
  text_lte?: Maybe<Scalars['String']>,
  text_gt?: Maybe<Scalars['String']>,
  text_gte?: Maybe<Scalars['String']>,
  text_contains?: Maybe<Scalars['String']>,
  text_not_contains?: Maybe<Scalars['String']>,
  text_starts_with?: Maybe<Scalars['String']>,
  text_not_starts_with?: Maybe<Scalars['String']>,
  text_ends_with?: Maybe<Scalars['String']>,
  text_not_ends_with?: Maybe<Scalars['String']>,
  confidence?: Maybe<Scalars['Float']>,
  confidence_not?: Maybe<Scalars['Float']>,
  confidence_in?: Maybe<Array<Scalars['Float']>>,
  confidence_not_in?: Maybe<Array<Scalars['Float']>>,
  confidence_lt?: Maybe<Scalars['Float']>,
  confidence_lte?: Maybe<Scalars['Float']>,
  confidence_gt?: Maybe<Scalars['Float']>,
  confidence_gte?: Maybe<Scalars['Float']>,
  end?: Maybe<Scalars['Int']>,
  end_not?: Maybe<Scalars['Int']>,
  end_in?: Maybe<Array<Scalars['Int']>>,
  end_not_in?: Maybe<Array<Scalars['Int']>>,
  end_lt?: Maybe<Scalars['Int']>,
  end_lte?: Maybe<Scalars['Int']>,
  end_gt?: Maybe<Scalars['Int']>,
  end_gte?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  start_not?: Maybe<Scalars['Int']>,
  start_in?: Maybe<Array<Scalars['Int']>>,
  start_not_in?: Maybe<Array<Scalars['Int']>>,
  start_lt?: Maybe<Scalars['Int']>,
  start_lte?: Maybe<Scalars['Int']>,
  start_gt?: Maybe<Scalars['Int']>,
  start_gte?: Maybe<Scalars['Int']>,
  AND?: Maybe<Array<TranscriptionWordScalarWhereInput>>,
  OR?: Maybe<Array<TranscriptionWordScalarWhereInput>>,
  NOT?: Maybe<Array<TranscriptionWordScalarWhereInput>>,
};

export type TranscriptionWordSubscriptionPayload = {
   __typename?: 'TranscriptionWordSubscriptionPayload',
  mutation: MutationType,
  node?: Maybe<TranscriptionWord>,
  updatedFields?: Maybe<Array<Scalars['String']>>,
  previousValues?: Maybe<TranscriptionWordPreviousValues>,
};

export type TranscriptionWordSubscriptionWhereInput = {
  mutation_in?: Maybe<Array<MutationType>>,
  updatedFields_contains?: Maybe<Scalars['String']>,
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>,
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>,
  node?: Maybe<TranscriptionWordWhereInput>,
  AND?: Maybe<Array<TranscriptionWordSubscriptionWhereInput>>,
  OR?: Maybe<Array<TranscriptionWordSubscriptionWhereInput>>,
  NOT?: Maybe<Array<TranscriptionWordSubscriptionWhereInput>>,
};

export type TranscriptionWordUpdateInput = {
  text?: Maybe<Scalars['String']>,
  transcription?: Maybe<TranscriptionUpdateOneRequiredWithoutWordsInput>,
  confidence?: Maybe<Scalars['Float']>,
  end?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
};

export type TranscriptionWordUpdateManyDataInput = {
  text?: Maybe<Scalars['String']>,
  confidence?: Maybe<Scalars['Float']>,
  end?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
};

export type TranscriptionWordUpdateManyMutationInput = {
  text?: Maybe<Scalars['String']>,
  confidence?: Maybe<Scalars['Float']>,
  end?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
};

export type TranscriptionWordUpdateManyWithoutTranscriptionInput = {
  create?: Maybe<Array<TranscriptionWordCreateWithoutTranscriptionInput>>,
  delete?: Maybe<Array<TranscriptionWordWhereUniqueInput>>,
  connect?: Maybe<Array<TranscriptionWordWhereUniqueInput>>,
  set?: Maybe<Array<TranscriptionWordWhereUniqueInput>>,
  disconnect?: Maybe<Array<TranscriptionWordWhereUniqueInput>>,
  update?: Maybe<Array<TranscriptionWordUpdateWithWhereUniqueWithoutTranscriptionInput>>,
  upsert?: Maybe<Array<TranscriptionWordUpsertWithWhereUniqueWithoutTranscriptionInput>>,
  deleteMany?: Maybe<Array<TranscriptionWordScalarWhereInput>>,
  updateMany?: Maybe<Array<TranscriptionWordUpdateManyWithWhereNestedInput>>,
};

export type TranscriptionWordUpdateManyWithWhereNestedInput = {
  where: TranscriptionWordScalarWhereInput,
  data: TranscriptionWordUpdateManyDataInput,
};

export type TranscriptionWordUpdateWithoutTranscriptionDataInput = {
  text?: Maybe<Scalars['String']>,
  confidence?: Maybe<Scalars['Float']>,
  end?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
};

export type TranscriptionWordUpdateWithWhereUniqueWithoutTranscriptionInput = {
  where: TranscriptionWordWhereUniqueInput,
  data: TranscriptionWordUpdateWithoutTranscriptionDataInput,
};

export type TranscriptionWordUpsertWithWhereUniqueWithoutTranscriptionInput = {
  where: TranscriptionWordWhereUniqueInput,
  update: TranscriptionWordUpdateWithoutTranscriptionDataInput,
  create: TranscriptionWordCreateWithoutTranscriptionInput,
};

export type TranscriptionWordWhereInput = {
  id?: Maybe<Scalars['ID']>,
  id_not?: Maybe<Scalars['ID']>,
  id_in?: Maybe<Array<Scalars['ID']>>,
  id_not_in?: Maybe<Array<Scalars['ID']>>,
  id_lt?: Maybe<Scalars['ID']>,
  id_lte?: Maybe<Scalars['ID']>,
  id_gt?: Maybe<Scalars['ID']>,
  id_gte?: Maybe<Scalars['ID']>,
  id_contains?: Maybe<Scalars['ID']>,
  id_not_contains?: Maybe<Scalars['ID']>,
  id_starts_with?: Maybe<Scalars['ID']>,
  id_not_starts_with?: Maybe<Scalars['ID']>,
  id_ends_with?: Maybe<Scalars['ID']>,
  id_not_ends_with?: Maybe<Scalars['ID']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
  updatedAt_not?: Maybe<Scalars['DateTime']>,
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_lt?: Maybe<Scalars['DateTime']>,
  updatedAt_lte?: Maybe<Scalars['DateTime']>,
  updatedAt_gt?: Maybe<Scalars['DateTime']>,
  updatedAt_gte?: Maybe<Scalars['DateTime']>,
  createdAt?: Maybe<Scalars['DateTime']>,
  createdAt_not?: Maybe<Scalars['DateTime']>,
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_lt?: Maybe<Scalars['DateTime']>,
  createdAt_lte?: Maybe<Scalars['DateTime']>,
  createdAt_gt?: Maybe<Scalars['DateTime']>,
  createdAt_gte?: Maybe<Scalars['DateTime']>,
  text?: Maybe<Scalars['String']>,
  text_not?: Maybe<Scalars['String']>,
  text_in?: Maybe<Array<Scalars['String']>>,
  text_not_in?: Maybe<Array<Scalars['String']>>,
  text_lt?: Maybe<Scalars['String']>,
  text_lte?: Maybe<Scalars['String']>,
  text_gt?: Maybe<Scalars['String']>,
  text_gte?: Maybe<Scalars['String']>,
  text_contains?: Maybe<Scalars['String']>,
  text_not_contains?: Maybe<Scalars['String']>,
  text_starts_with?: Maybe<Scalars['String']>,
  text_not_starts_with?: Maybe<Scalars['String']>,
  text_ends_with?: Maybe<Scalars['String']>,
  text_not_ends_with?: Maybe<Scalars['String']>,
  transcription?: Maybe<TranscriptionWhereInput>,
  confidence?: Maybe<Scalars['Float']>,
  confidence_not?: Maybe<Scalars['Float']>,
  confidence_in?: Maybe<Array<Scalars['Float']>>,
  confidence_not_in?: Maybe<Array<Scalars['Float']>>,
  confidence_lt?: Maybe<Scalars['Float']>,
  confidence_lte?: Maybe<Scalars['Float']>,
  confidence_gt?: Maybe<Scalars['Float']>,
  confidence_gte?: Maybe<Scalars['Float']>,
  end?: Maybe<Scalars['Int']>,
  end_not?: Maybe<Scalars['Int']>,
  end_in?: Maybe<Array<Scalars['Int']>>,
  end_not_in?: Maybe<Array<Scalars['Int']>>,
  end_lt?: Maybe<Scalars['Int']>,
  end_lte?: Maybe<Scalars['Int']>,
  end_gt?: Maybe<Scalars['Int']>,
  end_gte?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  start_not?: Maybe<Scalars['Int']>,
  start_in?: Maybe<Array<Scalars['Int']>>,
  start_not_in?: Maybe<Array<Scalars['Int']>>,
  start_lt?: Maybe<Scalars['Int']>,
  start_lte?: Maybe<Scalars['Int']>,
  start_gt?: Maybe<Scalars['Int']>,
  start_gte?: Maybe<Scalars['Int']>,
  AND?: Maybe<Array<TranscriptionWordWhereInput>>,
  OR?: Maybe<Array<TranscriptionWordWhereInput>>,
  NOT?: Maybe<Array<TranscriptionWordWhereInput>>,
};

export type TranscriptionWordWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>,
};

export type TrunkedCall = {
   __typename?: 'TrunkedCall',
  id: Scalars['ID'],
  updatedAt: Scalars['DateTime'],
  createdAt: Scalars['DateTime'],
  frequency: Scalars['Int'],
  startTime: Scalars['DateTime'],
  endTime: Scalars['DateTime'],
  emergency?: Maybe<Scalars['Boolean']>,
  talkgroup?: Maybe<TrunkedTalkgroup>,
  system?: Maybe<TrunkedSystem>,
  sources?: Maybe<Array<TrunkedCallSource>>,
  duration?: Maybe<Scalars['Float']>,
  source?: Maybe<Scalars['Int']>,
  audioPath?: Maybe<Scalars['String']>,
  frequencyList?: Maybe<Array<TrunkedCallFrequencyTime>>,
  callHash?: Maybe<Scalars['String']>,
  wavPath?: Maybe<Scalars['String']>,
  remotePaths: Array<Scalars['String']>,
  transcription?: Maybe<Transcription>,
};


export type TrunkedCallSourcesArgs = {
  where?: Maybe<TrunkedCallSourceWhereInput>,
  orderBy?: Maybe<TrunkedCallSourceOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type TrunkedCallFrequencyListArgs = {
  where?: Maybe<TrunkedCallFrequencyTimeWhereInput>,
  orderBy?: Maybe<TrunkedCallFrequencyTimeOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};

export type TrunkedCallConnection = {
   __typename?: 'TrunkedCallConnection',
  pageInfo: PageInfo,
  edges: Array<Maybe<TrunkedCallEdge>>,
  aggregate: AggregateTrunkedCall,
};

export type TrunkedCallCreateInput = {
  id?: Maybe<Scalars['ID']>,
  frequency: Scalars['Int'],
  startTime: Scalars['DateTime'],
  endTime: Scalars['DateTime'],
  emergency?: Maybe<Scalars['Boolean']>,
  talkgroup?: Maybe<TrunkedTalkgroupCreateOneWithoutCallsInput>,
  system?: Maybe<TrunkedSystemCreateOneWithoutCallsInput>,
  sources?: Maybe<TrunkedCallSourceCreateManyInput>,
  duration?: Maybe<Scalars['Float']>,
  source?: Maybe<Scalars['Int']>,
  audioPath?: Maybe<Scalars['String']>,
  frequencyList?: Maybe<TrunkedCallFrequencyTimeCreateManyInput>,
  callHash?: Maybe<Scalars['String']>,
  wavPath?: Maybe<Scalars['String']>,
  remotePaths?: Maybe<TrunkedCallCreateremotePathsInput>,
  transcription?: Maybe<TranscriptionCreateOneWithoutCallInput>,
};

export type TrunkedCallCreateManyWithoutSystemInput = {
  create?: Maybe<Array<TrunkedCallCreateWithoutSystemInput>>,
  connect?: Maybe<Array<TrunkedCallWhereUniqueInput>>,
};

export type TrunkedCallCreateManyWithoutTalkgroupInput = {
  create?: Maybe<Array<TrunkedCallCreateWithoutTalkgroupInput>>,
  connect?: Maybe<Array<TrunkedCallWhereUniqueInput>>,
};

export type TrunkedCallCreateOneWithoutTranscriptionInput = {
  create?: Maybe<TrunkedCallCreateWithoutTranscriptionInput>,
  connect?: Maybe<TrunkedCallWhereUniqueInput>,
};

export type TrunkedCallCreateremotePathsInput = {
  set?: Maybe<Array<Scalars['String']>>,
};

export type TrunkedCallCreateWithoutSystemInput = {
  id?: Maybe<Scalars['ID']>,
  frequency: Scalars['Int'],
  startTime: Scalars['DateTime'],
  endTime: Scalars['DateTime'],
  emergency?: Maybe<Scalars['Boolean']>,
  talkgroup?: Maybe<TrunkedTalkgroupCreateOneWithoutCallsInput>,
  sources?: Maybe<TrunkedCallSourceCreateManyInput>,
  duration?: Maybe<Scalars['Float']>,
  source?: Maybe<Scalars['Int']>,
  audioPath?: Maybe<Scalars['String']>,
  frequencyList?: Maybe<TrunkedCallFrequencyTimeCreateManyInput>,
  callHash?: Maybe<Scalars['String']>,
  wavPath?: Maybe<Scalars['String']>,
  remotePaths?: Maybe<TrunkedCallCreateremotePathsInput>,
  transcription?: Maybe<TranscriptionCreateOneWithoutCallInput>,
};

export type TrunkedCallCreateWithoutTalkgroupInput = {
  id?: Maybe<Scalars['ID']>,
  frequency: Scalars['Int'],
  startTime: Scalars['DateTime'],
  endTime: Scalars['DateTime'],
  emergency?: Maybe<Scalars['Boolean']>,
  system?: Maybe<TrunkedSystemCreateOneWithoutCallsInput>,
  sources?: Maybe<TrunkedCallSourceCreateManyInput>,
  duration?: Maybe<Scalars['Float']>,
  source?: Maybe<Scalars['Int']>,
  audioPath?: Maybe<Scalars['String']>,
  frequencyList?: Maybe<TrunkedCallFrequencyTimeCreateManyInput>,
  callHash?: Maybe<Scalars['String']>,
  wavPath?: Maybe<Scalars['String']>,
  remotePaths?: Maybe<TrunkedCallCreateremotePathsInput>,
  transcription?: Maybe<TranscriptionCreateOneWithoutCallInput>,
};

export type TrunkedCallCreateWithoutTranscriptionInput = {
  id?: Maybe<Scalars['ID']>,
  frequency: Scalars['Int'],
  startTime: Scalars['DateTime'],
  endTime: Scalars['DateTime'],
  emergency?: Maybe<Scalars['Boolean']>,
  talkgroup?: Maybe<TrunkedTalkgroupCreateOneWithoutCallsInput>,
  system?: Maybe<TrunkedSystemCreateOneWithoutCallsInput>,
  sources?: Maybe<TrunkedCallSourceCreateManyInput>,
  duration?: Maybe<Scalars['Float']>,
  source?: Maybe<Scalars['Int']>,
  audioPath?: Maybe<Scalars['String']>,
  frequencyList?: Maybe<TrunkedCallFrequencyTimeCreateManyInput>,
  callHash?: Maybe<Scalars['String']>,
  wavPath?: Maybe<Scalars['String']>,
  remotePaths?: Maybe<TrunkedCallCreateremotePathsInput>,
};

export type TrunkedCallEdge = {
   __typename?: 'TrunkedCallEdge',
  node: TrunkedCall,
  cursor: Scalars['String'],
};

export type TrunkedCallFrequencyTime = {
   __typename?: 'TrunkedCallFrequencyTime',
  id: Scalars['ID'],
  updatedAt: Scalars['DateTime'],
  createdAt: Scalars['DateTime'],
  frequency: Scalars['Int'],
  time: Scalars['Int'],
  position: Scalars['Float'],
  length: Scalars['Int'],
  errors: Scalars['Int'],
  spikes: Scalars['Int'],
};

export type TrunkedCallFrequencyTimeConnection = {
   __typename?: 'TrunkedCallFrequencyTimeConnection',
  pageInfo: PageInfo,
  edges: Array<Maybe<TrunkedCallFrequencyTimeEdge>>,
  aggregate: AggregateTrunkedCallFrequencyTime,
};

export type TrunkedCallFrequencyTimeCreateInput = {
  id?: Maybe<Scalars['ID']>,
  frequency: Scalars['Int'],
  time: Scalars['Int'],
  position: Scalars['Float'],
  length: Scalars['Int'],
  errors: Scalars['Int'],
  spikes: Scalars['Int'],
};

export type TrunkedCallFrequencyTimeCreateManyInput = {
  create?: Maybe<Array<TrunkedCallFrequencyTimeCreateInput>>,
  connect?: Maybe<Array<TrunkedCallFrequencyTimeWhereUniqueInput>>,
};

export type TrunkedCallFrequencyTimeEdge = {
   __typename?: 'TrunkedCallFrequencyTimeEdge',
  node: TrunkedCallFrequencyTime,
  cursor: Scalars['String'],
};

export enum TrunkedCallFrequencyTimeOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  FrequencyAsc = 'frequency_ASC',
  FrequencyDesc = 'frequency_DESC',
  TimeAsc = 'time_ASC',
  TimeDesc = 'time_DESC',
  PositionAsc = 'position_ASC',
  PositionDesc = 'position_DESC',
  LengthAsc = 'length_ASC',
  LengthDesc = 'length_DESC',
  ErrorsAsc = 'errors_ASC',
  ErrorsDesc = 'errors_DESC',
  SpikesAsc = 'spikes_ASC',
  SpikesDesc = 'spikes_DESC'
}

export type TrunkedCallFrequencyTimePreviousValues = {
   __typename?: 'TrunkedCallFrequencyTimePreviousValues',
  id: Scalars['ID'],
  updatedAt: Scalars['DateTime'],
  createdAt: Scalars['DateTime'],
  frequency: Scalars['Int'],
  time: Scalars['Int'],
  position: Scalars['Float'],
  length: Scalars['Int'],
  errors: Scalars['Int'],
  spikes: Scalars['Int'],
};

export type TrunkedCallFrequencyTimeScalarWhereInput = {
  id?: Maybe<Scalars['ID']>,
  id_not?: Maybe<Scalars['ID']>,
  id_in?: Maybe<Array<Scalars['ID']>>,
  id_not_in?: Maybe<Array<Scalars['ID']>>,
  id_lt?: Maybe<Scalars['ID']>,
  id_lte?: Maybe<Scalars['ID']>,
  id_gt?: Maybe<Scalars['ID']>,
  id_gte?: Maybe<Scalars['ID']>,
  id_contains?: Maybe<Scalars['ID']>,
  id_not_contains?: Maybe<Scalars['ID']>,
  id_starts_with?: Maybe<Scalars['ID']>,
  id_not_starts_with?: Maybe<Scalars['ID']>,
  id_ends_with?: Maybe<Scalars['ID']>,
  id_not_ends_with?: Maybe<Scalars['ID']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
  updatedAt_not?: Maybe<Scalars['DateTime']>,
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_lt?: Maybe<Scalars['DateTime']>,
  updatedAt_lte?: Maybe<Scalars['DateTime']>,
  updatedAt_gt?: Maybe<Scalars['DateTime']>,
  updatedAt_gte?: Maybe<Scalars['DateTime']>,
  createdAt?: Maybe<Scalars['DateTime']>,
  createdAt_not?: Maybe<Scalars['DateTime']>,
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_lt?: Maybe<Scalars['DateTime']>,
  createdAt_lte?: Maybe<Scalars['DateTime']>,
  createdAt_gt?: Maybe<Scalars['DateTime']>,
  createdAt_gte?: Maybe<Scalars['DateTime']>,
  frequency?: Maybe<Scalars['Int']>,
  frequency_not?: Maybe<Scalars['Int']>,
  frequency_in?: Maybe<Array<Scalars['Int']>>,
  frequency_not_in?: Maybe<Array<Scalars['Int']>>,
  frequency_lt?: Maybe<Scalars['Int']>,
  frequency_lte?: Maybe<Scalars['Int']>,
  frequency_gt?: Maybe<Scalars['Int']>,
  frequency_gte?: Maybe<Scalars['Int']>,
  time?: Maybe<Scalars['Int']>,
  time_not?: Maybe<Scalars['Int']>,
  time_in?: Maybe<Array<Scalars['Int']>>,
  time_not_in?: Maybe<Array<Scalars['Int']>>,
  time_lt?: Maybe<Scalars['Int']>,
  time_lte?: Maybe<Scalars['Int']>,
  time_gt?: Maybe<Scalars['Int']>,
  time_gte?: Maybe<Scalars['Int']>,
  position?: Maybe<Scalars['Float']>,
  position_not?: Maybe<Scalars['Float']>,
  position_in?: Maybe<Array<Scalars['Float']>>,
  position_not_in?: Maybe<Array<Scalars['Float']>>,
  position_lt?: Maybe<Scalars['Float']>,
  position_lte?: Maybe<Scalars['Float']>,
  position_gt?: Maybe<Scalars['Float']>,
  position_gte?: Maybe<Scalars['Float']>,
  length?: Maybe<Scalars['Int']>,
  length_not?: Maybe<Scalars['Int']>,
  length_in?: Maybe<Array<Scalars['Int']>>,
  length_not_in?: Maybe<Array<Scalars['Int']>>,
  length_lt?: Maybe<Scalars['Int']>,
  length_lte?: Maybe<Scalars['Int']>,
  length_gt?: Maybe<Scalars['Int']>,
  length_gte?: Maybe<Scalars['Int']>,
  errors?: Maybe<Scalars['Int']>,
  errors_not?: Maybe<Scalars['Int']>,
  errors_in?: Maybe<Array<Scalars['Int']>>,
  errors_not_in?: Maybe<Array<Scalars['Int']>>,
  errors_lt?: Maybe<Scalars['Int']>,
  errors_lte?: Maybe<Scalars['Int']>,
  errors_gt?: Maybe<Scalars['Int']>,
  errors_gte?: Maybe<Scalars['Int']>,
  spikes?: Maybe<Scalars['Int']>,
  spikes_not?: Maybe<Scalars['Int']>,
  spikes_in?: Maybe<Array<Scalars['Int']>>,
  spikes_not_in?: Maybe<Array<Scalars['Int']>>,
  spikes_lt?: Maybe<Scalars['Int']>,
  spikes_lte?: Maybe<Scalars['Int']>,
  spikes_gt?: Maybe<Scalars['Int']>,
  spikes_gte?: Maybe<Scalars['Int']>,
  AND?: Maybe<Array<TrunkedCallFrequencyTimeScalarWhereInput>>,
  OR?: Maybe<Array<TrunkedCallFrequencyTimeScalarWhereInput>>,
  NOT?: Maybe<Array<TrunkedCallFrequencyTimeScalarWhereInput>>,
};

export type TrunkedCallFrequencyTimeSubscriptionPayload = {
   __typename?: 'TrunkedCallFrequencyTimeSubscriptionPayload',
  mutation: MutationType,
  node?: Maybe<TrunkedCallFrequencyTime>,
  updatedFields?: Maybe<Array<Scalars['String']>>,
  previousValues?: Maybe<TrunkedCallFrequencyTimePreviousValues>,
};

export type TrunkedCallFrequencyTimeSubscriptionWhereInput = {
  mutation_in?: Maybe<Array<MutationType>>,
  updatedFields_contains?: Maybe<Scalars['String']>,
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>,
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>,
  node?: Maybe<TrunkedCallFrequencyTimeWhereInput>,
  AND?: Maybe<Array<TrunkedCallFrequencyTimeSubscriptionWhereInput>>,
  OR?: Maybe<Array<TrunkedCallFrequencyTimeSubscriptionWhereInput>>,
  NOT?: Maybe<Array<TrunkedCallFrequencyTimeSubscriptionWhereInput>>,
};

export type TrunkedCallFrequencyTimeUpdateDataInput = {
  frequency?: Maybe<Scalars['Int']>,
  time?: Maybe<Scalars['Int']>,
  position?: Maybe<Scalars['Float']>,
  length?: Maybe<Scalars['Int']>,
  errors?: Maybe<Scalars['Int']>,
  spikes?: Maybe<Scalars['Int']>,
};

export type TrunkedCallFrequencyTimeUpdateInput = {
  frequency?: Maybe<Scalars['Int']>,
  time?: Maybe<Scalars['Int']>,
  position?: Maybe<Scalars['Float']>,
  length?: Maybe<Scalars['Int']>,
  errors?: Maybe<Scalars['Int']>,
  spikes?: Maybe<Scalars['Int']>,
};

export type TrunkedCallFrequencyTimeUpdateManyDataInput = {
  frequency?: Maybe<Scalars['Int']>,
  time?: Maybe<Scalars['Int']>,
  position?: Maybe<Scalars['Float']>,
  length?: Maybe<Scalars['Int']>,
  errors?: Maybe<Scalars['Int']>,
  spikes?: Maybe<Scalars['Int']>,
};

export type TrunkedCallFrequencyTimeUpdateManyInput = {
  create?: Maybe<Array<TrunkedCallFrequencyTimeCreateInput>>,
  update?: Maybe<Array<TrunkedCallFrequencyTimeUpdateWithWhereUniqueNestedInput>>,
  upsert?: Maybe<Array<TrunkedCallFrequencyTimeUpsertWithWhereUniqueNestedInput>>,
  delete?: Maybe<Array<TrunkedCallFrequencyTimeWhereUniqueInput>>,
  connect?: Maybe<Array<TrunkedCallFrequencyTimeWhereUniqueInput>>,
  set?: Maybe<Array<TrunkedCallFrequencyTimeWhereUniqueInput>>,
  disconnect?: Maybe<Array<TrunkedCallFrequencyTimeWhereUniqueInput>>,
  deleteMany?: Maybe<Array<TrunkedCallFrequencyTimeScalarWhereInput>>,
  updateMany?: Maybe<Array<TrunkedCallFrequencyTimeUpdateManyWithWhereNestedInput>>,
};

export type TrunkedCallFrequencyTimeUpdateManyMutationInput = {
  frequency?: Maybe<Scalars['Int']>,
  time?: Maybe<Scalars['Int']>,
  position?: Maybe<Scalars['Float']>,
  length?: Maybe<Scalars['Int']>,
  errors?: Maybe<Scalars['Int']>,
  spikes?: Maybe<Scalars['Int']>,
};

export type TrunkedCallFrequencyTimeUpdateManyWithWhereNestedInput = {
  where: TrunkedCallFrequencyTimeScalarWhereInput,
  data: TrunkedCallFrequencyTimeUpdateManyDataInput,
};

export type TrunkedCallFrequencyTimeUpdateWithWhereUniqueNestedInput = {
  where: TrunkedCallFrequencyTimeWhereUniqueInput,
  data: TrunkedCallFrequencyTimeUpdateDataInput,
};

export type TrunkedCallFrequencyTimeUpsertWithWhereUniqueNestedInput = {
  where: TrunkedCallFrequencyTimeWhereUniqueInput,
  update: TrunkedCallFrequencyTimeUpdateDataInput,
  create: TrunkedCallFrequencyTimeCreateInput,
};

export type TrunkedCallFrequencyTimeWhereInput = {
  id?: Maybe<Scalars['ID']>,
  id_not?: Maybe<Scalars['ID']>,
  id_in?: Maybe<Array<Scalars['ID']>>,
  id_not_in?: Maybe<Array<Scalars['ID']>>,
  id_lt?: Maybe<Scalars['ID']>,
  id_lte?: Maybe<Scalars['ID']>,
  id_gt?: Maybe<Scalars['ID']>,
  id_gte?: Maybe<Scalars['ID']>,
  id_contains?: Maybe<Scalars['ID']>,
  id_not_contains?: Maybe<Scalars['ID']>,
  id_starts_with?: Maybe<Scalars['ID']>,
  id_not_starts_with?: Maybe<Scalars['ID']>,
  id_ends_with?: Maybe<Scalars['ID']>,
  id_not_ends_with?: Maybe<Scalars['ID']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
  updatedAt_not?: Maybe<Scalars['DateTime']>,
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_lt?: Maybe<Scalars['DateTime']>,
  updatedAt_lte?: Maybe<Scalars['DateTime']>,
  updatedAt_gt?: Maybe<Scalars['DateTime']>,
  updatedAt_gte?: Maybe<Scalars['DateTime']>,
  createdAt?: Maybe<Scalars['DateTime']>,
  createdAt_not?: Maybe<Scalars['DateTime']>,
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_lt?: Maybe<Scalars['DateTime']>,
  createdAt_lte?: Maybe<Scalars['DateTime']>,
  createdAt_gt?: Maybe<Scalars['DateTime']>,
  createdAt_gte?: Maybe<Scalars['DateTime']>,
  frequency?: Maybe<Scalars['Int']>,
  frequency_not?: Maybe<Scalars['Int']>,
  frequency_in?: Maybe<Array<Scalars['Int']>>,
  frequency_not_in?: Maybe<Array<Scalars['Int']>>,
  frequency_lt?: Maybe<Scalars['Int']>,
  frequency_lte?: Maybe<Scalars['Int']>,
  frequency_gt?: Maybe<Scalars['Int']>,
  frequency_gte?: Maybe<Scalars['Int']>,
  time?: Maybe<Scalars['Int']>,
  time_not?: Maybe<Scalars['Int']>,
  time_in?: Maybe<Array<Scalars['Int']>>,
  time_not_in?: Maybe<Array<Scalars['Int']>>,
  time_lt?: Maybe<Scalars['Int']>,
  time_lte?: Maybe<Scalars['Int']>,
  time_gt?: Maybe<Scalars['Int']>,
  time_gte?: Maybe<Scalars['Int']>,
  position?: Maybe<Scalars['Float']>,
  position_not?: Maybe<Scalars['Float']>,
  position_in?: Maybe<Array<Scalars['Float']>>,
  position_not_in?: Maybe<Array<Scalars['Float']>>,
  position_lt?: Maybe<Scalars['Float']>,
  position_lte?: Maybe<Scalars['Float']>,
  position_gt?: Maybe<Scalars['Float']>,
  position_gte?: Maybe<Scalars['Float']>,
  length?: Maybe<Scalars['Int']>,
  length_not?: Maybe<Scalars['Int']>,
  length_in?: Maybe<Array<Scalars['Int']>>,
  length_not_in?: Maybe<Array<Scalars['Int']>>,
  length_lt?: Maybe<Scalars['Int']>,
  length_lte?: Maybe<Scalars['Int']>,
  length_gt?: Maybe<Scalars['Int']>,
  length_gte?: Maybe<Scalars['Int']>,
  errors?: Maybe<Scalars['Int']>,
  errors_not?: Maybe<Scalars['Int']>,
  errors_in?: Maybe<Array<Scalars['Int']>>,
  errors_not_in?: Maybe<Array<Scalars['Int']>>,
  errors_lt?: Maybe<Scalars['Int']>,
  errors_lte?: Maybe<Scalars['Int']>,
  errors_gt?: Maybe<Scalars['Int']>,
  errors_gte?: Maybe<Scalars['Int']>,
  spikes?: Maybe<Scalars['Int']>,
  spikes_not?: Maybe<Scalars['Int']>,
  spikes_in?: Maybe<Array<Scalars['Int']>>,
  spikes_not_in?: Maybe<Array<Scalars['Int']>>,
  spikes_lt?: Maybe<Scalars['Int']>,
  spikes_lte?: Maybe<Scalars['Int']>,
  spikes_gt?: Maybe<Scalars['Int']>,
  spikes_gte?: Maybe<Scalars['Int']>,
  AND?: Maybe<Array<TrunkedCallFrequencyTimeWhereInput>>,
  OR?: Maybe<Array<TrunkedCallFrequencyTimeWhereInput>>,
  NOT?: Maybe<Array<TrunkedCallFrequencyTimeWhereInput>>,
};

export type TrunkedCallFrequencyTimeWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>,
};

export enum TrunkedCallOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  FrequencyAsc = 'frequency_ASC',
  FrequencyDesc = 'frequency_DESC',
  StartTimeAsc = 'startTime_ASC',
  StartTimeDesc = 'startTime_DESC',
  EndTimeAsc = 'endTime_ASC',
  EndTimeDesc = 'endTime_DESC',
  EmergencyAsc = 'emergency_ASC',
  EmergencyDesc = 'emergency_DESC',
  DurationAsc = 'duration_ASC',
  DurationDesc = 'duration_DESC',
  SourceAsc = 'source_ASC',
  SourceDesc = 'source_DESC',
  AudioPathAsc = 'audioPath_ASC',
  AudioPathDesc = 'audioPath_DESC',
  CallHashAsc = 'callHash_ASC',
  CallHashDesc = 'callHash_DESC',
  WavPathAsc = 'wavPath_ASC',
  WavPathDesc = 'wavPath_DESC'
}

export type TrunkedCallPreviousValues = {
   __typename?: 'TrunkedCallPreviousValues',
  id: Scalars['ID'],
  updatedAt: Scalars['DateTime'],
  createdAt: Scalars['DateTime'],
  frequency: Scalars['Int'],
  startTime: Scalars['DateTime'],
  endTime: Scalars['DateTime'],
  emergency?: Maybe<Scalars['Boolean']>,
  duration?: Maybe<Scalars['Float']>,
  source?: Maybe<Scalars['Int']>,
  audioPath?: Maybe<Scalars['String']>,
  callHash?: Maybe<Scalars['String']>,
  wavPath?: Maybe<Scalars['String']>,
  remotePaths: Array<Scalars['String']>,
};

export type TrunkedCallScalarWhereInput = {
  id?: Maybe<Scalars['ID']>,
  id_not?: Maybe<Scalars['ID']>,
  id_in?: Maybe<Array<Scalars['ID']>>,
  id_not_in?: Maybe<Array<Scalars['ID']>>,
  id_lt?: Maybe<Scalars['ID']>,
  id_lte?: Maybe<Scalars['ID']>,
  id_gt?: Maybe<Scalars['ID']>,
  id_gte?: Maybe<Scalars['ID']>,
  id_contains?: Maybe<Scalars['ID']>,
  id_not_contains?: Maybe<Scalars['ID']>,
  id_starts_with?: Maybe<Scalars['ID']>,
  id_not_starts_with?: Maybe<Scalars['ID']>,
  id_ends_with?: Maybe<Scalars['ID']>,
  id_not_ends_with?: Maybe<Scalars['ID']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
  updatedAt_not?: Maybe<Scalars['DateTime']>,
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_lt?: Maybe<Scalars['DateTime']>,
  updatedAt_lte?: Maybe<Scalars['DateTime']>,
  updatedAt_gt?: Maybe<Scalars['DateTime']>,
  updatedAt_gte?: Maybe<Scalars['DateTime']>,
  createdAt?: Maybe<Scalars['DateTime']>,
  createdAt_not?: Maybe<Scalars['DateTime']>,
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_lt?: Maybe<Scalars['DateTime']>,
  createdAt_lte?: Maybe<Scalars['DateTime']>,
  createdAt_gt?: Maybe<Scalars['DateTime']>,
  createdAt_gte?: Maybe<Scalars['DateTime']>,
  frequency?: Maybe<Scalars['Int']>,
  frequency_not?: Maybe<Scalars['Int']>,
  frequency_in?: Maybe<Array<Scalars['Int']>>,
  frequency_not_in?: Maybe<Array<Scalars['Int']>>,
  frequency_lt?: Maybe<Scalars['Int']>,
  frequency_lte?: Maybe<Scalars['Int']>,
  frequency_gt?: Maybe<Scalars['Int']>,
  frequency_gte?: Maybe<Scalars['Int']>,
  startTime?: Maybe<Scalars['DateTime']>,
  startTime_not?: Maybe<Scalars['DateTime']>,
  startTime_in?: Maybe<Array<Scalars['DateTime']>>,
  startTime_not_in?: Maybe<Array<Scalars['DateTime']>>,
  startTime_lt?: Maybe<Scalars['DateTime']>,
  startTime_lte?: Maybe<Scalars['DateTime']>,
  startTime_gt?: Maybe<Scalars['DateTime']>,
  startTime_gte?: Maybe<Scalars['DateTime']>,
  endTime?: Maybe<Scalars['DateTime']>,
  endTime_not?: Maybe<Scalars['DateTime']>,
  endTime_in?: Maybe<Array<Scalars['DateTime']>>,
  endTime_not_in?: Maybe<Array<Scalars['DateTime']>>,
  endTime_lt?: Maybe<Scalars['DateTime']>,
  endTime_lte?: Maybe<Scalars['DateTime']>,
  endTime_gt?: Maybe<Scalars['DateTime']>,
  endTime_gte?: Maybe<Scalars['DateTime']>,
  emergency?: Maybe<Scalars['Boolean']>,
  emergency_not?: Maybe<Scalars['Boolean']>,
  duration?: Maybe<Scalars['Float']>,
  duration_not?: Maybe<Scalars['Float']>,
  duration_in?: Maybe<Array<Scalars['Float']>>,
  duration_not_in?: Maybe<Array<Scalars['Float']>>,
  duration_lt?: Maybe<Scalars['Float']>,
  duration_lte?: Maybe<Scalars['Float']>,
  duration_gt?: Maybe<Scalars['Float']>,
  duration_gte?: Maybe<Scalars['Float']>,
  source?: Maybe<Scalars['Int']>,
  source_not?: Maybe<Scalars['Int']>,
  source_in?: Maybe<Array<Scalars['Int']>>,
  source_not_in?: Maybe<Array<Scalars['Int']>>,
  source_lt?: Maybe<Scalars['Int']>,
  source_lte?: Maybe<Scalars['Int']>,
  source_gt?: Maybe<Scalars['Int']>,
  source_gte?: Maybe<Scalars['Int']>,
  audioPath?: Maybe<Scalars['String']>,
  audioPath_not?: Maybe<Scalars['String']>,
  audioPath_in?: Maybe<Array<Scalars['String']>>,
  audioPath_not_in?: Maybe<Array<Scalars['String']>>,
  audioPath_lt?: Maybe<Scalars['String']>,
  audioPath_lte?: Maybe<Scalars['String']>,
  audioPath_gt?: Maybe<Scalars['String']>,
  audioPath_gte?: Maybe<Scalars['String']>,
  audioPath_contains?: Maybe<Scalars['String']>,
  audioPath_not_contains?: Maybe<Scalars['String']>,
  audioPath_starts_with?: Maybe<Scalars['String']>,
  audioPath_not_starts_with?: Maybe<Scalars['String']>,
  audioPath_ends_with?: Maybe<Scalars['String']>,
  audioPath_not_ends_with?: Maybe<Scalars['String']>,
  callHash?: Maybe<Scalars['String']>,
  callHash_not?: Maybe<Scalars['String']>,
  callHash_in?: Maybe<Array<Scalars['String']>>,
  callHash_not_in?: Maybe<Array<Scalars['String']>>,
  callHash_lt?: Maybe<Scalars['String']>,
  callHash_lte?: Maybe<Scalars['String']>,
  callHash_gt?: Maybe<Scalars['String']>,
  callHash_gte?: Maybe<Scalars['String']>,
  callHash_contains?: Maybe<Scalars['String']>,
  callHash_not_contains?: Maybe<Scalars['String']>,
  callHash_starts_with?: Maybe<Scalars['String']>,
  callHash_not_starts_with?: Maybe<Scalars['String']>,
  callHash_ends_with?: Maybe<Scalars['String']>,
  callHash_not_ends_with?: Maybe<Scalars['String']>,
  wavPath?: Maybe<Scalars['String']>,
  wavPath_not?: Maybe<Scalars['String']>,
  wavPath_in?: Maybe<Array<Scalars['String']>>,
  wavPath_not_in?: Maybe<Array<Scalars['String']>>,
  wavPath_lt?: Maybe<Scalars['String']>,
  wavPath_lte?: Maybe<Scalars['String']>,
  wavPath_gt?: Maybe<Scalars['String']>,
  wavPath_gte?: Maybe<Scalars['String']>,
  wavPath_contains?: Maybe<Scalars['String']>,
  wavPath_not_contains?: Maybe<Scalars['String']>,
  wavPath_starts_with?: Maybe<Scalars['String']>,
  wavPath_not_starts_with?: Maybe<Scalars['String']>,
  wavPath_ends_with?: Maybe<Scalars['String']>,
  wavPath_not_ends_with?: Maybe<Scalars['String']>,
  AND?: Maybe<Array<TrunkedCallScalarWhereInput>>,
  OR?: Maybe<Array<TrunkedCallScalarWhereInput>>,
  NOT?: Maybe<Array<TrunkedCallScalarWhereInput>>,
};

export type TrunkedCallSource = {
   __typename?: 'TrunkedCallSource',
  id: Scalars['ID'],
  updatedAt: Scalars['DateTime'],
  createdAt: Scalars['DateTime'],
  sourceId?: Maybe<Scalars['Int']>,
  time?: Maybe<Scalars['DateTime']>,
  position?: Maybe<Scalars['Float']>,
};

export type TrunkedCallSourceConnection = {
   __typename?: 'TrunkedCallSourceConnection',
  pageInfo: PageInfo,
  edges: Array<Maybe<TrunkedCallSourceEdge>>,
  aggregate: AggregateTrunkedCallSource,
};

export type TrunkedCallSourceCreateInput = {
  id?: Maybe<Scalars['ID']>,
  sourceId?: Maybe<Scalars['Int']>,
  time?: Maybe<Scalars['DateTime']>,
  position?: Maybe<Scalars['Float']>,
};

export type TrunkedCallSourceCreateManyInput = {
  create?: Maybe<Array<TrunkedCallSourceCreateInput>>,
  connect?: Maybe<Array<TrunkedCallSourceWhereUniqueInput>>,
};

export type TrunkedCallSourceEdge = {
   __typename?: 'TrunkedCallSourceEdge',
  node: TrunkedCallSource,
  cursor: Scalars['String'],
};

export enum TrunkedCallSourceOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  SourceIdAsc = 'sourceId_ASC',
  SourceIdDesc = 'sourceId_DESC',
  TimeAsc = 'time_ASC',
  TimeDesc = 'time_DESC',
  PositionAsc = 'position_ASC',
  PositionDesc = 'position_DESC'
}

export type TrunkedCallSourcePreviousValues = {
   __typename?: 'TrunkedCallSourcePreviousValues',
  id: Scalars['ID'],
  updatedAt: Scalars['DateTime'],
  createdAt: Scalars['DateTime'],
  sourceId?: Maybe<Scalars['Int']>,
  time?: Maybe<Scalars['DateTime']>,
  position?: Maybe<Scalars['Float']>,
};

export type TrunkedCallSourceScalarWhereInput = {
  id?: Maybe<Scalars['ID']>,
  id_not?: Maybe<Scalars['ID']>,
  id_in?: Maybe<Array<Scalars['ID']>>,
  id_not_in?: Maybe<Array<Scalars['ID']>>,
  id_lt?: Maybe<Scalars['ID']>,
  id_lte?: Maybe<Scalars['ID']>,
  id_gt?: Maybe<Scalars['ID']>,
  id_gte?: Maybe<Scalars['ID']>,
  id_contains?: Maybe<Scalars['ID']>,
  id_not_contains?: Maybe<Scalars['ID']>,
  id_starts_with?: Maybe<Scalars['ID']>,
  id_not_starts_with?: Maybe<Scalars['ID']>,
  id_ends_with?: Maybe<Scalars['ID']>,
  id_not_ends_with?: Maybe<Scalars['ID']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
  updatedAt_not?: Maybe<Scalars['DateTime']>,
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_lt?: Maybe<Scalars['DateTime']>,
  updatedAt_lte?: Maybe<Scalars['DateTime']>,
  updatedAt_gt?: Maybe<Scalars['DateTime']>,
  updatedAt_gte?: Maybe<Scalars['DateTime']>,
  createdAt?: Maybe<Scalars['DateTime']>,
  createdAt_not?: Maybe<Scalars['DateTime']>,
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_lt?: Maybe<Scalars['DateTime']>,
  createdAt_lte?: Maybe<Scalars['DateTime']>,
  createdAt_gt?: Maybe<Scalars['DateTime']>,
  createdAt_gte?: Maybe<Scalars['DateTime']>,
  sourceId?: Maybe<Scalars['Int']>,
  sourceId_not?: Maybe<Scalars['Int']>,
  sourceId_in?: Maybe<Array<Scalars['Int']>>,
  sourceId_not_in?: Maybe<Array<Scalars['Int']>>,
  sourceId_lt?: Maybe<Scalars['Int']>,
  sourceId_lte?: Maybe<Scalars['Int']>,
  sourceId_gt?: Maybe<Scalars['Int']>,
  sourceId_gte?: Maybe<Scalars['Int']>,
  time?: Maybe<Scalars['DateTime']>,
  time_not?: Maybe<Scalars['DateTime']>,
  time_in?: Maybe<Array<Scalars['DateTime']>>,
  time_not_in?: Maybe<Array<Scalars['DateTime']>>,
  time_lt?: Maybe<Scalars['DateTime']>,
  time_lte?: Maybe<Scalars['DateTime']>,
  time_gt?: Maybe<Scalars['DateTime']>,
  time_gte?: Maybe<Scalars['DateTime']>,
  position?: Maybe<Scalars['Float']>,
  position_not?: Maybe<Scalars['Float']>,
  position_in?: Maybe<Array<Scalars['Float']>>,
  position_not_in?: Maybe<Array<Scalars['Float']>>,
  position_lt?: Maybe<Scalars['Float']>,
  position_lte?: Maybe<Scalars['Float']>,
  position_gt?: Maybe<Scalars['Float']>,
  position_gte?: Maybe<Scalars['Float']>,
  AND?: Maybe<Array<TrunkedCallSourceScalarWhereInput>>,
  OR?: Maybe<Array<TrunkedCallSourceScalarWhereInput>>,
  NOT?: Maybe<Array<TrunkedCallSourceScalarWhereInput>>,
};

export type TrunkedCallSourceSubscriptionPayload = {
   __typename?: 'TrunkedCallSourceSubscriptionPayload',
  mutation: MutationType,
  node?: Maybe<TrunkedCallSource>,
  updatedFields?: Maybe<Array<Scalars['String']>>,
  previousValues?: Maybe<TrunkedCallSourcePreviousValues>,
};

export type TrunkedCallSourceSubscriptionWhereInput = {
  mutation_in?: Maybe<Array<MutationType>>,
  updatedFields_contains?: Maybe<Scalars['String']>,
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>,
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>,
  node?: Maybe<TrunkedCallSourceWhereInput>,
  AND?: Maybe<Array<TrunkedCallSourceSubscriptionWhereInput>>,
  OR?: Maybe<Array<TrunkedCallSourceSubscriptionWhereInput>>,
  NOT?: Maybe<Array<TrunkedCallSourceSubscriptionWhereInput>>,
};

export type TrunkedCallSourceUpdateDataInput = {
  sourceId?: Maybe<Scalars['Int']>,
  time?: Maybe<Scalars['DateTime']>,
  position?: Maybe<Scalars['Float']>,
};

export type TrunkedCallSourceUpdateInput = {
  sourceId?: Maybe<Scalars['Int']>,
  time?: Maybe<Scalars['DateTime']>,
  position?: Maybe<Scalars['Float']>,
};

export type TrunkedCallSourceUpdateManyDataInput = {
  sourceId?: Maybe<Scalars['Int']>,
  time?: Maybe<Scalars['DateTime']>,
  position?: Maybe<Scalars['Float']>,
};

export type TrunkedCallSourceUpdateManyInput = {
  create?: Maybe<Array<TrunkedCallSourceCreateInput>>,
  update?: Maybe<Array<TrunkedCallSourceUpdateWithWhereUniqueNestedInput>>,
  upsert?: Maybe<Array<TrunkedCallSourceUpsertWithWhereUniqueNestedInput>>,
  delete?: Maybe<Array<TrunkedCallSourceWhereUniqueInput>>,
  connect?: Maybe<Array<TrunkedCallSourceWhereUniqueInput>>,
  set?: Maybe<Array<TrunkedCallSourceWhereUniqueInput>>,
  disconnect?: Maybe<Array<TrunkedCallSourceWhereUniqueInput>>,
  deleteMany?: Maybe<Array<TrunkedCallSourceScalarWhereInput>>,
  updateMany?: Maybe<Array<TrunkedCallSourceUpdateManyWithWhereNestedInput>>,
};

export type TrunkedCallSourceUpdateManyMutationInput = {
  sourceId?: Maybe<Scalars['Int']>,
  time?: Maybe<Scalars['DateTime']>,
  position?: Maybe<Scalars['Float']>,
};

export type TrunkedCallSourceUpdateManyWithWhereNestedInput = {
  where: TrunkedCallSourceScalarWhereInput,
  data: TrunkedCallSourceUpdateManyDataInput,
};

export type TrunkedCallSourceUpdateWithWhereUniqueNestedInput = {
  where: TrunkedCallSourceWhereUniqueInput,
  data: TrunkedCallSourceUpdateDataInput,
};

export type TrunkedCallSourceUpsertWithWhereUniqueNestedInput = {
  where: TrunkedCallSourceWhereUniqueInput,
  update: TrunkedCallSourceUpdateDataInput,
  create: TrunkedCallSourceCreateInput,
};

export type TrunkedCallSourceWhereInput = {
  id?: Maybe<Scalars['ID']>,
  id_not?: Maybe<Scalars['ID']>,
  id_in?: Maybe<Array<Scalars['ID']>>,
  id_not_in?: Maybe<Array<Scalars['ID']>>,
  id_lt?: Maybe<Scalars['ID']>,
  id_lte?: Maybe<Scalars['ID']>,
  id_gt?: Maybe<Scalars['ID']>,
  id_gte?: Maybe<Scalars['ID']>,
  id_contains?: Maybe<Scalars['ID']>,
  id_not_contains?: Maybe<Scalars['ID']>,
  id_starts_with?: Maybe<Scalars['ID']>,
  id_not_starts_with?: Maybe<Scalars['ID']>,
  id_ends_with?: Maybe<Scalars['ID']>,
  id_not_ends_with?: Maybe<Scalars['ID']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
  updatedAt_not?: Maybe<Scalars['DateTime']>,
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_lt?: Maybe<Scalars['DateTime']>,
  updatedAt_lte?: Maybe<Scalars['DateTime']>,
  updatedAt_gt?: Maybe<Scalars['DateTime']>,
  updatedAt_gte?: Maybe<Scalars['DateTime']>,
  createdAt?: Maybe<Scalars['DateTime']>,
  createdAt_not?: Maybe<Scalars['DateTime']>,
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_lt?: Maybe<Scalars['DateTime']>,
  createdAt_lte?: Maybe<Scalars['DateTime']>,
  createdAt_gt?: Maybe<Scalars['DateTime']>,
  createdAt_gte?: Maybe<Scalars['DateTime']>,
  sourceId?: Maybe<Scalars['Int']>,
  sourceId_not?: Maybe<Scalars['Int']>,
  sourceId_in?: Maybe<Array<Scalars['Int']>>,
  sourceId_not_in?: Maybe<Array<Scalars['Int']>>,
  sourceId_lt?: Maybe<Scalars['Int']>,
  sourceId_lte?: Maybe<Scalars['Int']>,
  sourceId_gt?: Maybe<Scalars['Int']>,
  sourceId_gte?: Maybe<Scalars['Int']>,
  time?: Maybe<Scalars['DateTime']>,
  time_not?: Maybe<Scalars['DateTime']>,
  time_in?: Maybe<Array<Scalars['DateTime']>>,
  time_not_in?: Maybe<Array<Scalars['DateTime']>>,
  time_lt?: Maybe<Scalars['DateTime']>,
  time_lte?: Maybe<Scalars['DateTime']>,
  time_gt?: Maybe<Scalars['DateTime']>,
  time_gte?: Maybe<Scalars['DateTime']>,
  position?: Maybe<Scalars['Float']>,
  position_not?: Maybe<Scalars['Float']>,
  position_in?: Maybe<Array<Scalars['Float']>>,
  position_not_in?: Maybe<Array<Scalars['Float']>>,
  position_lt?: Maybe<Scalars['Float']>,
  position_lte?: Maybe<Scalars['Float']>,
  position_gt?: Maybe<Scalars['Float']>,
  position_gte?: Maybe<Scalars['Float']>,
  AND?: Maybe<Array<TrunkedCallSourceWhereInput>>,
  OR?: Maybe<Array<TrunkedCallSourceWhereInput>>,
  NOT?: Maybe<Array<TrunkedCallSourceWhereInput>>,
};

export type TrunkedCallSourceWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>,
};

export type TrunkedCallSubscriptionPayload = {
   __typename?: 'TrunkedCallSubscriptionPayload',
  mutation: MutationType,
  node?: Maybe<TrunkedCall>,
  updatedFields?: Maybe<Array<Scalars['String']>>,
  previousValues?: Maybe<TrunkedCallPreviousValues>,
};

export type TrunkedCallSubscriptionWhereInput = {
  mutation_in?: Maybe<Array<MutationType>>,
  updatedFields_contains?: Maybe<Scalars['String']>,
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>,
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>,
  node?: Maybe<TrunkedCallWhereInput>,
  AND?: Maybe<Array<TrunkedCallSubscriptionWhereInput>>,
  OR?: Maybe<Array<TrunkedCallSubscriptionWhereInput>>,
  NOT?: Maybe<Array<TrunkedCallSubscriptionWhereInput>>,
};

export type TrunkedCallUpdateInput = {
  frequency?: Maybe<Scalars['Int']>,
  startTime?: Maybe<Scalars['DateTime']>,
  endTime?: Maybe<Scalars['DateTime']>,
  emergency?: Maybe<Scalars['Boolean']>,
  talkgroup?: Maybe<TrunkedTalkgroupUpdateOneWithoutCallsInput>,
  system?: Maybe<TrunkedSystemUpdateOneWithoutCallsInput>,
  sources?: Maybe<TrunkedCallSourceUpdateManyInput>,
  duration?: Maybe<Scalars['Float']>,
  source?: Maybe<Scalars['Int']>,
  audioPath?: Maybe<Scalars['String']>,
  frequencyList?: Maybe<TrunkedCallFrequencyTimeUpdateManyInput>,
  callHash?: Maybe<Scalars['String']>,
  wavPath?: Maybe<Scalars['String']>,
  remotePaths?: Maybe<TrunkedCallUpdateremotePathsInput>,
  transcription?: Maybe<TranscriptionUpdateOneWithoutCallInput>,
};

export type TrunkedCallUpdateManyDataInput = {
  frequency?: Maybe<Scalars['Int']>,
  startTime?: Maybe<Scalars['DateTime']>,
  endTime?: Maybe<Scalars['DateTime']>,
  emergency?: Maybe<Scalars['Boolean']>,
  duration?: Maybe<Scalars['Float']>,
  source?: Maybe<Scalars['Int']>,
  audioPath?: Maybe<Scalars['String']>,
  callHash?: Maybe<Scalars['String']>,
  wavPath?: Maybe<Scalars['String']>,
  remotePaths?: Maybe<TrunkedCallUpdateremotePathsInput>,
};

export type TrunkedCallUpdateManyMutationInput = {
  frequency?: Maybe<Scalars['Int']>,
  startTime?: Maybe<Scalars['DateTime']>,
  endTime?: Maybe<Scalars['DateTime']>,
  emergency?: Maybe<Scalars['Boolean']>,
  duration?: Maybe<Scalars['Float']>,
  source?: Maybe<Scalars['Int']>,
  audioPath?: Maybe<Scalars['String']>,
  callHash?: Maybe<Scalars['String']>,
  wavPath?: Maybe<Scalars['String']>,
  remotePaths?: Maybe<TrunkedCallUpdateremotePathsInput>,
};

export type TrunkedCallUpdateManyWithoutSystemInput = {
  create?: Maybe<Array<TrunkedCallCreateWithoutSystemInput>>,
  delete?: Maybe<Array<TrunkedCallWhereUniqueInput>>,
  connect?: Maybe<Array<TrunkedCallWhereUniqueInput>>,
  set?: Maybe<Array<TrunkedCallWhereUniqueInput>>,
  disconnect?: Maybe<Array<TrunkedCallWhereUniqueInput>>,
  update?: Maybe<Array<TrunkedCallUpdateWithWhereUniqueWithoutSystemInput>>,
  upsert?: Maybe<Array<TrunkedCallUpsertWithWhereUniqueWithoutSystemInput>>,
  deleteMany?: Maybe<Array<TrunkedCallScalarWhereInput>>,
  updateMany?: Maybe<Array<TrunkedCallUpdateManyWithWhereNestedInput>>,
};

export type TrunkedCallUpdateManyWithoutTalkgroupInput = {
  create?: Maybe<Array<TrunkedCallCreateWithoutTalkgroupInput>>,
  delete?: Maybe<Array<TrunkedCallWhereUniqueInput>>,
  connect?: Maybe<Array<TrunkedCallWhereUniqueInput>>,
  set?: Maybe<Array<TrunkedCallWhereUniqueInput>>,
  disconnect?: Maybe<Array<TrunkedCallWhereUniqueInput>>,
  update?: Maybe<Array<TrunkedCallUpdateWithWhereUniqueWithoutTalkgroupInput>>,
  upsert?: Maybe<Array<TrunkedCallUpsertWithWhereUniqueWithoutTalkgroupInput>>,
  deleteMany?: Maybe<Array<TrunkedCallScalarWhereInput>>,
  updateMany?: Maybe<Array<TrunkedCallUpdateManyWithWhereNestedInput>>,
};

export type TrunkedCallUpdateManyWithWhereNestedInput = {
  where: TrunkedCallScalarWhereInput,
  data: TrunkedCallUpdateManyDataInput,
};

export type TrunkedCallUpdateOneRequiredWithoutTranscriptionInput = {
  create?: Maybe<TrunkedCallCreateWithoutTranscriptionInput>,
  update?: Maybe<TrunkedCallUpdateWithoutTranscriptionDataInput>,
  upsert?: Maybe<TrunkedCallUpsertWithoutTranscriptionInput>,
  connect?: Maybe<TrunkedCallWhereUniqueInput>,
};

export type TrunkedCallUpdateremotePathsInput = {
  set?: Maybe<Array<Scalars['String']>>,
};

export type TrunkedCallUpdateWithoutSystemDataInput = {
  frequency?: Maybe<Scalars['Int']>,
  startTime?: Maybe<Scalars['DateTime']>,
  endTime?: Maybe<Scalars['DateTime']>,
  emergency?: Maybe<Scalars['Boolean']>,
  talkgroup?: Maybe<TrunkedTalkgroupUpdateOneWithoutCallsInput>,
  sources?: Maybe<TrunkedCallSourceUpdateManyInput>,
  duration?: Maybe<Scalars['Float']>,
  source?: Maybe<Scalars['Int']>,
  audioPath?: Maybe<Scalars['String']>,
  frequencyList?: Maybe<TrunkedCallFrequencyTimeUpdateManyInput>,
  callHash?: Maybe<Scalars['String']>,
  wavPath?: Maybe<Scalars['String']>,
  remotePaths?: Maybe<TrunkedCallUpdateremotePathsInput>,
  transcription?: Maybe<TranscriptionUpdateOneWithoutCallInput>,
};

export type TrunkedCallUpdateWithoutTalkgroupDataInput = {
  frequency?: Maybe<Scalars['Int']>,
  startTime?: Maybe<Scalars['DateTime']>,
  endTime?: Maybe<Scalars['DateTime']>,
  emergency?: Maybe<Scalars['Boolean']>,
  system?: Maybe<TrunkedSystemUpdateOneWithoutCallsInput>,
  sources?: Maybe<TrunkedCallSourceUpdateManyInput>,
  duration?: Maybe<Scalars['Float']>,
  source?: Maybe<Scalars['Int']>,
  audioPath?: Maybe<Scalars['String']>,
  frequencyList?: Maybe<TrunkedCallFrequencyTimeUpdateManyInput>,
  callHash?: Maybe<Scalars['String']>,
  wavPath?: Maybe<Scalars['String']>,
  remotePaths?: Maybe<TrunkedCallUpdateremotePathsInput>,
  transcription?: Maybe<TranscriptionUpdateOneWithoutCallInput>,
};

export type TrunkedCallUpdateWithoutTranscriptionDataInput = {
  frequency?: Maybe<Scalars['Int']>,
  startTime?: Maybe<Scalars['DateTime']>,
  endTime?: Maybe<Scalars['DateTime']>,
  emergency?: Maybe<Scalars['Boolean']>,
  talkgroup?: Maybe<TrunkedTalkgroupUpdateOneWithoutCallsInput>,
  system?: Maybe<TrunkedSystemUpdateOneWithoutCallsInput>,
  sources?: Maybe<TrunkedCallSourceUpdateManyInput>,
  duration?: Maybe<Scalars['Float']>,
  source?: Maybe<Scalars['Int']>,
  audioPath?: Maybe<Scalars['String']>,
  frequencyList?: Maybe<TrunkedCallFrequencyTimeUpdateManyInput>,
  callHash?: Maybe<Scalars['String']>,
  wavPath?: Maybe<Scalars['String']>,
  remotePaths?: Maybe<TrunkedCallUpdateremotePathsInput>,
};

export type TrunkedCallUpdateWithWhereUniqueWithoutSystemInput = {
  where: TrunkedCallWhereUniqueInput,
  data: TrunkedCallUpdateWithoutSystemDataInput,
};

export type TrunkedCallUpdateWithWhereUniqueWithoutTalkgroupInput = {
  where: TrunkedCallWhereUniqueInput,
  data: TrunkedCallUpdateWithoutTalkgroupDataInput,
};

export type TrunkedCallUpsertWithoutTranscriptionInput = {
  update: TrunkedCallUpdateWithoutTranscriptionDataInput,
  create: TrunkedCallCreateWithoutTranscriptionInput,
};

export type TrunkedCallUpsertWithWhereUniqueWithoutSystemInput = {
  where: TrunkedCallWhereUniqueInput,
  update: TrunkedCallUpdateWithoutSystemDataInput,
  create: TrunkedCallCreateWithoutSystemInput,
};

export type TrunkedCallUpsertWithWhereUniqueWithoutTalkgroupInput = {
  where: TrunkedCallWhereUniqueInput,
  update: TrunkedCallUpdateWithoutTalkgroupDataInput,
  create: TrunkedCallCreateWithoutTalkgroupInput,
};

export type TrunkedCallWhereInput = {
  id?: Maybe<Scalars['ID']>,
  id_not?: Maybe<Scalars['ID']>,
  id_in?: Maybe<Array<Scalars['ID']>>,
  id_not_in?: Maybe<Array<Scalars['ID']>>,
  id_lt?: Maybe<Scalars['ID']>,
  id_lte?: Maybe<Scalars['ID']>,
  id_gt?: Maybe<Scalars['ID']>,
  id_gte?: Maybe<Scalars['ID']>,
  id_contains?: Maybe<Scalars['ID']>,
  id_not_contains?: Maybe<Scalars['ID']>,
  id_starts_with?: Maybe<Scalars['ID']>,
  id_not_starts_with?: Maybe<Scalars['ID']>,
  id_ends_with?: Maybe<Scalars['ID']>,
  id_not_ends_with?: Maybe<Scalars['ID']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
  updatedAt_not?: Maybe<Scalars['DateTime']>,
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_lt?: Maybe<Scalars['DateTime']>,
  updatedAt_lte?: Maybe<Scalars['DateTime']>,
  updatedAt_gt?: Maybe<Scalars['DateTime']>,
  updatedAt_gte?: Maybe<Scalars['DateTime']>,
  createdAt?: Maybe<Scalars['DateTime']>,
  createdAt_not?: Maybe<Scalars['DateTime']>,
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_lt?: Maybe<Scalars['DateTime']>,
  createdAt_lte?: Maybe<Scalars['DateTime']>,
  createdAt_gt?: Maybe<Scalars['DateTime']>,
  createdAt_gte?: Maybe<Scalars['DateTime']>,
  frequency?: Maybe<Scalars['Int']>,
  frequency_not?: Maybe<Scalars['Int']>,
  frequency_in?: Maybe<Array<Scalars['Int']>>,
  frequency_not_in?: Maybe<Array<Scalars['Int']>>,
  frequency_lt?: Maybe<Scalars['Int']>,
  frequency_lte?: Maybe<Scalars['Int']>,
  frequency_gt?: Maybe<Scalars['Int']>,
  frequency_gte?: Maybe<Scalars['Int']>,
  startTime?: Maybe<Scalars['DateTime']>,
  startTime_not?: Maybe<Scalars['DateTime']>,
  startTime_in?: Maybe<Array<Scalars['DateTime']>>,
  startTime_not_in?: Maybe<Array<Scalars['DateTime']>>,
  startTime_lt?: Maybe<Scalars['DateTime']>,
  startTime_lte?: Maybe<Scalars['DateTime']>,
  startTime_gt?: Maybe<Scalars['DateTime']>,
  startTime_gte?: Maybe<Scalars['DateTime']>,
  endTime?: Maybe<Scalars['DateTime']>,
  endTime_not?: Maybe<Scalars['DateTime']>,
  endTime_in?: Maybe<Array<Scalars['DateTime']>>,
  endTime_not_in?: Maybe<Array<Scalars['DateTime']>>,
  endTime_lt?: Maybe<Scalars['DateTime']>,
  endTime_lte?: Maybe<Scalars['DateTime']>,
  endTime_gt?: Maybe<Scalars['DateTime']>,
  endTime_gte?: Maybe<Scalars['DateTime']>,
  emergency?: Maybe<Scalars['Boolean']>,
  emergency_not?: Maybe<Scalars['Boolean']>,
  talkgroup?: Maybe<TrunkedTalkgroupWhereInput>,
  system?: Maybe<TrunkedSystemWhereInput>,
  sources_every?: Maybe<TrunkedCallSourceWhereInput>,
  sources_some?: Maybe<TrunkedCallSourceWhereInput>,
  sources_none?: Maybe<TrunkedCallSourceWhereInput>,
  duration?: Maybe<Scalars['Float']>,
  duration_not?: Maybe<Scalars['Float']>,
  duration_in?: Maybe<Array<Scalars['Float']>>,
  duration_not_in?: Maybe<Array<Scalars['Float']>>,
  duration_lt?: Maybe<Scalars['Float']>,
  duration_lte?: Maybe<Scalars['Float']>,
  duration_gt?: Maybe<Scalars['Float']>,
  duration_gte?: Maybe<Scalars['Float']>,
  source?: Maybe<Scalars['Int']>,
  source_not?: Maybe<Scalars['Int']>,
  source_in?: Maybe<Array<Scalars['Int']>>,
  source_not_in?: Maybe<Array<Scalars['Int']>>,
  source_lt?: Maybe<Scalars['Int']>,
  source_lte?: Maybe<Scalars['Int']>,
  source_gt?: Maybe<Scalars['Int']>,
  source_gte?: Maybe<Scalars['Int']>,
  audioPath?: Maybe<Scalars['String']>,
  audioPath_not?: Maybe<Scalars['String']>,
  audioPath_in?: Maybe<Array<Scalars['String']>>,
  audioPath_not_in?: Maybe<Array<Scalars['String']>>,
  audioPath_lt?: Maybe<Scalars['String']>,
  audioPath_lte?: Maybe<Scalars['String']>,
  audioPath_gt?: Maybe<Scalars['String']>,
  audioPath_gte?: Maybe<Scalars['String']>,
  audioPath_contains?: Maybe<Scalars['String']>,
  audioPath_not_contains?: Maybe<Scalars['String']>,
  audioPath_starts_with?: Maybe<Scalars['String']>,
  audioPath_not_starts_with?: Maybe<Scalars['String']>,
  audioPath_ends_with?: Maybe<Scalars['String']>,
  audioPath_not_ends_with?: Maybe<Scalars['String']>,
  frequencyList_every?: Maybe<TrunkedCallFrequencyTimeWhereInput>,
  frequencyList_some?: Maybe<TrunkedCallFrequencyTimeWhereInput>,
  frequencyList_none?: Maybe<TrunkedCallFrequencyTimeWhereInput>,
  callHash?: Maybe<Scalars['String']>,
  callHash_not?: Maybe<Scalars['String']>,
  callHash_in?: Maybe<Array<Scalars['String']>>,
  callHash_not_in?: Maybe<Array<Scalars['String']>>,
  callHash_lt?: Maybe<Scalars['String']>,
  callHash_lte?: Maybe<Scalars['String']>,
  callHash_gt?: Maybe<Scalars['String']>,
  callHash_gte?: Maybe<Scalars['String']>,
  callHash_contains?: Maybe<Scalars['String']>,
  callHash_not_contains?: Maybe<Scalars['String']>,
  callHash_starts_with?: Maybe<Scalars['String']>,
  callHash_not_starts_with?: Maybe<Scalars['String']>,
  callHash_ends_with?: Maybe<Scalars['String']>,
  callHash_not_ends_with?: Maybe<Scalars['String']>,
  wavPath?: Maybe<Scalars['String']>,
  wavPath_not?: Maybe<Scalars['String']>,
  wavPath_in?: Maybe<Array<Scalars['String']>>,
  wavPath_not_in?: Maybe<Array<Scalars['String']>>,
  wavPath_lt?: Maybe<Scalars['String']>,
  wavPath_lte?: Maybe<Scalars['String']>,
  wavPath_gt?: Maybe<Scalars['String']>,
  wavPath_gte?: Maybe<Scalars['String']>,
  wavPath_contains?: Maybe<Scalars['String']>,
  wavPath_not_contains?: Maybe<Scalars['String']>,
  wavPath_starts_with?: Maybe<Scalars['String']>,
  wavPath_not_starts_with?: Maybe<Scalars['String']>,
  wavPath_ends_with?: Maybe<Scalars['String']>,
  wavPath_not_ends_with?: Maybe<Scalars['String']>,
  transcription?: Maybe<TranscriptionWhereInput>,
  AND?: Maybe<Array<TrunkedCallWhereInput>>,
  OR?: Maybe<Array<TrunkedCallWhereInput>>,
  NOT?: Maybe<Array<TrunkedCallWhereInput>>,
};

export type TrunkedCallWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>,
  callHash?: Maybe<Scalars['String']>,
};

export type TrunkedConfig = {
   __typename?: 'TrunkedConfig',
  id: Scalars['ID'],
  updatedAt: Scalars['DateTime'],
  createdAt: Scalars['DateTime'],
  name: Scalars['String'],
  sources?: Maybe<Array<TrunkedSource>>,
  systems?: Maybe<Array<TrunkedSystem>>,
  defaultMode: TrunkedDefaultMode,
  captureDir: Scalars['String'],
  callTimeout: Scalars['Int'],
  logFile: Scalars['Boolean'],
  frequencyFormat: TrunkedFrequencyFormat,
  controlWarnRate: Scalars['Int'],
  statusAsString: Scalars['Boolean'],
};


export type TrunkedConfigSourcesArgs = {
  where?: Maybe<TrunkedSourceWhereInput>,
  orderBy?: Maybe<TrunkedSourceOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type TrunkedConfigSystemsArgs = {
  where?: Maybe<TrunkedSystemWhereInput>,
  orderBy?: Maybe<TrunkedSystemOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};

export type TrunkedConfigConnection = {
   __typename?: 'TrunkedConfigConnection',
  pageInfo: PageInfo,
  edges: Array<Maybe<TrunkedConfigEdge>>,
  aggregate: AggregateTrunkedConfig,
};

export type TrunkedConfigCreateInput = {
  id?: Maybe<Scalars['ID']>,
  name: Scalars['String'],
  sources?: Maybe<TrunkedSourceCreateManyInput>,
  systems?: Maybe<TrunkedSystemCreateManyInput>,
  defaultMode?: Maybe<TrunkedDefaultMode>,
  captureDir: Scalars['String'],
  callTimeout?: Maybe<Scalars['Int']>,
  logFile?: Maybe<Scalars['Boolean']>,
  frequencyFormat?: Maybe<TrunkedFrequencyFormat>,
  controlWarnRate?: Maybe<Scalars['Int']>,
  statusAsString?: Maybe<Scalars['Boolean']>,
};

export type TrunkedConfigEdge = {
   __typename?: 'TrunkedConfigEdge',
  node: TrunkedConfig,
  cursor: Scalars['String'],
};

export enum TrunkedConfigOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  DefaultModeAsc = 'defaultMode_ASC',
  DefaultModeDesc = 'defaultMode_DESC',
  CaptureDirAsc = 'captureDir_ASC',
  CaptureDirDesc = 'captureDir_DESC',
  CallTimeoutAsc = 'callTimeout_ASC',
  CallTimeoutDesc = 'callTimeout_DESC',
  LogFileAsc = 'logFile_ASC',
  LogFileDesc = 'logFile_DESC',
  FrequencyFormatAsc = 'frequencyFormat_ASC',
  FrequencyFormatDesc = 'frequencyFormat_DESC',
  ControlWarnRateAsc = 'controlWarnRate_ASC',
  ControlWarnRateDesc = 'controlWarnRate_DESC',
  StatusAsStringAsc = 'statusAsString_ASC',
  StatusAsStringDesc = 'statusAsString_DESC'
}

export type TrunkedConfigPreviousValues = {
   __typename?: 'TrunkedConfigPreviousValues',
  id: Scalars['ID'],
  updatedAt: Scalars['DateTime'],
  createdAt: Scalars['DateTime'],
  name: Scalars['String'],
  defaultMode: TrunkedDefaultMode,
  captureDir: Scalars['String'],
  callTimeout: Scalars['Int'],
  logFile: Scalars['Boolean'],
  frequencyFormat: TrunkedFrequencyFormat,
  controlWarnRate: Scalars['Int'],
  statusAsString: Scalars['Boolean'],
};

export type TrunkedConfigSubscriptionPayload = {
   __typename?: 'TrunkedConfigSubscriptionPayload',
  mutation: MutationType,
  node?: Maybe<TrunkedConfig>,
  updatedFields?: Maybe<Array<Scalars['String']>>,
  previousValues?: Maybe<TrunkedConfigPreviousValues>,
};

export type TrunkedConfigSubscriptionWhereInput = {
  mutation_in?: Maybe<Array<MutationType>>,
  updatedFields_contains?: Maybe<Scalars['String']>,
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>,
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>,
  node?: Maybe<TrunkedConfigWhereInput>,
  AND?: Maybe<Array<TrunkedConfigSubscriptionWhereInput>>,
  OR?: Maybe<Array<TrunkedConfigSubscriptionWhereInput>>,
  NOT?: Maybe<Array<TrunkedConfigSubscriptionWhereInput>>,
};

export type TrunkedConfigUpdateInput = {
  name?: Maybe<Scalars['String']>,
  sources?: Maybe<TrunkedSourceUpdateManyInput>,
  systems?: Maybe<TrunkedSystemUpdateManyInput>,
  defaultMode?: Maybe<TrunkedDefaultMode>,
  captureDir?: Maybe<Scalars['String']>,
  callTimeout?: Maybe<Scalars['Int']>,
  logFile?: Maybe<Scalars['Boolean']>,
  frequencyFormat?: Maybe<TrunkedFrequencyFormat>,
  controlWarnRate?: Maybe<Scalars['Int']>,
  statusAsString?: Maybe<Scalars['Boolean']>,
};

export type TrunkedConfigUpdateManyMutationInput = {
  name?: Maybe<Scalars['String']>,
  defaultMode?: Maybe<TrunkedDefaultMode>,
  captureDir?: Maybe<Scalars['String']>,
  callTimeout?: Maybe<Scalars['Int']>,
  logFile?: Maybe<Scalars['Boolean']>,
  frequencyFormat?: Maybe<TrunkedFrequencyFormat>,
  controlWarnRate?: Maybe<Scalars['Int']>,
  statusAsString?: Maybe<Scalars['Boolean']>,
};

export type TrunkedConfigWhereInput = {
  id?: Maybe<Scalars['ID']>,
  id_not?: Maybe<Scalars['ID']>,
  id_in?: Maybe<Array<Scalars['ID']>>,
  id_not_in?: Maybe<Array<Scalars['ID']>>,
  id_lt?: Maybe<Scalars['ID']>,
  id_lte?: Maybe<Scalars['ID']>,
  id_gt?: Maybe<Scalars['ID']>,
  id_gte?: Maybe<Scalars['ID']>,
  id_contains?: Maybe<Scalars['ID']>,
  id_not_contains?: Maybe<Scalars['ID']>,
  id_starts_with?: Maybe<Scalars['ID']>,
  id_not_starts_with?: Maybe<Scalars['ID']>,
  id_ends_with?: Maybe<Scalars['ID']>,
  id_not_ends_with?: Maybe<Scalars['ID']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
  updatedAt_not?: Maybe<Scalars['DateTime']>,
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_lt?: Maybe<Scalars['DateTime']>,
  updatedAt_lte?: Maybe<Scalars['DateTime']>,
  updatedAt_gt?: Maybe<Scalars['DateTime']>,
  updatedAt_gte?: Maybe<Scalars['DateTime']>,
  createdAt?: Maybe<Scalars['DateTime']>,
  createdAt_not?: Maybe<Scalars['DateTime']>,
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_lt?: Maybe<Scalars['DateTime']>,
  createdAt_lte?: Maybe<Scalars['DateTime']>,
  createdAt_gt?: Maybe<Scalars['DateTime']>,
  createdAt_gte?: Maybe<Scalars['DateTime']>,
  name?: Maybe<Scalars['String']>,
  name_not?: Maybe<Scalars['String']>,
  name_in?: Maybe<Array<Scalars['String']>>,
  name_not_in?: Maybe<Array<Scalars['String']>>,
  name_lt?: Maybe<Scalars['String']>,
  name_lte?: Maybe<Scalars['String']>,
  name_gt?: Maybe<Scalars['String']>,
  name_gte?: Maybe<Scalars['String']>,
  name_contains?: Maybe<Scalars['String']>,
  name_not_contains?: Maybe<Scalars['String']>,
  name_starts_with?: Maybe<Scalars['String']>,
  name_not_starts_with?: Maybe<Scalars['String']>,
  name_ends_with?: Maybe<Scalars['String']>,
  name_not_ends_with?: Maybe<Scalars['String']>,
  sources_every?: Maybe<TrunkedSourceWhereInput>,
  sources_some?: Maybe<TrunkedSourceWhereInput>,
  sources_none?: Maybe<TrunkedSourceWhereInput>,
  systems_every?: Maybe<TrunkedSystemWhereInput>,
  systems_some?: Maybe<TrunkedSystemWhereInput>,
  systems_none?: Maybe<TrunkedSystemWhereInput>,
  defaultMode?: Maybe<TrunkedDefaultMode>,
  defaultMode_not?: Maybe<TrunkedDefaultMode>,
  defaultMode_in?: Maybe<Array<TrunkedDefaultMode>>,
  defaultMode_not_in?: Maybe<Array<TrunkedDefaultMode>>,
  captureDir?: Maybe<Scalars['String']>,
  captureDir_not?: Maybe<Scalars['String']>,
  captureDir_in?: Maybe<Array<Scalars['String']>>,
  captureDir_not_in?: Maybe<Array<Scalars['String']>>,
  captureDir_lt?: Maybe<Scalars['String']>,
  captureDir_lte?: Maybe<Scalars['String']>,
  captureDir_gt?: Maybe<Scalars['String']>,
  captureDir_gte?: Maybe<Scalars['String']>,
  captureDir_contains?: Maybe<Scalars['String']>,
  captureDir_not_contains?: Maybe<Scalars['String']>,
  captureDir_starts_with?: Maybe<Scalars['String']>,
  captureDir_not_starts_with?: Maybe<Scalars['String']>,
  captureDir_ends_with?: Maybe<Scalars['String']>,
  captureDir_not_ends_with?: Maybe<Scalars['String']>,
  callTimeout?: Maybe<Scalars['Int']>,
  callTimeout_not?: Maybe<Scalars['Int']>,
  callTimeout_in?: Maybe<Array<Scalars['Int']>>,
  callTimeout_not_in?: Maybe<Array<Scalars['Int']>>,
  callTimeout_lt?: Maybe<Scalars['Int']>,
  callTimeout_lte?: Maybe<Scalars['Int']>,
  callTimeout_gt?: Maybe<Scalars['Int']>,
  callTimeout_gte?: Maybe<Scalars['Int']>,
  logFile?: Maybe<Scalars['Boolean']>,
  logFile_not?: Maybe<Scalars['Boolean']>,
  frequencyFormat?: Maybe<TrunkedFrequencyFormat>,
  frequencyFormat_not?: Maybe<TrunkedFrequencyFormat>,
  frequencyFormat_in?: Maybe<Array<TrunkedFrequencyFormat>>,
  frequencyFormat_not_in?: Maybe<Array<TrunkedFrequencyFormat>>,
  controlWarnRate?: Maybe<Scalars['Int']>,
  controlWarnRate_not?: Maybe<Scalars['Int']>,
  controlWarnRate_in?: Maybe<Array<Scalars['Int']>>,
  controlWarnRate_not_in?: Maybe<Array<Scalars['Int']>>,
  controlWarnRate_lt?: Maybe<Scalars['Int']>,
  controlWarnRate_lte?: Maybe<Scalars['Int']>,
  controlWarnRate_gt?: Maybe<Scalars['Int']>,
  controlWarnRate_gte?: Maybe<Scalars['Int']>,
  statusAsString?: Maybe<Scalars['Boolean']>,
  statusAsString_not?: Maybe<Scalars['Boolean']>,
  AND?: Maybe<Array<TrunkedConfigWhereInput>>,
  OR?: Maybe<Array<TrunkedConfigWhereInput>>,
  NOT?: Maybe<Array<TrunkedConfigWhereInput>>,
};

export type TrunkedConfigWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
};

export enum TrunkedDefaultMode {
  Analog = 'ANALOG',
  Digital = 'DIGITAL'
}

export enum TrunkedFrequencyFormat {
  Exp = 'EXP',
  Mhz = 'MHZ',
  Hz = 'HZ'
}

export enum TrunkedModulation {
  Qpsk = 'QPSK',
  Fsk4 = 'FSK4'
}

export enum TrunkedSmartnetBandplan {
  Standard_800 = 'STANDARD_800',
  Reband_800 = 'REBAND_800',
  Splinter_800 = 'SPLINTER_800',
  Custom_400 = 'CUSTOM_400'
}

export type TrunkedSource = {
   __typename?: 'TrunkedSource',
  id: Scalars['ID'],
  updatedAt: Scalars['DateTime'],
  createdAt: Scalars['DateTime'],
  center: Scalars['Float'],
  rate: Scalars['Float'],
  squelch: Scalars['Float'],
  error: Scalars['Float'],
  gain: Scalars['Float'],
  digitalRecorders: Scalars['Float'],
  digitalLevels: Scalars['Float'],
  analogRecorders: Scalars['Float'],
  analogLevels: Scalars['Float'],
  device?: Maybe<Scalars['String']>,
  modulation: TrunkedModulation,
};

export type TrunkedSourceConnection = {
   __typename?: 'TrunkedSourceConnection',
  pageInfo: PageInfo,
  edges: Array<Maybe<TrunkedSourceEdge>>,
  aggregate: AggregateTrunkedSource,
};

export type TrunkedSourceCreateInput = {
  id?: Maybe<Scalars['ID']>,
  center: Scalars['Float'],
  rate: Scalars['Float'],
  squelch?: Maybe<Scalars['Float']>,
  error?: Maybe<Scalars['Float']>,
  gain?: Maybe<Scalars['Float']>,
  digitalRecorders?: Maybe<Scalars['Float']>,
  digitalLevels?: Maybe<Scalars['Float']>,
  analogRecorders?: Maybe<Scalars['Float']>,
  analogLevels?: Maybe<Scalars['Float']>,
  device?: Maybe<Scalars['String']>,
  modulation: TrunkedModulation,
};

export type TrunkedSourceCreateManyInput = {
  create?: Maybe<Array<TrunkedSourceCreateInput>>,
  connect?: Maybe<Array<TrunkedSourceWhereUniqueInput>>,
};

export type TrunkedSourceEdge = {
   __typename?: 'TrunkedSourceEdge',
  node: TrunkedSource,
  cursor: Scalars['String'],
};

export enum TrunkedSourceOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  CenterAsc = 'center_ASC',
  CenterDesc = 'center_DESC',
  RateAsc = 'rate_ASC',
  RateDesc = 'rate_DESC',
  SquelchAsc = 'squelch_ASC',
  SquelchDesc = 'squelch_DESC',
  ErrorAsc = 'error_ASC',
  ErrorDesc = 'error_DESC',
  GainAsc = 'gain_ASC',
  GainDesc = 'gain_DESC',
  DigitalRecordersAsc = 'digitalRecorders_ASC',
  DigitalRecordersDesc = 'digitalRecorders_DESC',
  DigitalLevelsAsc = 'digitalLevels_ASC',
  DigitalLevelsDesc = 'digitalLevels_DESC',
  AnalogRecordersAsc = 'analogRecorders_ASC',
  AnalogRecordersDesc = 'analogRecorders_DESC',
  AnalogLevelsAsc = 'analogLevels_ASC',
  AnalogLevelsDesc = 'analogLevels_DESC',
  DeviceAsc = 'device_ASC',
  DeviceDesc = 'device_DESC',
  ModulationAsc = 'modulation_ASC',
  ModulationDesc = 'modulation_DESC'
}

export type TrunkedSourcePreviousValues = {
   __typename?: 'TrunkedSourcePreviousValues',
  id: Scalars['ID'],
  updatedAt: Scalars['DateTime'],
  createdAt: Scalars['DateTime'],
  center: Scalars['Float'],
  rate: Scalars['Float'],
  squelch: Scalars['Float'],
  error: Scalars['Float'],
  gain: Scalars['Float'],
  digitalRecorders: Scalars['Float'],
  digitalLevels: Scalars['Float'],
  analogRecorders: Scalars['Float'],
  analogLevels: Scalars['Float'],
  device?: Maybe<Scalars['String']>,
  modulation: TrunkedModulation,
};

export type TrunkedSourceScalarWhereInput = {
  id?: Maybe<Scalars['ID']>,
  id_not?: Maybe<Scalars['ID']>,
  id_in?: Maybe<Array<Scalars['ID']>>,
  id_not_in?: Maybe<Array<Scalars['ID']>>,
  id_lt?: Maybe<Scalars['ID']>,
  id_lte?: Maybe<Scalars['ID']>,
  id_gt?: Maybe<Scalars['ID']>,
  id_gte?: Maybe<Scalars['ID']>,
  id_contains?: Maybe<Scalars['ID']>,
  id_not_contains?: Maybe<Scalars['ID']>,
  id_starts_with?: Maybe<Scalars['ID']>,
  id_not_starts_with?: Maybe<Scalars['ID']>,
  id_ends_with?: Maybe<Scalars['ID']>,
  id_not_ends_with?: Maybe<Scalars['ID']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
  updatedAt_not?: Maybe<Scalars['DateTime']>,
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_lt?: Maybe<Scalars['DateTime']>,
  updatedAt_lte?: Maybe<Scalars['DateTime']>,
  updatedAt_gt?: Maybe<Scalars['DateTime']>,
  updatedAt_gte?: Maybe<Scalars['DateTime']>,
  createdAt?: Maybe<Scalars['DateTime']>,
  createdAt_not?: Maybe<Scalars['DateTime']>,
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_lt?: Maybe<Scalars['DateTime']>,
  createdAt_lte?: Maybe<Scalars['DateTime']>,
  createdAt_gt?: Maybe<Scalars['DateTime']>,
  createdAt_gte?: Maybe<Scalars['DateTime']>,
  center?: Maybe<Scalars['Float']>,
  center_not?: Maybe<Scalars['Float']>,
  center_in?: Maybe<Array<Scalars['Float']>>,
  center_not_in?: Maybe<Array<Scalars['Float']>>,
  center_lt?: Maybe<Scalars['Float']>,
  center_lte?: Maybe<Scalars['Float']>,
  center_gt?: Maybe<Scalars['Float']>,
  center_gte?: Maybe<Scalars['Float']>,
  rate?: Maybe<Scalars['Float']>,
  rate_not?: Maybe<Scalars['Float']>,
  rate_in?: Maybe<Array<Scalars['Float']>>,
  rate_not_in?: Maybe<Array<Scalars['Float']>>,
  rate_lt?: Maybe<Scalars['Float']>,
  rate_lte?: Maybe<Scalars['Float']>,
  rate_gt?: Maybe<Scalars['Float']>,
  rate_gte?: Maybe<Scalars['Float']>,
  squelch?: Maybe<Scalars['Float']>,
  squelch_not?: Maybe<Scalars['Float']>,
  squelch_in?: Maybe<Array<Scalars['Float']>>,
  squelch_not_in?: Maybe<Array<Scalars['Float']>>,
  squelch_lt?: Maybe<Scalars['Float']>,
  squelch_lte?: Maybe<Scalars['Float']>,
  squelch_gt?: Maybe<Scalars['Float']>,
  squelch_gte?: Maybe<Scalars['Float']>,
  error?: Maybe<Scalars['Float']>,
  error_not?: Maybe<Scalars['Float']>,
  error_in?: Maybe<Array<Scalars['Float']>>,
  error_not_in?: Maybe<Array<Scalars['Float']>>,
  error_lt?: Maybe<Scalars['Float']>,
  error_lte?: Maybe<Scalars['Float']>,
  error_gt?: Maybe<Scalars['Float']>,
  error_gte?: Maybe<Scalars['Float']>,
  gain?: Maybe<Scalars['Float']>,
  gain_not?: Maybe<Scalars['Float']>,
  gain_in?: Maybe<Array<Scalars['Float']>>,
  gain_not_in?: Maybe<Array<Scalars['Float']>>,
  gain_lt?: Maybe<Scalars['Float']>,
  gain_lte?: Maybe<Scalars['Float']>,
  gain_gt?: Maybe<Scalars['Float']>,
  gain_gte?: Maybe<Scalars['Float']>,
  digitalRecorders?: Maybe<Scalars['Float']>,
  digitalRecorders_not?: Maybe<Scalars['Float']>,
  digitalRecorders_in?: Maybe<Array<Scalars['Float']>>,
  digitalRecorders_not_in?: Maybe<Array<Scalars['Float']>>,
  digitalRecorders_lt?: Maybe<Scalars['Float']>,
  digitalRecorders_lte?: Maybe<Scalars['Float']>,
  digitalRecorders_gt?: Maybe<Scalars['Float']>,
  digitalRecorders_gte?: Maybe<Scalars['Float']>,
  digitalLevels?: Maybe<Scalars['Float']>,
  digitalLevels_not?: Maybe<Scalars['Float']>,
  digitalLevels_in?: Maybe<Array<Scalars['Float']>>,
  digitalLevels_not_in?: Maybe<Array<Scalars['Float']>>,
  digitalLevels_lt?: Maybe<Scalars['Float']>,
  digitalLevels_lte?: Maybe<Scalars['Float']>,
  digitalLevels_gt?: Maybe<Scalars['Float']>,
  digitalLevels_gte?: Maybe<Scalars['Float']>,
  analogRecorders?: Maybe<Scalars['Float']>,
  analogRecorders_not?: Maybe<Scalars['Float']>,
  analogRecorders_in?: Maybe<Array<Scalars['Float']>>,
  analogRecorders_not_in?: Maybe<Array<Scalars['Float']>>,
  analogRecorders_lt?: Maybe<Scalars['Float']>,
  analogRecorders_lte?: Maybe<Scalars['Float']>,
  analogRecorders_gt?: Maybe<Scalars['Float']>,
  analogRecorders_gte?: Maybe<Scalars['Float']>,
  analogLevels?: Maybe<Scalars['Float']>,
  analogLevels_not?: Maybe<Scalars['Float']>,
  analogLevels_in?: Maybe<Array<Scalars['Float']>>,
  analogLevels_not_in?: Maybe<Array<Scalars['Float']>>,
  analogLevels_lt?: Maybe<Scalars['Float']>,
  analogLevels_lte?: Maybe<Scalars['Float']>,
  analogLevels_gt?: Maybe<Scalars['Float']>,
  analogLevels_gte?: Maybe<Scalars['Float']>,
  device?: Maybe<Scalars['String']>,
  device_not?: Maybe<Scalars['String']>,
  device_in?: Maybe<Array<Scalars['String']>>,
  device_not_in?: Maybe<Array<Scalars['String']>>,
  device_lt?: Maybe<Scalars['String']>,
  device_lte?: Maybe<Scalars['String']>,
  device_gt?: Maybe<Scalars['String']>,
  device_gte?: Maybe<Scalars['String']>,
  device_contains?: Maybe<Scalars['String']>,
  device_not_contains?: Maybe<Scalars['String']>,
  device_starts_with?: Maybe<Scalars['String']>,
  device_not_starts_with?: Maybe<Scalars['String']>,
  device_ends_with?: Maybe<Scalars['String']>,
  device_not_ends_with?: Maybe<Scalars['String']>,
  modulation?: Maybe<TrunkedModulation>,
  modulation_not?: Maybe<TrunkedModulation>,
  modulation_in?: Maybe<Array<TrunkedModulation>>,
  modulation_not_in?: Maybe<Array<TrunkedModulation>>,
  AND?: Maybe<Array<TrunkedSourceScalarWhereInput>>,
  OR?: Maybe<Array<TrunkedSourceScalarWhereInput>>,
  NOT?: Maybe<Array<TrunkedSourceScalarWhereInput>>,
};

export type TrunkedSourceSubscriptionPayload = {
   __typename?: 'TrunkedSourceSubscriptionPayload',
  mutation: MutationType,
  node?: Maybe<TrunkedSource>,
  updatedFields?: Maybe<Array<Scalars['String']>>,
  previousValues?: Maybe<TrunkedSourcePreviousValues>,
};

export type TrunkedSourceSubscriptionWhereInput = {
  mutation_in?: Maybe<Array<MutationType>>,
  updatedFields_contains?: Maybe<Scalars['String']>,
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>,
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>,
  node?: Maybe<TrunkedSourceWhereInput>,
  AND?: Maybe<Array<TrunkedSourceSubscriptionWhereInput>>,
  OR?: Maybe<Array<TrunkedSourceSubscriptionWhereInput>>,
  NOT?: Maybe<Array<TrunkedSourceSubscriptionWhereInput>>,
};

export type TrunkedSourceUpdateDataInput = {
  center?: Maybe<Scalars['Float']>,
  rate?: Maybe<Scalars['Float']>,
  squelch?: Maybe<Scalars['Float']>,
  error?: Maybe<Scalars['Float']>,
  gain?: Maybe<Scalars['Float']>,
  digitalRecorders?: Maybe<Scalars['Float']>,
  digitalLevels?: Maybe<Scalars['Float']>,
  analogRecorders?: Maybe<Scalars['Float']>,
  analogLevels?: Maybe<Scalars['Float']>,
  device?: Maybe<Scalars['String']>,
  modulation?: Maybe<TrunkedModulation>,
};

export type TrunkedSourceUpdateInput = {
  center?: Maybe<Scalars['Float']>,
  rate?: Maybe<Scalars['Float']>,
  squelch?: Maybe<Scalars['Float']>,
  error?: Maybe<Scalars['Float']>,
  gain?: Maybe<Scalars['Float']>,
  digitalRecorders?: Maybe<Scalars['Float']>,
  digitalLevels?: Maybe<Scalars['Float']>,
  analogRecorders?: Maybe<Scalars['Float']>,
  analogLevels?: Maybe<Scalars['Float']>,
  device?: Maybe<Scalars['String']>,
  modulation?: Maybe<TrunkedModulation>,
};

export type TrunkedSourceUpdateManyDataInput = {
  center?: Maybe<Scalars['Float']>,
  rate?: Maybe<Scalars['Float']>,
  squelch?: Maybe<Scalars['Float']>,
  error?: Maybe<Scalars['Float']>,
  gain?: Maybe<Scalars['Float']>,
  digitalRecorders?: Maybe<Scalars['Float']>,
  digitalLevels?: Maybe<Scalars['Float']>,
  analogRecorders?: Maybe<Scalars['Float']>,
  analogLevels?: Maybe<Scalars['Float']>,
  device?: Maybe<Scalars['String']>,
  modulation?: Maybe<TrunkedModulation>,
};

export type TrunkedSourceUpdateManyInput = {
  create?: Maybe<Array<TrunkedSourceCreateInput>>,
  update?: Maybe<Array<TrunkedSourceUpdateWithWhereUniqueNestedInput>>,
  upsert?: Maybe<Array<TrunkedSourceUpsertWithWhereUniqueNestedInput>>,
  delete?: Maybe<Array<TrunkedSourceWhereUniqueInput>>,
  connect?: Maybe<Array<TrunkedSourceWhereUniqueInput>>,
  set?: Maybe<Array<TrunkedSourceWhereUniqueInput>>,
  disconnect?: Maybe<Array<TrunkedSourceWhereUniqueInput>>,
  deleteMany?: Maybe<Array<TrunkedSourceScalarWhereInput>>,
  updateMany?: Maybe<Array<TrunkedSourceUpdateManyWithWhereNestedInput>>,
};

export type TrunkedSourceUpdateManyMutationInput = {
  center?: Maybe<Scalars['Float']>,
  rate?: Maybe<Scalars['Float']>,
  squelch?: Maybe<Scalars['Float']>,
  error?: Maybe<Scalars['Float']>,
  gain?: Maybe<Scalars['Float']>,
  digitalRecorders?: Maybe<Scalars['Float']>,
  digitalLevels?: Maybe<Scalars['Float']>,
  analogRecorders?: Maybe<Scalars['Float']>,
  analogLevels?: Maybe<Scalars['Float']>,
  device?: Maybe<Scalars['String']>,
  modulation?: Maybe<TrunkedModulation>,
};

export type TrunkedSourceUpdateManyWithWhereNestedInput = {
  where: TrunkedSourceScalarWhereInput,
  data: TrunkedSourceUpdateManyDataInput,
};

export type TrunkedSourceUpdateWithWhereUniqueNestedInput = {
  where: TrunkedSourceWhereUniqueInput,
  data: TrunkedSourceUpdateDataInput,
};

export type TrunkedSourceUpsertWithWhereUniqueNestedInput = {
  where: TrunkedSourceWhereUniqueInput,
  update: TrunkedSourceUpdateDataInput,
  create: TrunkedSourceCreateInput,
};

export type TrunkedSourceWhereInput = {
  id?: Maybe<Scalars['ID']>,
  id_not?: Maybe<Scalars['ID']>,
  id_in?: Maybe<Array<Scalars['ID']>>,
  id_not_in?: Maybe<Array<Scalars['ID']>>,
  id_lt?: Maybe<Scalars['ID']>,
  id_lte?: Maybe<Scalars['ID']>,
  id_gt?: Maybe<Scalars['ID']>,
  id_gte?: Maybe<Scalars['ID']>,
  id_contains?: Maybe<Scalars['ID']>,
  id_not_contains?: Maybe<Scalars['ID']>,
  id_starts_with?: Maybe<Scalars['ID']>,
  id_not_starts_with?: Maybe<Scalars['ID']>,
  id_ends_with?: Maybe<Scalars['ID']>,
  id_not_ends_with?: Maybe<Scalars['ID']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
  updatedAt_not?: Maybe<Scalars['DateTime']>,
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_lt?: Maybe<Scalars['DateTime']>,
  updatedAt_lte?: Maybe<Scalars['DateTime']>,
  updatedAt_gt?: Maybe<Scalars['DateTime']>,
  updatedAt_gte?: Maybe<Scalars['DateTime']>,
  createdAt?: Maybe<Scalars['DateTime']>,
  createdAt_not?: Maybe<Scalars['DateTime']>,
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_lt?: Maybe<Scalars['DateTime']>,
  createdAt_lte?: Maybe<Scalars['DateTime']>,
  createdAt_gt?: Maybe<Scalars['DateTime']>,
  createdAt_gte?: Maybe<Scalars['DateTime']>,
  center?: Maybe<Scalars['Float']>,
  center_not?: Maybe<Scalars['Float']>,
  center_in?: Maybe<Array<Scalars['Float']>>,
  center_not_in?: Maybe<Array<Scalars['Float']>>,
  center_lt?: Maybe<Scalars['Float']>,
  center_lte?: Maybe<Scalars['Float']>,
  center_gt?: Maybe<Scalars['Float']>,
  center_gte?: Maybe<Scalars['Float']>,
  rate?: Maybe<Scalars['Float']>,
  rate_not?: Maybe<Scalars['Float']>,
  rate_in?: Maybe<Array<Scalars['Float']>>,
  rate_not_in?: Maybe<Array<Scalars['Float']>>,
  rate_lt?: Maybe<Scalars['Float']>,
  rate_lte?: Maybe<Scalars['Float']>,
  rate_gt?: Maybe<Scalars['Float']>,
  rate_gte?: Maybe<Scalars['Float']>,
  squelch?: Maybe<Scalars['Float']>,
  squelch_not?: Maybe<Scalars['Float']>,
  squelch_in?: Maybe<Array<Scalars['Float']>>,
  squelch_not_in?: Maybe<Array<Scalars['Float']>>,
  squelch_lt?: Maybe<Scalars['Float']>,
  squelch_lte?: Maybe<Scalars['Float']>,
  squelch_gt?: Maybe<Scalars['Float']>,
  squelch_gte?: Maybe<Scalars['Float']>,
  error?: Maybe<Scalars['Float']>,
  error_not?: Maybe<Scalars['Float']>,
  error_in?: Maybe<Array<Scalars['Float']>>,
  error_not_in?: Maybe<Array<Scalars['Float']>>,
  error_lt?: Maybe<Scalars['Float']>,
  error_lte?: Maybe<Scalars['Float']>,
  error_gt?: Maybe<Scalars['Float']>,
  error_gte?: Maybe<Scalars['Float']>,
  gain?: Maybe<Scalars['Float']>,
  gain_not?: Maybe<Scalars['Float']>,
  gain_in?: Maybe<Array<Scalars['Float']>>,
  gain_not_in?: Maybe<Array<Scalars['Float']>>,
  gain_lt?: Maybe<Scalars['Float']>,
  gain_lte?: Maybe<Scalars['Float']>,
  gain_gt?: Maybe<Scalars['Float']>,
  gain_gte?: Maybe<Scalars['Float']>,
  digitalRecorders?: Maybe<Scalars['Float']>,
  digitalRecorders_not?: Maybe<Scalars['Float']>,
  digitalRecorders_in?: Maybe<Array<Scalars['Float']>>,
  digitalRecorders_not_in?: Maybe<Array<Scalars['Float']>>,
  digitalRecorders_lt?: Maybe<Scalars['Float']>,
  digitalRecorders_lte?: Maybe<Scalars['Float']>,
  digitalRecorders_gt?: Maybe<Scalars['Float']>,
  digitalRecorders_gte?: Maybe<Scalars['Float']>,
  digitalLevels?: Maybe<Scalars['Float']>,
  digitalLevels_not?: Maybe<Scalars['Float']>,
  digitalLevels_in?: Maybe<Array<Scalars['Float']>>,
  digitalLevels_not_in?: Maybe<Array<Scalars['Float']>>,
  digitalLevels_lt?: Maybe<Scalars['Float']>,
  digitalLevels_lte?: Maybe<Scalars['Float']>,
  digitalLevels_gt?: Maybe<Scalars['Float']>,
  digitalLevels_gte?: Maybe<Scalars['Float']>,
  analogRecorders?: Maybe<Scalars['Float']>,
  analogRecorders_not?: Maybe<Scalars['Float']>,
  analogRecorders_in?: Maybe<Array<Scalars['Float']>>,
  analogRecorders_not_in?: Maybe<Array<Scalars['Float']>>,
  analogRecorders_lt?: Maybe<Scalars['Float']>,
  analogRecorders_lte?: Maybe<Scalars['Float']>,
  analogRecorders_gt?: Maybe<Scalars['Float']>,
  analogRecorders_gte?: Maybe<Scalars['Float']>,
  analogLevels?: Maybe<Scalars['Float']>,
  analogLevels_not?: Maybe<Scalars['Float']>,
  analogLevels_in?: Maybe<Array<Scalars['Float']>>,
  analogLevels_not_in?: Maybe<Array<Scalars['Float']>>,
  analogLevels_lt?: Maybe<Scalars['Float']>,
  analogLevels_lte?: Maybe<Scalars['Float']>,
  analogLevels_gt?: Maybe<Scalars['Float']>,
  analogLevels_gte?: Maybe<Scalars['Float']>,
  device?: Maybe<Scalars['String']>,
  device_not?: Maybe<Scalars['String']>,
  device_in?: Maybe<Array<Scalars['String']>>,
  device_not_in?: Maybe<Array<Scalars['String']>>,
  device_lt?: Maybe<Scalars['String']>,
  device_lte?: Maybe<Scalars['String']>,
  device_gt?: Maybe<Scalars['String']>,
  device_gte?: Maybe<Scalars['String']>,
  device_contains?: Maybe<Scalars['String']>,
  device_not_contains?: Maybe<Scalars['String']>,
  device_starts_with?: Maybe<Scalars['String']>,
  device_not_starts_with?: Maybe<Scalars['String']>,
  device_ends_with?: Maybe<Scalars['String']>,
  device_not_ends_with?: Maybe<Scalars['String']>,
  modulation?: Maybe<TrunkedModulation>,
  modulation_not?: Maybe<TrunkedModulation>,
  modulation_in?: Maybe<Array<TrunkedModulation>>,
  modulation_not_in?: Maybe<Array<TrunkedModulation>>,
  AND?: Maybe<Array<TrunkedSourceWhereInput>>,
  OR?: Maybe<Array<TrunkedSourceWhereInput>>,
  NOT?: Maybe<Array<TrunkedSourceWhereInput>>,
};

export type TrunkedSourceWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>,
};

export type TrunkedSystem = {
   __typename?: 'TrunkedSystem',
  id: Scalars['ID'],
  updatedAt: Scalars['DateTime'],
  createdAt: Scalars['DateTime'],
  controlChannels: Array<Scalars['Float']>,
  channels: Array<Scalars['Float']>,
  type: TrunkedSystemType,
  alphatags: Array<Scalars['String']>,
  talkgroups?: Maybe<Array<TrunkedTalkgroup>>,
  recordUnknown: Scalars['Boolean'],
  shortName: Scalars['String'],
  name: Scalars['String'],
  audioArchive: Scalars['Boolean'],
  callLog: Scalars['Boolean'],
  minDuration: Scalars['Float'],
  bandplan?: Maybe<TrunkedSmartnetBandplan>,
  bandplanBase?: Maybe<Scalars['Float']>,
  bandplanHigh?: Maybe<Scalars['Float']>,
  bandplanLow?: Maybe<Scalars['Float']>,
  bandplanSpacing?: Maybe<Scalars['Float']>,
  bandplanOffset?: Maybe<Scalars['Float']>,
  talkgroupDisplayFormat: TrunkedTalkgroupDisplayFormat,
  delayCreateOutput?: Maybe<Scalars['Boolean']>,
  hideEncrypted: Scalars['Boolean'],
  hideUnknownTalkgroups: Scalars['Boolean'],
  calls?: Maybe<Array<TrunkedCall>>,
};


export type TrunkedSystemTalkgroupsArgs = {
  where?: Maybe<TrunkedTalkgroupWhereInput>,
  orderBy?: Maybe<TrunkedTalkgroupOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type TrunkedSystemCallsArgs = {
  where?: Maybe<TrunkedCallWhereInput>,
  orderBy?: Maybe<TrunkedCallOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};

export type TrunkedSystemConnection = {
   __typename?: 'TrunkedSystemConnection',
  pageInfo: PageInfo,
  edges: Array<Maybe<TrunkedSystemEdge>>,
  aggregate: AggregateTrunkedSystem,
};

export type TrunkedSystemCreatealphatagsInput = {
  set?: Maybe<Array<Scalars['String']>>,
};

export type TrunkedSystemCreatechannelsInput = {
  set?: Maybe<Array<Scalars['Float']>>,
};

export type TrunkedSystemCreatecontrolChannelsInput = {
  set?: Maybe<Array<Scalars['Float']>>,
};

export type TrunkedSystemCreateInput = {
  id?: Maybe<Scalars['ID']>,
  controlChannels?: Maybe<TrunkedSystemCreatecontrolChannelsInput>,
  channels?: Maybe<TrunkedSystemCreatechannelsInput>,
  type: TrunkedSystemType,
  alphatags?: Maybe<TrunkedSystemCreatealphatagsInput>,
  talkgroups?: Maybe<TrunkedTalkgroupCreateManyWithoutSystemInput>,
  recordUnknown?: Maybe<Scalars['Boolean']>,
  shortName: Scalars['String'],
  name?: Maybe<Scalars['String']>,
  audioArchive?: Maybe<Scalars['Boolean']>,
  callLog?: Maybe<Scalars['Boolean']>,
  minDuration?: Maybe<Scalars['Float']>,
  bandplan?: Maybe<TrunkedSmartnetBandplan>,
  bandplanBase?: Maybe<Scalars['Float']>,
  bandplanHigh?: Maybe<Scalars['Float']>,
  bandplanLow?: Maybe<Scalars['Float']>,
  bandplanSpacing?: Maybe<Scalars['Float']>,
  bandplanOffset?: Maybe<Scalars['Float']>,
  talkgroupDisplayFormat?: Maybe<TrunkedTalkgroupDisplayFormat>,
  delayCreateOutput?: Maybe<Scalars['Boolean']>,
  hideEncrypted?: Maybe<Scalars['Boolean']>,
  hideUnknownTalkgroups?: Maybe<Scalars['Boolean']>,
  calls?: Maybe<TrunkedCallCreateManyWithoutSystemInput>,
};

export type TrunkedSystemCreateManyInput = {
  create?: Maybe<Array<TrunkedSystemCreateInput>>,
  connect?: Maybe<Array<TrunkedSystemWhereUniqueInput>>,
};

export type TrunkedSystemCreateOneWithoutCallsInput = {
  create?: Maybe<TrunkedSystemCreateWithoutCallsInput>,
  connect?: Maybe<TrunkedSystemWhereUniqueInput>,
};

export type TrunkedSystemCreateOneWithoutTalkgroupsInput = {
  create?: Maybe<TrunkedSystemCreateWithoutTalkgroupsInput>,
  connect?: Maybe<TrunkedSystemWhereUniqueInput>,
};

export type TrunkedSystemCreateWithoutCallsInput = {
  id?: Maybe<Scalars['ID']>,
  controlChannels?: Maybe<TrunkedSystemCreatecontrolChannelsInput>,
  channels?: Maybe<TrunkedSystemCreatechannelsInput>,
  type: TrunkedSystemType,
  alphatags?: Maybe<TrunkedSystemCreatealphatagsInput>,
  talkgroups?: Maybe<TrunkedTalkgroupCreateManyWithoutSystemInput>,
  recordUnknown?: Maybe<Scalars['Boolean']>,
  shortName: Scalars['String'],
  name?: Maybe<Scalars['String']>,
  audioArchive?: Maybe<Scalars['Boolean']>,
  callLog?: Maybe<Scalars['Boolean']>,
  minDuration?: Maybe<Scalars['Float']>,
  bandplan?: Maybe<TrunkedSmartnetBandplan>,
  bandplanBase?: Maybe<Scalars['Float']>,
  bandplanHigh?: Maybe<Scalars['Float']>,
  bandplanLow?: Maybe<Scalars['Float']>,
  bandplanSpacing?: Maybe<Scalars['Float']>,
  bandplanOffset?: Maybe<Scalars['Float']>,
  talkgroupDisplayFormat?: Maybe<TrunkedTalkgroupDisplayFormat>,
  delayCreateOutput?: Maybe<Scalars['Boolean']>,
  hideEncrypted?: Maybe<Scalars['Boolean']>,
  hideUnknownTalkgroups?: Maybe<Scalars['Boolean']>,
};

export type TrunkedSystemCreateWithoutTalkgroupsInput = {
  id?: Maybe<Scalars['ID']>,
  controlChannels?: Maybe<TrunkedSystemCreatecontrolChannelsInput>,
  channels?: Maybe<TrunkedSystemCreatechannelsInput>,
  type: TrunkedSystemType,
  alphatags?: Maybe<TrunkedSystemCreatealphatagsInput>,
  recordUnknown?: Maybe<Scalars['Boolean']>,
  shortName: Scalars['String'],
  name?: Maybe<Scalars['String']>,
  audioArchive?: Maybe<Scalars['Boolean']>,
  callLog?: Maybe<Scalars['Boolean']>,
  minDuration?: Maybe<Scalars['Float']>,
  bandplan?: Maybe<TrunkedSmartnetBandplan>,
  bandplanBase?: Maybe<Scalars['Float']>,
  bandplanHigh?: Maybe<Scalars['Float']>,
  bandplanLow?: Maybe<Scalars['Float']>,
  bandplanSpacing?: Maybe<Scalars['Float']>,
  bandplanOffset?: Maybe<Scalars['Float']>,
  talkgroupDisplayFormat?: Maybe<TrunkedTalkgroupDisplayFormat>,
  delayCreateOutput?: Maybe<Scalars['Boolean']>,
  hideEncrypted?: Maybe<Scalars['Boolean']>,
  hideUnknownTalkgroups?: Maybe<Scalars['Boolean']>,
  calls?: Maybe<TrunkedCallCreateManyWithoutSystemInput>,
};

export type TrunkedSystemEdge = {
   __typename?: 'TrunkedSystemEdge',
  node: TrunkedSystem,
  cursor: Scalars['String'],
};

export enum TrunkedSystemOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  TypeAsc = 'type_ASC',
  TypeDesc = 'type_DESC',
  RecordUnknownAsc = 'recordUnknown_ASC',
  RecordUnknownDesc = 'recordUnknown_DESC',
  ShortNameAsc = 'shortName_ASC',
  ShortNameDesc = 'shortName_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  AudioArchiveAsc = 'audioArchive_ASC',
  AudioArchiveDesc = 'audioArchive_DESC',
  CallLogAsc = 'callLog_ASC',
  CallLogDesc = 'callLog_DESC',
  MinDurationAsc = 'minDuration_ASC',
  MinDurationDesc = 'minDuration_DESC',
  BandplanAsc = 'bandplan_ASC',
  BandplanDesc = 'bandplan_DESC',
  BandplanBaseAsc = 'bandplanBase_ASC',
  BandplanBaseDesc = 'bandplanBase_DESC',
  BandplanHighAsc = 'bandplanHigh_ASC',
  BandplanHighDesc = 'bandplanHigh_DESC',
  BandplanLowAsc = 'bandplanLow_ASC',
  BandplanLowDesc = 'bandplanLow_DESC',
  BandplanSpacingAsc = 'bandplanSpacing_ASC',
  BandplanSpacingDesc = 'bandplanSpacing_DESC',
  BandplanOffsetAsc = 'bandplanOffset_ASC',
  BandplanOffsetDesc = 'bandplanOffset_DESC',
  TalkgroupDisplayFormatAsc = 'talkgroupDisplayFormat_ASC',
  TalkgroupDisplayFormatDesc = 'talkgroupDisplayFormat_DESC',
  DelayCreateOutputAsc = 'delayCreateOutput_ASC',
  DelayCreateOutputDesc = 'delayCreateOutput_DESC',
  HideEncryptedAsc = 'hideEncrypted_ASC',
  HideEncryptedDesc = 'hideEncrypted_DESC',
  HideUnknownTalkgroupsAsc = 'hideUnknownTalkgroups_ASC',
  HideUnknownTalkgroupsDesc = 'hideUnknownTalkgroups_DESC'
}

export type TrunkedSystemPreviousValues = {
   __typename?: 'TrunkedSystemPreviousValues',
  id: Scalars['ID'],
  updatedAt: Scalars['DateTime'],
  createdAt: Scalars['DateTime'],
  controlChannels: Array<Scalars['Float']>,
  channels: Array<Scalars['Float']>,
  type: TrunkedSystemType,
  alphatags: Array<Scalars['String']>,
  recordUnknown: Scalars['Boolean'],
  shortName: Scalars['String'],
  name: Scalars['String'],
  audioArchive: Scalars['Boolean'],
  callLog: Scalars['Boolean'],
  minDuration: Scalars['Float'],
  bandplan?: Maybe<TrunkedSmartnetBandplan>,
  bandplanBase?: Maybe<Scalars['Float']>,
  bandplanHigh?: Maybe<Scalars['Float']>,
  bandplanLow?: Maybe<Scalars['Float']>,
  bandplanSpacing?: Maybe<Scalars['Float']>,
  bandplanOffset?: Maybe<Scalars['Float']>,
  talkgroupDisplayFormat: TrunkedTalkgroupDisplayFormat,
  delayCreateOutput?: Maybe<Scalars['Boolean']>,
  hideEncrypted: Scalars['Boolean'],
  hideUnknownTalkgroups: Scalars['Boolean'],
};

export type TrunkedSystemScalarWhereInput = {
  id?: Maybe<Scalars['ID']>,
  id_not?: Maybe<Scalars['ID']>,
  id_in?: Maybe<Array<Scalars['ID']>>,
  id_not_in?: Maybe<Array<Scalars['ID']>>,
  id_lt?: Maybe<Scalars['ID']>,
  id_lte?: Maybe<Scalars['ID']>,
  id_gt?: Maybe<Scalars['ID']>,
  id_gte?: Maybe<Scalars['ID']>,
  id_contains?: Maybe<Scalars['ID']>,
  id_not_contains?: Maybe<Scalars['ID']>,
  id_starts_with?: Maybe<Scalars['ID']>,
  id_not_starts_with?: Maybe<Scalars['ID']>,
  id_ends_with?: Maybe<Scalars['ID']>,
  id_not_ends_with?: Maybe<Scalars['ID']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
  updatedAt_not?: Maybe<Scalars['DateTime']>,
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_lt?: Maybe<Scalars['DateTime']>,
  updatedAt_lte?: Maybe<Scalars['DateTime']>,
  updatedAt_gt?: Maybe<Scalars['DateTime']>,
  updatedAt_gte?: Maybe<Scalars['DateTime']>,
  createdAt?: Maybe<Scalars['DateTime']>,
  createdAt_not?: Maybe<Scalars['DateTime']>,
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_lt?: Maybe<Scalars['DateTime']>,
  createdAt_lte?: Maybe<Scalars['DateTime']>,
  createdAt_gt?: Maybe<Scalars['DateTime']>,
  createdAt_gte?: Maybe<Scalars['DateTime']>,
  type?: Maybe<TrunkedSystemType>,
  type_not?: Maybe<TrunkedSystemType>,
  type_in?: Maybe<Array<TrunkedSystemType>>,
  type_not_in?: Maybe<Array<TrunkedSystemType>>,
  recordUnknown?: Maybe<Scalars['Boolean']>,
  recordUnknown_not?: Maybe<Scalars['Boolean']>,
  shortName?: Maybe<Scalars['String']>,
  shortName_not?: Maybe<Scalars['String']>,
  shortName_in?: Maybe<Array<Scalars['String']>>,
  shortName_not_in?: Maybe<Array<Scalars['String']>>,
  shortName_lt?: Maybe<Scalars['String']>,
  shortName_lte?: Maybe<Scalars['String']>,
  shortName_gt?: Maybe<Scalars['String']>,
  shortName_gte?: Maybe<Scalars['String']>,
  shortName_contains?: Maybe<Scalars['String']>,
  shortName_not_contains?: Maybe<Scalars['String']>,
  shortName_starts_with?: Maybe<Scalars['String']>,
  shortName_not_starts_with?: Maybe<Scalars['String']>,
  shortName_ends_with?: Maybe<Scalars['String']>,
  shortName_not_ends_with?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  name_not?: Maybe<Scalars['String']>,
  name_in?: Maybe<Array<Scalars['String']>>,
  name_not_in?: Maybe<Array<Scalars['String']>>,
  name_lt?: Maybe<Scalars['String']>,
  name_lte?: Maybe<Scalars['String']>,
  name_gt?: Maybe<Scalars['String']>,
  name_gte?: Maybe<Scalars['String']>,
  name_contains?: Maybe<Scalars['String']>,
  name_not_contains?: Maybe<Scalars['String']>,
  name_starts_with?: Maybe<Scalars['String']>,
  name_not_starts_with?: Maybe<Scalars['String']>,
  name_ends_with?: Maybe<Scalars['String']>,
  name_not_ends_with?: Maybe<Scalars['String']>,
  audioArchive?: Maybe<Scalars['Boolean']>,
  audioArchive_not?: Maybe<Scalars['Boolean']>,
  callLog?: Maybe<Scalars['Boolean']>,
  callLog_not?: Maybe<Scalars['Boolean']>,
  minDuration?: Maybe<Scalars['Float']>,
  minDuration_not?: Maybe<Scalars['Float']>,
  minDuration_in?: Maybe<Array<Scalars['Float']>>,
  minDuration_not_in?: Maybe<Array<Scalars['Float']>>,
  minDuration_lt?: Maybe<Scalars['Float']>,
  minDuration_lte?: Maybe<Scalars['Float']>,
  minDuration_gt?: Maybe<Scalars['Float']>,
  minDuration_gte?: Maybe<Scalars['Float']>,
  bandplan?: Maybe<TrunkedSmartnetBandplan>,
  bandplan_not?: Maybe<TrunkedSmartnetBandplan>,
  bandplan_in?: Maybe<Array<TrunkedSmartnetBandplan>>,
  bandplan_not_in?: Maybe<Array<TrunkedSmartnetBandplan>>,
  bandplanBase?: Maybe<Scalars['Float']>,
  bandplanBase_not?: Maybe<Scalars['Float']>,
  bandplanBase_in?: Maybe<Array<Scalars['Float']>>,
  bandplanBase_not_in?: Maybe<Array<Scalars['Float']>>,
  bandplanBase_lt?: Maybe<Scalars['Float']>,
  bandplanBase_lte?: Maybe<Scalars['Float']>,
  bandplanBase_gt?: Maybe<Scalars['Float']>,
  bandplanBase_gte?: Maybe<Scalars['Float']>,
  bandplanHigh?: Maybe<Scalars['Float']>,
  bandplanHigh_not?: Maybe<Scalars['Float']>,
  bandplanHigh_in?: Maybe<Array<Scalars['Float']>>,
  bandplanHigh_not_in?: Maybe<Array<Scalars['Float']>>,
  bandplanHigh_lt?: Maybe<Scalars['Float']>,
  bandplanHigh_lte?: Maybe<Scalars['Float']>,
  bandplanHigh_gt?: Maybe<Scalars['Float']>,
  bandplanHigh_gte?: Maybe<Scalars['Float']>,
  bandplanLow?: Maybe<Scalars['Float']>,
  bandplanLow_not?: Maybe<Scalars['Float']>,
  bandplanLow_in?: Maybe<Array<Scalars['Float']>>,
  bandplanLow_not_in?: Maybe<Array<Scalars['Float']>>,
  bandplanLow_lt?: Maybe<Scalars['Float']>,
  bandplanLow_lte?: Maybe<Scalars['Float']>,
  bandplanLow_gt?: Maybe<Scalars['Float']>,
  bandplanLow_gte?: Maybe<Scalars['Float']>,
  bandplanSpacing?: Maybe<Scalars['Float']>,
  bandplanSpacing_not?: Maybe<Scalars['Float']>,
  bandplanSpacing_in?: Maybe<Array<Scalars['Float']>>,
  bandplanSpacing_not_in?: Maybe<Array<Scalars['Float']>>,
  bandplanSpacing_lt?: Maybe<Scalars['Float']>,
  bandplanSpacing_lte?: Maybe<Scalars['Float']>,
  bandplanSpacing_gt?: Maybe<Scalars['Float']>,
  bandplanSpacing_gte?: Maybe<Scalars['Float']>,
  bandplanOffset?: Maybe<Scalars['Float']>,
  bandplanOffset_not?: Maybe<Scalars['Float']>,
  bandplanOffset_in?: Maybe<Array<Scalars['Float']>>,
  bandplanOffset_not_in?: Maybe<Array<Scalars['Float']>>,
  bandplanOffset_lt?: Maybe<Scalars['Float']>,
  bandplanOffset_lte?: Maybe<Scalars['Float']>,
  bandplanOffset_gt?: Maybe<Scalars['Float']>,
  bandplanOffset_gte?: Maybe<Scalars['Float']>,
  talkgroupDisplayFormat?: Maybe<TrunkedTalkgroupDisplayFormat>,
  talkgroupDisplayFormat_not?: Maybe<TrunkedTalkgroupDisplayFormat>,
  talkgroupDisplayFormat_in?: Maybe<Array<TrunkedTalkgroupDisplayFormat>>,
  talkgroupDisplayFormat_not_in?: Maybe<Array<TrunkedTalkgroupDisplayFormat>>,
  delayCreateOutput?: Maybe<Scalars['Boolean']>,
  delayCreateOutput_not?: Maybe<Scalars['Boolean']>,
  hideEncrypted?: Maybe<Scalars['Boolean']>,
  hideEncrypted_not?: Maybe<Scalars['Boolean']>,
  hideUnknownTalkgroups?: Maybe<Scalars['Boolean']>,
  hideUnknownTalkgroups_not?: Maybe<Scalars['Boolean']>,
  AND?: Maybe<Array<TrunkedSystemScalarWhereInput>>,
  OR?: Maybe<Array<TrunkedSystemScalarWhereInput>>,
  NOT?: Maybe<Array<TrunkedSystemScalarWhereInput>>,
};

export type TrunkedSystemStats = {
   __typename?: 'TrunkedSystemStats',
  system: TrunkedSystem,
  systemId: Scalars['ID'],
  talkgroups?: Maybe<Array<TrunkedTalkgroup>>,
  talkgroupCount: Scalars['Int'],
  callCount: Scalars['Int'],
  calls?: Maybe<Array<TrunkedCall>>,
};

export type TrunkedSystemSubscriptionPayload = {
   __typename?: 'TrunkedSystemSubscriptionPayload',
  mutation: MutationType,
  node?: Maybe<TrunkedSystem>,
  updatedFields?: Maybe<Array<Scalars['String']>>,
  previousValues?: Maybe<TrunkedSystemPreviousValues>,
};

export type TrunkedSystemSubscriptionWhereInput = {
  mutation_in?: Maybe<Array<MutationType>>,
  updatedFields_contains?: Maybe<Scalars['String']>,
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>,
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>,
  node?: Maybe<TrunkedSystemWhereInput>,
  AND?: Maybe<Array<TrunkedSystemSubscriptionWhereInput>>,
  OR?: Maybe<Array<TrunkedSystemSubscriptionWhereInput>>,
  NOT?: Maybe<Array<TrunkedSystemSubscriptionWhereInput>>,
};

export enum TrunkedSystemType {
  Smartnet = 'SMARTNET',
  P25 = 'P25',
  Conventional = 'CONVENTIONAL',
  ConventionalP25 = 'CONVENTIONAL_P25',
  Unknown = 'UNKNOWN'
}

export type TrunkedSystemUpdatealphatagsInput = {
  set?: Maybe<Array<Scalars['String']>>,
};

export type TrunkedSystemUpdatechannelsInput = {
  set?: Maybe<Array<Scalars['Float']>>,
};

export type TrunkedSystemUpdatecontrolChannelsInput = {
  set?: Maybe<Array<Scalars['Float']>>,
};

export type TrunkedSystemUpdateDataInput = {
  controlChannels?: Maybe<TrunkedSystemUpdatecontrolChannelsInput>,
  channels?: Maybe<TrunkedSystemUpdatechannelsInput>,
  type?: Maybe<TrunkedSystemType>,
  alphatags?: Maybe<TrunkedSystemUpdatealphatagsInput>,
  talkgroups?: Maybe<TrunkedTalkgroupUpdateManyWithoutSystemInput>,
  recordUnknown?: Maybe<Scalars['Boolean']>,
  shortName?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  audioArchive?: Maybe<Scalars['Boolean']>,
  callLog?: Maybe<Scalars['Boolean']>,
  minDuration?: Maybe<Scalars['Float']>,
  bandplan?: Maybe<TrunkedSmartnetBandplan>,
  bandplanBase?: Maybe<Scalars['Float']>,
  bandplanHigh?: Maybe<Scalars['Float']>,
  bandplanLow?: Maybe<Scalars['Float']>,
  bandplanSpacing?: Maybe<Scalars['Float']>,
  bandplanOffset?: Maybe<Scalars['Float']>,
  talkgroupDisplayFormat?: Maybe<TrunkedTalkgroupDisplayFormat>,
  delayCreateOutput?: Maybe<Scalars['Boolean']>,
  hideEncrypted?: Maybe<Scalars['Boolean']>,
  hideUnknownTalkgroups?: Maybe<Scalars['Boolean']>,
  calls?: Maybe<TrunkedCallUpdateManyWithoutSystemInput>,
};

export type TrunkedSystemUpdateInput = {
  controlChannels?: Maybe<TrunkedSystemUpdatecontrolChannelsInput>,
  channels?: Maybe<TrunkedSystemUpdatechannelsInput>,
  type?: Maybe<TrunkedSystemType>,
  alphatags?: Maybe<TrunkedSystemUpdatealphatagsInput>,
  talkgroups?: Maybe<TrunkedTalkgroupUpdateManyWithoutSystemInput>,
  recordUnknown?: Maybe<Scalars['Boolean']>,
  shortName?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  audioArchive?: Maybe<Scalars['Boolean']>,
  callLog?: Maybe<Scalars['Boolean']>,
  minDuration?: Maybe<Scalars['Float']>,
  bandplan?: Maybe<TrunkedSmartnetBandplan>,
  bandplanBase?: Maybe<Scalars['Float']>,
  bandplanHigh?: Maybe<Scalars['Float']>,
  bandplanLow?: Maybe<Scalars['Float']>,
  bandplanSpacing?: Maybe<Scalars['Float']>,
  bandplanOffset?: Maybe<Scalars['Float']>,
  talkgroupDisplayFormat?: Maybe<TrunkedTalkgroupDisplayFormat>,
  delayCreateOutput?: Maybe<Scalars['Boolean']>,
  hideEncrypted?: Maybe<Scalars['Boolean']>,
  hideUnknownTalkgroups?: Maybe<Scalars['Boolean']>,
  calls?: Maybe<TrunkedCallUpdateManyWithoutSystemInput>,
};

export type TrunkedSystemUpdateManyDataInput = {
  controlChannels?: Maybe<TrunkedSystemUpdatecontrolChannelsInput>,
  channels?: Maybe<TrunkedSystemUpdatechannelsInput>,
  type?: Maybe<TrunkedSystemType>,
  alphatags?: Maybe<TrunkedSystemUpdatealphatagsInput>,
  recordUnknown?: Maybe<Scalars['Boolean']>,
  shortName?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  audioArchive?: Maybe<Scalars['Boolean']>,
  callLog?: Maybe<Scalars['Boolean']>,
  minDuration?: Maybe<Scalars['Float']>,
  bandplan?: Maybe<TrunkedSmartnetBandplan>,
  bandplanBase?: Maybe<Scalars['Float']>,
  bandplanHigh?: Maybe<Scalars['Float']>,
  bandplanLow?: Maybe<Scalars['Float']>,
  bandplanSpacing?: Maybe<Scalars['Float']>,
  bandplanOffset?: Maybe<Scalars['Float']>,
  talkgroupDisplayFormat?: Maybe<TrunkedTalkgroupDisplayFormat>,
  delayCreateOutput?: Maybe<Scalars['Boolean']>,
  hideEncrypted?: Maybe<Scalars['Boolean']>,
  hideUnknownTalkgroups?: Maybe<Scalars['Boolean']>,
};

export type TrunkedSystemUpdateManyInput = {
  create?: Maybe<Array<TrunkedSystemCreateInput>>,
  update?: Maybe<Array<TrunkedSystemUpdateWithWhereUniqueNestedInput>>,
  upsert?: Maybe<Array<TrunkedSystemUpsertWithWhereUniqueNestedInput>>,
  delete?: Maybe<Array<TrunkedSystemWhereUniqueInput>>,
  connect?: Maybe<Array<TrunkedSystemWhereUniqueInput>>,
  set?: Maybe<Array<TrunkedSystemWhereUniqueInput>>,
  disconnect?: Maybe<Array<TrunkedSystemWhereUniqueInput>>,
  deleteMany?: Maybe<Array<TrunkedSystemScalarWhereInput>>,
  updateMany?: Maybe<Array<TrunkedSystemUpdateManyWithWhereNestedInput>>,
};

export type TrunkedSystemUpdateManyMutationInput = {
  controlChannels?: Maybe<TrunkedSystemUpdatecontrolChannelsInput>,
  channels?: Maybe<TrunkedSystemUpdatechannelsInput>,
  type?: Maybe<TrunkedSystemType>,
  alphatags?: Maybe<TrunkedSystemUpdatealphatagsInput>,
  recordUnknown?: Maybe<Scalars['Boolean']>,
  shortName?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  audioArchive?: Maybe<Scalars['Boolean']>,
  callLog?: Maybe<Scalars['Boolean']>,
  minDuration?: Maybe<Scalars['Float']>,
  bandplan?: Maybe<TrunkedSmartnetBandplan>,
  bandplanBase?: Maybe<Scalars['Float']>,
  bandplanHigh?: Maybe<Scalars['Float']>,
  bandplanLow?: Maybe<Scalars['Float']>,
  bandplanSpacing?: Maybe<Scalars['Float']>,
  bandplanOffset?: Maybe<Scalars['Float']>,
  talkgroupDisplayFormat?: Maybe<TrunkedTalkgroupDisplayFormat>,
  delayCreateOutput?: Maybe<Scalars['Boolean']>,
  hideEncrypted?: Maybe<Scalars['Boolean']>,
  hideUnknownTalkgroups?: Maybe<Scalars['Boolean']>,
};

export type TrunkedSystemUpdateManyWithWhereNestedInput = {
  where: TrunkedSystemScalarWhereInput,
  data: TrunkedSystemUpdateManyDataInput,
};

export type TrunkedSystemUpdateOneRequiredWithoutTalkgroupsInput = {
  create?: Maybe<TrunkedSystemCreateWithoutTalkgroupsInput>,
  update?: Maybe<TrunkedSystemUpdateWithoutTalkgroupsDataInput>,
  upsert?: Maybe<TrunkedSystemUpsertWithoutTalkgroupsInput>,
  connect?: Maybe<TrunkedSystemWhereUniqueInput>,
};

export type TrunkedSystemUpdateOneWithoutCallsInput = {
  create?: Maybe<TrunkedSystemCreateWithoutCallsInput>,
  update?: Maybe<TrunkedSystemUpdateWithoutCallsDataInput>,
  upsert?: Maybe<TrunkedSystemUpsertWithoutCallsInput>,
  delete?: Maybe<Scalars['Boolean']>,
  disconnect?: Maybe<Scalars['Boolean']>,
  connect?: Maybe<TrunkedSystemWhereUniqueInput>,
};

export type TrunkedSystemUpdateWithoutCallsDataInput = {
  controlChannels?: Maybe<TrunkedSystemUpdatecontrolChannelsInput>,
  channels?: Maybe<TrunkedSystemUpdatechannelsInput>,
  type?: Maybe<TrunkedSystemType>,
  alphatags?: Maybe<TrunkedSystemUpdatealphatagsInput>,
  talkgroups?: Maybe<TrunkedTalkgroupUpdateManyWithoutSystemInput>,
  recordUnknown?: Maybe<Scalars['Boolean']>,
  shortName?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  audioArchive?: Maybe<Scalars['Boolean']>,
  callLog?: Maybe<Scalars['Boolean']>,
  minDuration?: Maybe<Scalars['Float']>,
  bandplan?: Maybe<TrunkedSmartnetBandplan>,
  bandplanBase?: Maybe<Scalars['Float']>,
  bandplanHigh?: Maybe<Scalars['Float']>,
  bandplanLow?: Maybe<Scalars['Float']>,
  bandplanSpacing?: Maybe<Scalars['Float']>,
  bandplanOffset?: Maybe<Scalars['Float']>,
  talkgroupDisplayFormat?: Maybe<TrunkedTalkgroupDisplayFormat>,
  delayCreateOutput?: Maybe<Scalars['Boolean']>,
  hideEncrypted?: Maybe<Scalars['Boolean']>,
  hideUnknownTalkgroups?: Maybe<Scalars['Boolean']>,
};

export type TrunkedSystemUpdateWithoutTalkgroupsDataInput = {
  controlChannels?: Maybe<TrunkedSystemUpdatecontrolChannelsInput>,
  channels?: Maybe<TrunkedSystemUpdatechannelsInput>,
  type?: Maybe<TrunkedSystemType>,
  alphatags?: Maybe<TrunkedSystemUpdatealphatagsInput>,
  recordUnknown?: Maybe<Scalars['Boolean']>,
  shortName?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  audioArchive?: Maybe<Scalars['Boolean']>,
  callLog?: Maybe<Scalars['Boolean']>,
  minDuration?: Maybe<Scalars['Float']>,
  bandplan?: Maybe<TrunkedSmartnetBandplan>,
  bandplanBase?: Maybe<Scalars['Float']>,
  bandplanHigh?: Maybe<Scalars['Float']>,
  bandplanLow?: Maybe<Scalars['Float']>,
  bandplanSpacing?: Maybe<Scalars['Float']>,
  bandplanOffset?: Maybe<Scalars['Float']>,
  talkgroupDisplayFormat?: Maybe<TrunkedTalkgroupDisplayFormat>,
  delayCreateOutput?: Maybe<Scalars['Boolean']>,
  hideEncrypted?: Maybe<Scalars['Boolean']>,
  hideUnknownTalkgroups?: Maybe<Scalars['Boolean']>,
  calls?: Maybe<TrunkedCallUpdateManyWithoutSystemInput>,
};

export type TrunkedSystemUpdateWithWhereUniqueNestedInput = {
  where: TrunkedSystemWhereUniqueInput,
  data: TrunkedSystemUpdateDataInput,
};

export type TrunkedSystemUpsertWithoutCallsInput = {
  update: TrunkedSystemUpdateWithoutCallsDataInput,
  create: TrunkedSystemCreateWithoutCallsInput,
};

export type TrunkedSystemUpsertWithoutTalkgroupsInput = {
  update: TrunkedSystemUpdateWithoutTalkgroupsDataInput,
  create: TrunkedSystemCreateWithoutTalkgroupsInput,
};

export type TrunkedSystemUpsertWithWhereUniqueNestedInput = {
  where: TrunkedSystemWhereUniqueInput,
  update: TrunkedSystemUpdateDataInput,
  create: TrunkedSystemCreateInput,
};

export type TrunkedSystemWhereInput = {
  id?: Maybe<Scalars['ID']>,
  id_not?: Maybe<Scalars['ID']>,
  id_in?: Maybe<Array<Scalars['ID']>>,
  id_not_in?: Maybe<Array<Scalars['ID']>>,
  id_lt?: Maybe<Scalars['ID']>,
  id_lte?: Maybe<Scalars['ID']>,
  id_gt?: Maybe<Scalars['ID']>,
  id_gte?: Maybe<Scalars['ID']>,
  id_contains?: Maybe<Scalars['ID']>,
  id_not_contains?: Maybe<Scalars['ID']>,
  id_starts_with?: Maybe<Scalars['ID']>,
  id_not_starts_with?: Maybe<Scalars['ID']>,
  id_ends_with?: Maybe<Scalars['ID']>,
  id_not_ends_with?: Maybe<Scalars['ID']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
  updatedAt_not?: Maybe<Scalars['DateTime']>,
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_lt?: Maybe<Scalars['DateTime']>,
  updatedAt_lte?: Maybe<Scalars['DateTime']>,
  updatedAt_gt?: Maybe<Scalars['DateTime']>,
  updatedAt_gte?: Maybe<Scalars['DateTime']>,
  createdAt?: Maybe<Scalars['DateTime']>,
  createdAt_not?: Maybe<Scalars['DateTime']>,
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_lt?: Maybe<Scalars['DateTime']>,
  createdAt_lte?: Maybe<Scalars['DateTime']>,
  createdAt_gt?: Maybe<Scalars['DateTime']>,
  createdAt_gte?: Maybe<Scalars['DateTime']>,
  type?: Maybe<TrunkedSystemType>,
  type_not?: Maybe<TrunkedSystemType>,
  type_in?: Maybe<Array<TrunkedSystemType>>,
  type_not_in?: Maybe<Array<TrunkedSystemType>>,
  talkgroups_every?: Maybe<TrunkedTalkgroupWhereInput>,
  talkgroups_some?: Maybe<TrunkedTalkgroupWhereInput>,
  talkgroups_none?: Maybe<TrunkedTalkgroupWhereInput>,
  recordUnknown?: Maybe<Scalars['Boolean']>,
  recordUnknown_not?: Maybe<Scalars['Boolean']>,
  shortName?: Maybe<Scalars['String']>,
  shortName_not?: Maybe<Scalars['String']>,
  shortName_in?: Maybe<Array<Scalars['String']>>,
  shortName_not_in?: Maybe<Array<Scalars['String']>>,
  shortName_lt?: Maybe<Scalars['String']>,
  shortName_lte?: Maybe<Scalars['String']>,
  shortName_gt?: Maybe<Scalars['String']>,
  shortName_gte?: Maybe<Scalars['String']>,
  shortName_contains?: Maybe<Scalars['String']>,
  shortName_not_contains?: Maybe<Scalars['String']>,
  shortName_starts_with?: Maybe<Scalars['String']>,
  shortName_not_starts_with?: Maybe<Scalars['String']>,
  shortName_ends_with?: Maybe<Scalars['String']>,
  shortName_not_ends_with?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  name_not?: Maybe<Scalars['String']>,
  name_in?: Maybe<Array<Scalars['String']>>,
  name_not_in?: Maybe<Array<Scalars['String']>>,
  name_lt?: Maybe<Scalars['String']>,
  name_lte?: Maybe<Scalars['String']>,
  name_gt?: Maybe<Scalars['String']>,
  name_gte?: Maybe<Scalars['String']>,
  name_contains?: Maybe<Scalars['String']>,
  name_not_contains?: Maybe<Scalars['String']>,
  name_starts_with?: Maybe<Scalars['String']>,
  name_not_starts_with?: Maybe<Scalars['String']>,
  name_ends_with?: Maybe<Scalars['String']>,
  name_not_ends_with?: Maybe<Scalars['String']>,
  audioArchive?: Maybe<Scalars['Boolean']>,
  audioArchive_not?: Maybe<Scalars['Boolean']>,
  callLog?: Maybe<Scalars['Boolean']>,
  callLog_not?: Maybe<Scalars['Boolean']>,
  minDuration?: Maybe<Scalars['Float']>,
  minDuration_not?: Maybe<Scalars['Float']>,
  minDuration_in?: Maybe<Array<Scalars['Float']>>,
  minDuration_not_in?: Maybe<Array<Scalars['Float']>>,
  minDuration_lt?: Maybe<Scalars['Float']>,
  minDuration_lte?: Maybe<Scalars['Float']>,
  minDuration_gt?: Maybe<Scalars['Float']>,
  minDuration_gte?: Maybe<Scalars['Float']>,
  bandplan?: Maybe<TrunkedSmartnetBandplan>,
  bandplan_not?: Maybe<TrunkedSmartnetBandplan>,
  bandplan_in?: Maybe<Array<TrunkedSmartnetBandplan>>,
  bandplan_not_in?: Maybe<Array<TrunkedSmartnetBandplan>>,
  bandplanBase?: Maybe<Scalars['Float']>,
  bandplanBase_not?: Maybe<Scalars['Float']>,
  bandplanBase_in?: Maybe<Array<Scalars['Float']>>,
  bandplanBase_not_in?: Maybe<Array<Scalars['Float']>>,
  bandplanBase_lt?: Maybe<Scalars['Float']>,
  bandplanBase_lte?: Maybe<Scalars['Float']>,
  bandplanBase_gt?: Maybe<Scalars['Float']>,
  bandplanBase_gte?: Maybe<Scalars['Float']>,
  bandplanHigh?: Maybe<Scalars['Float']>,
  bandplanHigh_not?: Maybe<Scalars['Float']>,
  bandplanHigh_in?: Maybe<Array<Scalars['Float']>>,
  bandplanHigh_not_in?: Maybe<Array<Scalars['Float']>>,
  bandplanHigh_lt?: Maybe<Scalars['Float']>,
  bandplanHigh_lte?: Maybe<Scalars['Float']>,
  bandplanHigh_gt?: Maybe<Scalars['Float']>,
  bandplanHigh_gte?: Maybe<Scalars['Float']>,
  bandplanLow?: Maybe<Scalars['Float']>,
  bandplanLow_not?: Maybe<Scalars['Float']>,
  bandplanLow_in?: Maybe<Array<Scalars['Float']>>,
  bandplanLow_not_in?: Maybe<Array<Scalars['Float']>>,
  bandplanLow_lt?: Maybe<Scalars['Float']>,
  bandplanLow_lte?: Maybe<Scalars['Float']>,
  bandplanLow_gt?: Maybe<Scalars['Float']>,
  bandplanLow_gte?: Maybe<Scalars['Float']>,
  bandplanSpacing?: Maybe<Scalars['Float']>,
  bandplanSpacing_not?: Maybe<Scalars['Float']>,
  bandplanSpacing_in?: Maybe<Array<Scalars['Float']>>,
  bandplanSpacing_not_in?: Maybe<Array<Scalars['Float']>>,
  bandplanSpacing_lt?: Maybe<Scalars['Float']>,
  bandplanSpacing_lte?: Maybe<Scalars['Float']>,
  bandplanSpacing_gt?: Maybe<Scalars['Float']>,
  bandplanSpacing_gte?: Maybe<Scalars['Float']>,
  bandplanOffset?: Maybe<Scalars['Float']>,
  bandplanOffset_not?: Maybe<Scalars['Float']>,
  bandplanOffset_in?: Maybe<Array<Scalars['Float']>>,
  bandplanOffset_not_in?: Maybe<Array<Scalars['Float']>>,
  bandplanOffset_lt?: Maybe<Scalars['Float']>,
  bandplanOffset_lte?: Maybe<Scalars['Float']>,
  bandplanOffset_gt?: Maybe<Scalars['Float']>,
  bandplanOffset_gte?: Maybe<Scalars['Float']>,
  talkgroupDisplayFormat?: Maybe<TrunkedTalkgroupDisplayFormat>,
  talkgroupDisplayFormat_not?: Maybe<TrunkedTalkgroupDisplayFormat>,
  talkgroupDisplayFormat_in?: Maybe<Array<TrunkedTalkgroupDisplayFormat>>,
  talkgroupDisplayFormat_not_in?: Maybe<Array<TrunkedTalkgroupDisplayFormat>>,
  delayCreateOutput?: Maybe<Scalars['Boolean']>,
  delayCreateOutput_not?: Maybe<Scalars['Boolean']>,
  hideEncrypted?: Maybe<Scalars['Boolean']>,
  hideEncrypted_not?: Maybe<Scalars['Boolean']>,
  hideUnknownTalkgroups?: Maybe<Scalars['Boolean']>,
  hideUnknownTalkgroups_not?: Maybe<Scalars['Boolean']>,
  calls_every?: Maybe<TrunkedCallWhereInput>,
  calls_some?: Maybe<TrunkedCallWhereInput>,
  calls_none?: Maybe<TrunkedCallWhereInput>,
  AND?: Maybe<Array<TrunkedSystemWhereInput>>,
  OR?: Maybe<Array<TrunkedSystemWhereInput>>,
  NOT?: Maybe<Array<TrunkedSystemWhereInput>>,
};

export type TrunkedSystemWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>,
  shortName?: Maybe<Scalars['String']>,
};

export type TrunkedTalkgroup = {
   __typename?: 'TrunkedTalkgroup',
  id: Scalars['ID'],
  updatedAt: Scalars['DateTime'],
  createdAt: Scalars['DateTime'],
  decimal: Scalars['Int'],
  hex: Scalars['String'],
  mode: Scalars['String'],
  alphaTag: Scalars['String'],
  description: Scalars['String'],
  tag: Scalars['String'],
  group: Scalars['String'],
  priority: Scalars['Int'],
  system: TrunkedSystem,
  calls?: Maybe<Array<TrunkedCall>>,
  hash: Scalars['String'],
};


export type TrunkedTalkgroupCallsArgs = {
  where?: Maybe<TrunkedCallWhereInput>,
  orderBy?: Maybe<TrunkedCallOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};

export type TrunkedTalkgroupConnection = {
   __typename?: 'TrunkedTalkgroupConnection',
  pageInfo: PageInfo,
  edges: Array<Maybe<TrunkedTalkgroupEdge>>,
  aggregate: AggregateTrunkedTalkgroup,
};

export type TrunkedTalkgroupCreateInput = {
  id?: Maybe<Scalars['ID']>,
  decimal: Scalars['Int'],
  hex: Scalars['String'],
  mode: Scalars['String'],
  alphaTag: Scalars['String'],
  description: Scalars['String'],
  tag: Scalars['String'],
  group: Scalars['String'],
  priority?: Maybe<Scalars['Int']>,
  system: TrunkedSystemCreateOneWithoutTalkgroupsInput,
  calls?: Maybe<TrunkedCallCreateManyWithoutTalkgroupInput>,
  hash: Scalars['String'],
};

export type TrunkedTalkgroupCreateManyInput = {
  create?: Maybe<Array<TrunkedTalkgroupCreateInput>>,
  connect?: Maybe<Array<TrunkedTalkgroupWhereUniqueInput>>,
};

export type TrunkedTalkgroupCreateManyWithoutSystemInput = {
  create?: Maybe<Array<TrunkedTalkgroupCreateWithoutSystemInput>>,
  connect?: Maybe<Array<TrunkedTalkgroupWhereUniqueInput>>,
};

export type TrunkedTalkgroupCreateOneWithoutCallsInput = {
  create?: Maybe<TrunkedTalkgroupCreateWithoutCallsInput>,
  connect?: Maybe<TrunkedTalkgroupWhereUniqueInput>,
};

export type TrunkedTalkgroupCreateWithoutCallsInput = {
  id?: Maybe<Scalars['ID']>,
  decimal: Scalars['Int'],
  hex: Scalars['String'],
  mode: Scalars['String'],
  alphaTag: Scalars['String'],
  description: Scalars['String'],
  tag: Scalars['String'],
  group: Scalars['String'],
  priority?: Maybe<Scalars['Int']>,
  system: TrunkedSystemCreateOneWithoutTalkgroupsInput,
  hash: Scalars['String'],
};

export type TrunkedTalkgroupCreateWithoutSystemInput = {
  id?: Maybe<Scalars['ID']>,
  decimal: Scalars['Int'],
  hex: Scalars['String'],
  mode: Scalars['String'],
  alphaTag: Scalars['String'],
  description: Scalars['String'],
  tag: Scalars['String'],
  group: Scalars['String'],
  priority?: Maybe<Scalars['Int']>,
  calls?: Maybe<TrunkedCallCreateManyWithoutTalkgroupInput>,
  hash: Scalars['String'],
};

export enum TrunkedTalkgroupDisplayFormat {
  Id = 'ID',
  IdTag = 'ID_TAG',
  TagId = 'TAG_ID'
}

export type TrunkedTalkgroupEdge = {
   __typename?: 'TrunkedTalkgroupEdge',
  node: TrunkedTalkgroup,
  cursor: Scalars['String'],
};

export enum TrunkedTalkgroupOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DecimalAsc = 'decimal_ASC',
  DecimalDesc = 'decimal_DESC',
  HexAsc = 'hex_ASC',
  HexDesc = 'hex_DESC',
  ModeAsc = 'mode_ASC',
  ModeDesc = 'mode_DESC',
  AlphaTagAsc = 'alphaTag_ASC',
  AlphaTagDesc = 'alphaTag_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  TagAsc = 'tag_ASC',
  TagDesc = 'tag_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  PriorityAsc = 'priority_ASC',
  PriorityDesc = 'priority_DESC',
  HashAsc = 'hash_ASC',
  HashDesc = 'hash_DESC'
}

export type TrunkedTalkgroupPreviousValues = {
   __typename?: 'TrunkedTalkgroupPreviousValues',
  id: Scalars['ID'],
  updatedAt: Scalars['DateTime'],
  createdAt: Scalars['DateTime'],
  decimal: Scalars['Int'],
  hex: Scalars['String'],
  mode: Scalars['String'],
  alphaTag: Scalars['String'],
  description: Scalars['String'],
  tag: Scalars['String'],
  group: Scalars['String'],
  priority: Scalars['Int'],
  hash: Scalars['String'],
};

export type TrunkedTalkgroupScalarWhereInput = {
  id?: Maybe<Scalars['ID']>,
  id_not?: Maybe<Scalars['ID']>,
  id_in?: Maybe<Array<Scalars['ID']>>,
  id_not_in?: Maybe<Array<Scalars['ID']>>,
  id_lt?: Maybe<Scalars['ID']>,
  id_lte?: Maybe<Scalars['ID']>,
  id_gt?: Maybe<Scalars['ID']>,
  id_gte?: Maybe<Scalars['ID']>,
  id_contains?: Maybe<Scalars['ID']>,
  id_not_contains?: Maybe<Scalars['ID']>,
  id_starts_with?: Maybe<Scalars['ID']>,
  id_not_starts_with?: Maybe<Scalars['ID']>,
  id_ends_with?: Maybe<Scalars['ID']>,
  id_not_ends_with?: Maybe<Scalars['ID']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
  updatedAt_not?: Maybe<Scalars['DateTime']>,
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_lt?: Maybe<Scalars['DateTime']>,
  updatedAt_lte?: Maybe<Scalars['DateTime']>,
  updatedAt_gt?: Maybe<Scalars['DateTime']>,
  updatedAt_gte?: Maybe<Scalars['DateTime']>,
  createdAt?: Maybe<Scalars['DateTime']>,
  createdAt_not?: Maybe<Scalars['DateTime']>,
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_lt?: Maybe<Scalars['DateTime']>,
  createdAt_lte?: Maybe<Scalars['DateTime']>,
  createdAt_gt?: Maybe<Scalars['DateTime']>,
  createdAt_gte?: Maybe<Scalars['DateTime']>,
  decimal?: Maybe<Scalars['Int']>,
  decimal_not?: Maybe<Scalars['Int']>,
  decimal_in?: Maybe<Array<Scalars['Int']>>,
  decimal_not_in?: Maybe<Array<Scalars['Int']>>,
  decimal_lt?: Maybe<Scalars['Int']>,
  decimal_lte?: Maybe<Scalars['Int']>,
  decimal_gt?: Maybe<Scalars['Int']>,
  decimal_gte?: Maybe<Scalars['Int']>,
  hex?: Maybe<Scalars['String']>,
  hex_not?: Maybe<Scalars['String']>,
  hex_in?: Maybe<Array<Scalars['String']>>,
  hex_not_in?: Maybe<Array<Scalars['String']>>,
  hex_lt?: Maybe<Scalars['String']>,
  hex_lte?: Maybe<Scalars['String']>,
  hex_gt?: Maybe<Scalars['String']>,
  hex_gte?: Maybe<Scalars['String']>,
  hex_contains?: Maybe<Scalars['String']>,
  hex_not_contains?: Maybe<Scalars['String']>,
  hex_starts_with?: Maybe<Scalars['String']>,
  hex_not_starts_with?: Maybe<Scalars['String']>,
  hex_ends_with?: Maybe<Scalars['String']>,
  hex_not_ends_with?: Maybe<Scalars['String']>,
  mode?: Maybe<Scalars['String']>,
  mode_not?: Maybe<Scalars['String']>,
  mode_in?: Maybe<Array<Scalars['String']>>,
  mode_not_in?: Maybe<Array<Scalars['String']>>,
  mode_lt?: Maybe<Scalars['String']>,
  mode_lte?: Maybe<Scalars['String']>,
  mode_gt?: Maybe<Scalars['String']>,
  mode_gte?: Maybe<Scalars['String']>,
  mode_contains?: Maybe<Scalars['String']>,
  mode_not_contains?: Maybe<Scalars['String']>,
  mode_starts_with?: Maybe<Scalars['String']>,
  mode_not_starts_with?: Maybe<Scalars['String']>,
  mode_ends_with?: Maybe<Scalars['String']>,
  mode_not_ends_with?: Maybe<Scalars['String']>,
  alphaTag?: Maybe<Scalars['String']>,
  alphaTag_not?: Maybe<Scalars['String']>,
  alphaTag_in?: Maybe<Array<Scalars['String']>>,
  alphaTag_not_in?: Maybe<Array<Scalars['String']>>,
  alphaTag_lt?: Maybe<Scalars['String']>,
  alphaTag_lte?: Maybe<Scalars['String']>,
  alphaTag_gt?: Maybe<Scalars['String']>,
  alphaTag_gte?: Maybe<Scalars['String']>,
  alphaTag_contains?: Maybe<Scalars['String']>,
  alphaTag_not_contains?: Maybe<Scalars['String']>,
  alphaTag_starts_with?: Maybe<Scalars['String']>,
  alphaTag_not_starts_with?: Maybe<Scalars['String']>,
  alphaTag_ends_with?: Maybe<Scalars['String']>,
  alphaTag_not_ends_with?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  description_not?: Maybe<Scalars['String']>,
  description_in?: Maybe<Array<Scalars['String']>>,
  description_not_in?: Maybe<Array<Scalars['String']>>,
  description_lt?: Maybe<Scalars['String']>,
  description_lte?: Maybe<Scalars['String']>,
  description_gt?: Maybe<Scalars['String']>,
  description_gte?: Maybe<Scalars['String']>,
  description_contains?: Maybe<Scalars['String']>,
  description_not_contains?: Maybe<Scalars['String']>,
  description_starts_with?: Maybe<Scalars['String']>,
  description_not_starts_with?: Maybe<Scalars['String']>,
  description_ends_with?: Maybe<Scalars['String']>,
  description_not_ends_with?: Maybe<Scalars['String']>,
  tag?: Maybe<Scalars['String']>,
  tag_not?: Maybe<Scalars['String']>,
  tag_in?: Maybe<Array<Scalars['String']>>,
  tag_not_in?: Maybe<Array<Scalars['String']>>,
  tag_lt?: Maybe<Scalars['String']>,
  tag_lte?: Maybe<Scalars['String']>,
  tag_gt?: Maybe<Scalars['String']>,
  tag_gte?: Maybe<Scalars['String']>,
  tag_contains?: Maybe<Scalars['String']>,
  tag_not_contains?: Maybe<Scalars['String']>,
  tag_starts_with?: Maybe<Scalars['String']>,
  tag_not_starts_with?: Maybe<Scalars['String']>,
  tag_ends_with?: Maybe<Scalars['String']>,
  tag_not_ends_with?: Maybe<Scalars['String']>,
  group?: Maybe<Scalars['String']>,
  group_not?: Maybe<Scalars['String']>,
  group_in?: Maybe<Array<Scalars['String']>>,
  group_not_in?: Maybe<Array<Scalars['String']>>,
  group_lt?: Maybe<Scalars['String']>,
  group_lte?: Maybe<Scalars['String']>,
  group_gt?: Maybe<Scalars['String']>,
  group_gte?: Maybe<Scalars['String']>,
  group_contains?: Maybe<Scalars['String']>,
  group_not_contains?: Maybe<Scalars['String']>,
  group_starts_with?: Maybe<Scalars['String']>,
  group_not_starts_with?: Maybe<Scalars['String']>,
  group_ends_with?: Maybe<Scalars['String']>,
  group_not_ends_with?: Maybe<Scalars['String']>,
  priority?: Maybe<Scalars['Int']>,
  priority_not?: Maybe<Scalars['Int']>,
  priority_in?: Maybe<Array<Scalars['Int']>>,
  priority_not_in?: Maybe<Array<Scalars['Int']>>,
  priority_lt?: Maybe<Scalars['Int']>,
  priority_lte?: Maybe<Scalars['Int']>,
  priority_gt?: Maybe<Scalars['Int']>,
  priority_gte?: Maybe<Scalars['Int']>,
  hash?: Maybe<Scalars['String']>,
  hash_not?: Maybe<Scalars['String']>,
  hash_in?: Maybe<Array<Scalars['String']>>,
  hash_not_in?: Maybe<Array<Scalars['String']>>,
  hash_lt?: Maybe<Scalars['String']>,
  hash_lte?: Maybe<Scalars['String']>,
  hash_gt?: Maybe<Scalars['String']>,
  hash_gte?: Maybe<Scalars['String']>,
  hash_contains?: Maybe<Scalars['String']>,
  hash_not_contains?: Maybe<Scalars['String']>,
  hash_starts_with?: Maybe<Scalars['String']>,
  hash_not_starts_with?: Maybe<Scalars['String']>,
  hash_ends_with?: Maybe<Scalars['String']>,
  hash_not_ends_with?: Maybe<Scalars['String']>,
  AND?: Maybe<Array<TrunkedTalkgroupScalarWhereInput>>,
  OR?: Maybe<Array<TrunkedTalkgroupScalarWhereInput>>,
  NOT?: Maybe<Array<TrunkedTalkgroupScalarWhereInput>>,
};

export type TrunkedTalkgroupSubscriptionPayload = {
   __typename?: 'TrunkedTalkgroupSubscriptionPayload',
  mutation: MutationType,
  node?: Maybe<TrunkedTalkgroup>,
  updatedFields?: Maybe<Array<Scalars['String']>>,
  previousValues?: Maybe<TrunkedTalkgroupPreviousValues>,
};

export type TrunkedTalkgroupSubscriptionWhereInput = {
  mutation_in?: Maybe<Array<MutationType>>,
  updatedFields_contains?: Maybe<Scalars['String']>,
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>,
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>,
  node?: Maybe<TrunkedTalkgroupWhereInput>,
  AND?: Maybe<Array<TrunkedTalkgroupSubscriptionWhereInput>>,
  OR?: Maybe<Array<TrunkedTalkgroupSubscriptionWhereInput>>,
  NOT?: Maybe<Array<TrunkedTalkgroupSubscriptionWhereInput>>,
};

export type TrunkedTalkgroupUpdateDataInput = {
  decimal?: Maybe<Scalars['Int']>,
  hex?: Maybe<Scalars['String']>,
  mode?: Maybe<Scalars['String']>,
  alphaTag?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  tag?: Maybe<Scalars['String']>,
  group?: Maybe<Scalars['String']>,
  priority?: Maybe<Scalars['Int']>,
  system?: Maybe<TrunkedSystemUpdateOneRequiredWithoutTalkgroupsInput>,
  calls?: Maybe<TrunkedCallUpdateManyWithoutTalkgroupInput>,
  hash?: Maybe<Scalars['String']>,
};

export type TrunkedTalkgroupUpdateInput = {
  decimal?: Maybe<Scalars['Int']>,
  hex?: Maybe<Scalars['String']>,
  mode?: Maybe<Scalars['String']>,
  alphaTag?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  tag?: Maybe<Scalars['String']>,
  group?: Maybe<Scalars['String']>,
  priority?: Maybe<Scalars['Int']>,
  system?: Maybe<TrunkedSystemUpdateOneRequiredWithoutTalkgroupsInput>,
  calls?: Maybe<TrunkedCallUpdateManyWithoutTalkgroupInput>,
  hash?: Maybe<Scalars['String']>,
};

export type TrunkedTalkgroupUpdateManyDataInput = {
  decimal?: Maybe<Scalars['Int']>,
  hex?: Maybe<Scalars['String']>,
  mode?: Maybe<Scalars['String']>,
  alphaTag?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  tag?: Maybe<Scalars['String']>,
  group?: Maybe<Scalars['String']>,
  priority?: Maybe<Scalars['Int']>,
  hash?: Maybe<Scalars['String']>,
};

export type TrunkedTalkgroupUpdateManyInput = {
  create?: Maybe<Array<TrunkedTalkgroupCreateInput>>,
  update?: Maybe<Array<TrunkedTalkgroupUpdateWithWhereUniqueNestedInput>>,
  upsert?: Maybe<Array<TrunkedTalkgroupUpsertWithWhereUniqueNestedInput>>,
  delete?: Maybe<Array<TrunkedTalkgroupWhereUniqueInput>>,
  connect?: Maybe<Array<TrunkedTalkgroupWhereUniqueInput>>,
  set?: Maybe<Array<TrunkedTalkgroupWhereUniqueInput>>,
  disconnect?: Maybe<Array<TrunkedTalkgroupWhereUniqueInput>>,
  deleteMany?: Maybe<Array<TrunkedTalkgroupScalarWhereInput>>,
  updateMany?: Maybe<Array<TrunkedTalkgroupUpdateManyWithWhereNestedInput>>,
};

export type TrunkedTalkgroupUpdateManyMutationInput = {
  decimal?: Maybe<Scalars['Int']>,
  hex?: Maybe<Scalars['String']>,
  mode?: Maybe<Scalars['String']>,
  alphaTag?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  tag?: Maybe<Scalars['String']>,
  group?: Maybe<Scalars['String']>,
  priority?: Maybe<Scalars['Int']>,
  hash?: Maybe<Scalars['String']>,
};

export type TrunkedTalkgroupUpdateManyWithoutSystemInput = {
  create?: Maybe<Array<TrunkedTalkgroupCreateWithoutSystemInput>>,
  delete?: Maybe<Array<TrunkedTalkgroupWhereUniqueInput>>,
  connect?: Maybe<Array<TrunkedTalkgroupWhereUniqueInput>>,
  set?: Maybe<Array<TrunkedTalkgroupWhereUniqueInput>>,
  disconnect?: Maybe<Array<TrunkedTalkgroupWhereUniqueInput>>,
  update?: Maybe<Array<TrunkedTalkgroupUpdateWithWhereUniqueWithoutSystemInput>>,
  upsert?: Maybe<Array<TrunkedTalkgroupUpsertWithWhereUniqueWithoutSystemInput>>,
  deleteMany?: Maybe<Array<TrunkedTalkgroupScalarWhereInput>>,
  updateMany?: Maybe<Array<TrunkedTalkgroupUpdateManyWithWhereNestedInput>>,
};

export type TrunkedTalkgroupUpdateManyWithWhereNestedInput = {
  where: TrunkedTalkgroupScalarWhereInput,
  data: TrunkedTalkgroupUpdateManyDataInput,
};

export type TrunkedTalkgroupUpdateOneWithoutCallsInput = {
  create?: Maybe<TrunkedTalkgroupCreateWithoutCallsInput>,
  update?: Maybe<TrunkedTalkgroupUpdateWithoutCallsDataInput>,
  upsert?: Maybe<TrunkedTalkgroupUpsertWithoutCallsInput>,
  delete?: Maybe<Scalars['Boolean']>,
  disconnect?: Maybe<Scalars['Boolean']>,
  connect?: Maybe<TrunkedTalkgroupWhereUniqueInput>,
};

export type TrunkedTalkgroupUpdateWithoutCallsDataInput = {
  decimal?: Maybe<Scalars['Int']>,
  hex?: Maybe<Scalars['String']>,
  mode?: Maybe<Scalars['String']>,
  alphaTag?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  tag?: Maybe<Scalars['String']>,
  group?: Maybe<Scalars['String']>,
  priority?: Maybe<Scalars['Int']>,
  system?: Maybe<TrunkedSystemUpdateOneRequiredWithoutTalkgroupsInput>,
  hash?: Maybe<Scalars['String']>,
};

export type TrunkedTalkgroupUpdateWithoutSystemDataInput = {
  decimal?: Maybe<Scalars['Int']>,
  hex?: Maybe<Scalars['String']>,
  mode?: Maybe<Scalars['String']>,
  alphaTag?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  tag?: Maybe<Scalars['String']>,
  group?: Maybe<Scalars['String']>,
  priority?: Maybe<Scalars['Int']>,
  calls?: Maybe<TrunkedCallUpdateManyWithoutTalkgroupInput>,
  hash?: Maybe<Scalars['String']>,
};

export type TrunkedTalkgroupUpdateWithWhereUniqueNestedInput = {
  where: TrunkedTalkgroupWhereUniqueInput,
  data: TrunkedTalkgroupUpdateDataInput,
};

export type TrunkedTalkgroupUpdateWithWhereUniqueWithoutSystemInput = {
  where: TrunkedTalkgroupWhereUniqueInput,
  data: TrunkedTalkgroupUpdateWithoutSystemDataInput,
};

export type TrunkedTalkgroupUpsertWithoutCallsInput = {
  update: TrunkedTalkgroupUpdateWithoutCallsDataInput,
  create: TrunkedTalkgroupCreateWithoutCallsInput,
};

export type TrunkedTalkgroupUpsertWithWhereUniqueNestedInput = {
  where: TrunkedTalkgroupWhereUniqueInput,
  update: TrunkedTalkgroupUpdateDataInput,
  create: TrunkedTalkgroupCreateInput,
};

export type TrunkedTalkgroupUpsertWithWhereUniqueWithoutSystemInput = {
  where: TrunkedTalkgroupWhereUniqueInput,
  update: TrunkedTalkgroupUpdateWithoutSystemDataInput,
  create: TrunkedTalkgroupCreateWithoutSystemInput,
};

export type TrunkedTalkgroupWhereInput = {
  id?: Maybe<Scalars['ID']>,
  id_not?: Maybe<Scalars['ID']>,
  id_in?: Maybe<Array<Scalars['ID']>>,
  id_not_in?: Maybe<Array<Scalars['ID']>>,
  id_lt?: Maybe<Scalars['ID']>,
  id_lte?: Maybe<Scalars['ID']>,
  id_gt?: Maybe<Scalars['ID']>,
  id_gte?: Maybe<Scalars['ID']>,
  id_contains?: Maybe<Scalars['ID']>,
  id_not_contains?: Maybe<Scalars['ID']>,
  id_starts_with?: Maybe<Scalars['ID']>,
  id_not_starts_with?: Maybe<Scalars['ID']>,
  id_ends_with?: Maybe<Scalars['ID']>,
  id_not_ends_with?: Maybe<Scalars['ID']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
  updatedAt_not?: Maybe<Scalars['DateTime']>,
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_lt?: Maybe<Scalars['DateTime']>,
  updatedAt_lte?: Maybe<Scalars['DateTime']>,
  updatedAt_gt?: Maybe<Scalars['DateTime']>,
  updatedAt_gte?: Maybe<Scalars['DateTime']>,
  createdAt?: Maybe<Scalars['DateTime']>,
  createdAt_not?: Maybe<Scalars['DateTime']>,
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_lt?: Maybe<Scalars['DateTime']>,
  createdAt_lte?: Maybe<Scalars['DateTime']>,
  createdAt_gt?: Maybe<Scalars['DateTime']>,
  createdAt_gte?: Maybe<Scalars['DateTime']>,
  decimal?: Maybe<Scalars['Int']>,
  decimal_not?: Maybe<Scalars['Int']>,
  decimal_in?: Maybe<Array<Scalars['Int']>>,
  decimal_not_in?: Maybe<Array<Scalars['Int']>>,
  decimal_lt?: Maybe<Scalars['Int']>,
  decimal_lte?: Maybe<Scalars['Int']>,
  decimal_gt?: Maybe<Scalars['Int']>,
  decimal_gte?: Maybe<Scalars['Int']>,
  hex?: Maybe<Scalars['String']>,
  hex_not?: Maybe<Scalars['String']>,
  hex_in?: Maybe<Array<Scalars['String']>>,
  hex_not_in?: Maybe<Array<Scalars['String']>>,
  hex_lt?: Maybe<Scalars['String']>,
  hex_lte?: Maybe<Scalars['String']>,
  hex_gt?: Maybe<Scalars['String']>,
  hex_gte?: Maybe<Scalars['String']>,
  hex_contains?: Maybe<Scalars['String']>,
  hex_not_contains?: Maybe<Scalars['String']>,
  hex_starts_with?: Maybe<Scalars['String']>,
  hex_not_starts_with?: Maybe<Scalars['String']>,
  hex_ends_with?: Maybe<Scalars['String']>,
  hex_not_ends_with?: Maybe<Scalars['String']>,
  mode?: Maybe<Scalars['String']>,
  mode_not?: Maybe<Scalars['String']>,
  mode_in?: Maybe<Array<Scalars['String']>>,
  mode_not_in?: Maybe<Array<Scalars['String']>>,
  mode_lt?: Maybe<Scalars['String']>,
  mode_lte?: Maybe<Scalars['String']>,
  mode_gt?: Maybe<Scalars['String']>,
  mode_gte?: Maybe<Scalars['String']>,
  mode_contains?: Maybe<Scalars['String']>,
  mode_not_contains?: Maybe<Scalars['String']>,
  mode_starts_with?: Maybe<Scalars['String']>,
  mode_not_starts_with?: Maybe<Scalars['String']>,
  mode_ends_with?: Maybe<Scalars['String']>,
  mode_not_ends_with?: Maybe<Scalars['String']>,
  alphaTag?: Maybe<Scalars['String']>,
  alphaTag_not?: Maybe<Scalars['String']>,
  alphaTag_in?: Maybe<Array<Scalars['String']>>,
  alphaTag_not_in?: Maybe<Array<Scalars['String']>>,
  alphaTag_lt?: Maybe<Scalars['String']>,
  alphaTag_lte?: Maybe<Scalars['String']>,
  alphaTag_gt?: Maybe<Scalars['String']>,
  alphaTag_gte?: Maybe<Scalars['String']>,
  alphaTag_contains?: Maybe<Scalars['String']>,
  alphaTag_not_contains?: Maybe<Scalars['String']>,
  alphaTag_starts_with?: Maybe<Scalars['String']>,
  alphaTag_not_starts_with?: Maybe<Scalars['String']>,
  alphaTag_ends_with?: Maybe<Scalars['String']>,
  alphaTag_not_ends_with?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  description_not?: Maybe<Scalars['String']>,
  description_in?: Maybe<Array<Scalars['String']>>,
  description_not_in?: Maybe<Array<Scalars['String']>>,
  description_lt?: Maybe<Scalars['String']>,
  description_lte?: Maybe<Scalars['String']>,
  description_gt?: Maybe<Scalars['String']>,
  description_gte?: Maybe<Scalars['String']>,
  description_contains?: Maybe<Scalars['String']>,
  description_not_contains?: Maybe<Scalars['String']>,
  description_starts_with?: Maybe<Scalars['String']>,
  description_not_starts_with?: Maybe<Scalars['String']>,
  description_ends_with?: Maybe<Scalars['String']>,
  description_not_ends_with?: Maybe<Scalars['String']>,
  tag?: Maybe<Scalars['String']>,
  tag_not?: Maybe<Scalars['String']>,
  tag_in?: Maybe<Array<Scalars['String']>>,
  tag_not_in?: Maybe<Array<Scalars['String']>>,
  tag_lt?: Maybe<Scalars['String']>,
  tag_lte?: Maybe<Scalars['String']>,
  tag_gt?: Maybe<Scalars['String']>,
  tag_gte?: Maybe<Scalars['String']>,
  tag_contains?: Maybe<Scalars['String']>,
  tag_not_contains?: Maybe<Scalars['String']>,
  tag_starts_with?: Maybe<Scalars['String']>,
  tag_not_starts_with?: Maybe<Scalars['String']>,
  tag_ends_with?: Maybe<Scalars['String']>,
  tag_not_ends_with?: Maybe<Scalars['String']>,
  group?: Maybe<Scalars['String']>,
  group_not?: Maybe<Scalars['String']>,
  group_in?: Maybe<Array<Scalars['String']>>,
  group_not_in?: Maybe<Array<Scalars['String']>>,
  group_lt?: Maybe<Scalars['String']>,
  group_lte?: Maybe<Scalars['String']>,
  group_gt?: Maybe<Scalars['String']>,
  group_gte?: Maybe<Scalars['String']>,
  group_contains?: Maybe<Scalars['String']>,
  group_not_contains?: Maybe<Scalars['String']>,
  group_starts_with?: Maybe<Scalars['String']>,
  group_not_starts_with?: Maybe<Scalars['String']>,
  group_ends_with?: Maybe<Scalars['String']>,
  group_not_ends_with?: Maybe<Scalars['String']>,
  priority?: Maybe<Scalars['Int']>,
  priority_not?: Maybe<Scalars['Int']>,
  priority_in?: Maybe<Array<Scalars['Int']>>,
  priority_not_in?: Maybe<Array<Scalars['Int']>>,
  priority_lt?: Maybe<Scalars['Int']>,
  priority_lte?: Maybe<Scalars['Int']>,
  priority_gt?: Maybe<Scalars['Int']>,
  priority_gte?: Maybe<Scalars['Int']>,
  system?: Maybe<TrunkedSystemWhereInput>,
  calls_every?: Maybe<TrunkedCallWhereInput>,
  calls_some?: Maybe<TrunkedCallWhereInput>,
  calls_none?: Maybe<TrunkedCallWhereInput>,
  hash?: Maybe<Scalars['String']>,
  hash_not?: Maybe<Scalars['String']>,
  hash_in?: Maybe<Array<Scalars['String']>>,
  hash_not_in?: Maybe<Array<Scalars['String']>>,
  hash_lt?: Maybe<Scalars['String']>,
  hash_lte?: Maybe<Scalars['String']>,
  hash_gt?: Maybe<Scalars['String']>,
  hash_gte?: Maybe<Scalars['String']>,
  hash_contains?: Maybe<Scalars['String']>,
  hash_not_contains?: Maybe<Scalars['String']>,
  hash_starts_with?: Maybe<Scalars['String']>,
  hash_not_starts_with?: Maybe<Scalars['String']>,
  hash_ends_with?: Maybe<Scalars['String']>,
  hash_not_ends_with?: Maybe<Scalars['String']>,
  AND?: Maybe<Array<TrunkedTalkgroupWhereInput>>,
  OR?: Maybe<Array<TrunkedTalkgroupWhereInput>>,
  NOT?: Maybe<Array<TrunkedTalkgroupWhereInput>>,
};

export type TrunkedTalkgroupWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>,
  hash?: Maybe<Scalars['String']>,
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  updatedAt: Scalars['DateTime'],
  createdAt: Scalars['DateTime'],
  name: Scalars['String'],
  email: Scalars['String'],
  phone: Scalars['String'],
  verified: Scalars['Boolean'],
  password: Scalars['String'],
  authyId?: Maybe<Scalars['String']>,
  role: UserRole,
};

export type UserConnection = {
   __typename?: 'UserConnection',
  pageInfo: PageInfo,
  edges: Array<Maybe<UserEdge>>,
  aggregate: AggregateUser,
};

export type UserCreateInput = {
  id?: Maybe<Scalars['ID']>,
  name: Scalars['String'],
  email: Scalars['String'],
  phone: Scalars['String'],
  verified?: Maybe<Scalars['Boolean']>,
  password: Scalars['String'],
  authyId?: Maybe<Scalars['String']>,
  role?: Maybe<UserRole>,
};

export type UserEdge = {
   __typename?: 'UserEdge',
  node: User,
  cursor: Scalars['String'],
};

export enum UserOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  EmailAsc = 'email_ASC',
  EmailDesc = 'email_DESC',
  PhoneAsc = 'phone_ASC',
  PhoneDesc = 'phone_DESC',
  VerifiedAsc = 'verified_ASC',
  VerifiedDesc = 'verified_DESC',
  PasswordAsc = 'password_ASC',
  PasswordDesc = 'password_DESC',
  AuthyIdAsc = 'authyId_ASC',
  AuthyIdDesc = 'authyId_DESC',
  RoleAsc = 'role_ASC',
  RoleDesc = 'role_DESC'
}

export type UserPreviousValues = {
   __typename?: 'UserPreviousValues',
  id: Scalars['ID'],
  updatedAt: Scalars['DateTime'],
  createdAt: Scalars['DateTime'],
  name: Scalars['String'],
  email: Scalars['String'],
  phone: Scalars['String'],
  verified: Scalars['Boolean'],
  password: Scalars['String'],
  authyId?: Maybe<Scalars['String']>,
  role: UserRole,
};

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
  Support = 'SUPPORT'
}

export type UserSubscriptionPayload = {
   __typename?: 'UserSubscriptionPayload',
  mutation: MutationType,
  node?: Maybe<User>,
  updatedFields?: Maybe<Array<Scalars['String']>>,
  previousValues?: Maybe<UserPreviousValues>,
};

export type UserSubscriptionWhereInput = {
  mutation_in?: Maybe<Array<MutationType>>,
  updatedFields_contains?: Maybe<Scalars['String']>,
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>,
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>,
  node?: Maybe<UserWhereInput>,
  AND?: Maybe<Array<UserSubscriptionWhereInput>>,
  OR?: Maybe<Array<UserSubscriptionWhereInput>>,
  NOT?: Maybe<Array<UserSubscriptionWhereInput>>,
};

export type UserUpdateInput = {
  name?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  phone?: Maybe<Scalars['String']>,
  verified?: Maybe<Scalars['Boolean']>,
  password?: Maybe<Scalars['String']>,
  authyId?: Maybe<Scalars['String']>,
  role?: Maybe<UserRole>,
};

export type UserUpdateManyMutationInput = {
  name?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  phone?: Maybe<Scalars['String']>,
  verified?: Maybe<Scalars['Boolean']>,
  password?: Maybe<Scalars['String']>,
  authyId?: Maybe<Scalars['String']>,
  role?: Maybe<UserRole>,
};

export type UserWhereInput = {
  id?: Maybe<Scalars['ID']>,
  id_not?: Maybe<Scalars['ID']>,
  id_in?: Maybe<Array<Scalars['ID']>>,
  id_not_in?: Maybe<Array<Scalars['ID']>>,
  id_lt?: Maybe<Scalars['ID']>,
  id_lte?: Maybe<Scalars['ID']>,
  id_gt?: Maybe<Scalars['ID']>,
  id_gte?: Maybe<Scalars['ID']>,
  id_contains?: Maybe<Scalars['ID']>,
  id_not_contains?: Maybe<Scalars['ID']>,
  id_starts_with?: Maybe<Scalars['ID']>,
  id_not_starts_with?: Maybe<Scalars['ID']>,
  id_ends_with?: Maybe<Scalars['ID']>,
  id_not_ends_with?: Maybe<Scalars['ID']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
  updatedAt_not?: Maybe<Scalars['DateTime']>,
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_lt?: Maybe<Scalars['DateTime']>,
  updatedAt_lte?: Maybe<Scalars['DateTime']>,
  updatedAt_gt?: Maybe<Scalars['DateTime']>,
  updatedAt_gte?: Maybe<Scalars['DateTime']>,
  createdAt?: Maybe<Scalars['DateTime']>,
  createdAt_not?: Maybe<Scalars['DateTime']>,
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_lt?: Maybe<Scalars['DateTime']>,
  createdAt_lte?: Maybe<Scalars['DateTime']>,
  createdAt_gt?: Maybe<Scalars['DateTime']>,
  createdAt_gte?: Maybe<Scalars['DateTime']>,
  name?: Maybe<Scalars['String']>,
  name_not?: Maybe<Scalars['String']>,
  name_in?: Maybe<Array<Scalars['String']>>,
  name_not_in?: Maybe<Array<Scalars['String']>>,
  name_lt?: Maybe<Scalars['String']>,
  name_lte?: Maybe<Scalars['String']>,
  name_gt?: Maybe<Scalars['String']>,
  name_gte?: Maybe<Scalars['String']>,
  name_contains?: Maybe<Scalars['String']>,
  name_not_contains?: Maybe<Scalars['String']>,
  name_starts_with?: Maybe<Scalars['String']>,
  name_not_starts_with?: Maybe<Scalars['String']>,
  name_ends_with?: Maybe<Scalars['String']>,
  name_not_ends_with?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  email_not?: Maybe<Scalars['String']>,
  email_in?: Maybe<Array<Scalars['String']>>,
  email_not_in?: Maybe<Array<Scalars['String']>>,
  email_lt?: Maybe<Scalars['String']>,
  email_lte?: Maybe<Scalars['String']>,
  email_gt?: Maybe<Scalars['String']>,
  email_gte?: Maybe<Scalars['String']>,
  email_contains?: Maybe<Scalars['String']>,
  email_not_contains?: Maybe<Scalars['String']>,
  email_starts_with?: Maybe<Scalars['String']>,
  email_not_starts_with?: Maybe<Scalars['String']>,
  email_ends_with?: Maybe<Scalars['String']>,
  email_not_ends_with?: Maybe<Scalars['String']>,
  phone?: Maybe<Scalars['String']>,
  phone_not?: Maybe<Scalars['String']>,
  phone_in?: Maybe<Array<Scalars['String']>>,
  phone_not_in?: Maybe<Array<Scalars['String']>>,
  phone_lt?: Maybe<Scalars['String']>,
  phone_lte?: Maybe<Scalars['String']>,
  phone_gt?: Maybe<Scalars['String']>,
  phone_gte?: Maybe<Scalars['String']>,
  phone_contains?: Maybe<Scalars['String']>,
  phone_not_contains?: Maybe<Scalars['String']>,
  phone_starts_with?: Maybe<Scalars['String']>,
  phone_not_starts_with?: Maybe<Scalars['String']>,
  phone_ends_with?: Maybe<Scalars['String']>,
  phone_not_ends_with?: Maybe<Scalars['String']>,
  verified?: Maybe<Scalars['Boolean']>,
  verified_not?: Maybe<Scalars['Boolean']>,
  password?: Maybe<Scalars['String']>,
  password_not?: Maybe<Scalars['String']>,
  password_in?: Maybe<Array<Scalars['String']>>,
  password_not_in?: Maybe<Array<Scalars['String']>>,
  password_lt?: Maybe<Scalars['String']>,
  password_lte?: Maybe<Scalars['String']>,
  password_gt?: Maybe<Scalars['String']>,
  password_gte?: Maybe<Scalars['String']>,
  password_contains?: Maybe<Scalars['String']>,
  password_not_contains?: Maybe<Scalars['String']>,
  password_starts_with?: Maybe<Scalars['String']>,
  password_not_starts_with?: Maybe<Scalars['String']>,
  password_ends_with?: Maybe<Scalars['String']>,
  password_not_ends_with?: Maybe<Scalars['String']>,
  authyId?: Maybe<Scalars['String']>,
  authyId_not?: Maybe<Scalars['String']>,
  authyId_in?: Maybe<Array<Scalars['String']>>,
  authyId_not_in?: Maybe<Array<Scalars['String']>>,
  authyId_lt?: Maybe<Scalars['String']>,
  authyId_lte?: Maybe<Scalars['String']>,
  authyId_gt?: Maybe<Scalars['String']>,
  authyId_gte?: Maybe<Scalars['String']>,
  authyId_contains?: Maybe<Scalars['String']>,
  authyId_not_contains?: Maybe<Scalars['String']>,
  authyId_starts_with?: Maybe<Scalars['String']>,
  authyId_not_starts_with?: Maybe<Scalars['String']>,
  authyId_ends_with?: Maybe<Scalars['String']>,
  authyId_not_ends_with?: Maybe<Scalars['String']>,
  role?: Maybe<UserRole>,
  role_not?: Maybe<UserRole>,
  role_in?: Maybe<Array<UserRole>>,
  role_not_in?: Maybe<Array<UserRole>>,
  AND?: Maybe<Array<UserWhereInput>>,
  OR?: Maybe<Array<UserWhereInput>>,
  NOT?: Maybe<Array<UserWhereInput>>,
};

export type UserWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>,
  email?: Maybe<Scalars['String']>,
  phone?: Maybe<Scalars['String']>,
};
export type Unnamed_1_MutationVariables = {
  email: Scalars['String'],
  password: Scalars['String'],
  phone: Scalars['String']
};


export type Unnamed_1_Mutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'User' }
    & Pick<User, 'id'>
  ) }
);

export type DeviceRegisteredQueryVariables = {};


export type DeviceRegisteredQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'deviceRegistered'>
);

export type LoginQueryVariables = {
  user: UserWhereUniqueInput,
  password: Scalars['String']
};


export type LoginQuery = (
  { __typename?: 'Query' }
  & { login: Maybe<(
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'token'>
    & { user: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'phone' | 'verified' | 'role'>
    )> }
  )> }
);

export type SendAuthyTextQueryVariables = {
  user: UserWhereUniqueInput
};


export type SendAuthyTextQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'sendAuthyVerification'>
);

export type VerifyAuthCodeQueryVariables = {
  user: UserWhereUniqueInput,
  token: Scalars['String']
};


export type VerifyAuthCodeQuery = (
  { __typename?: 'Query' }
  & { verifyAuthyToken: Maybe<(
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'token'>
    & { user: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'email' | 'id' | 'role'>
    )> }
  )> }
);

export type TrunkedCallsQueryVariables = {
  first?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>,
  orderBy?: Maybe<TrunkedCallOrderByInput>
};


export type TrunkedCallsQuery = (
  { __typename?: 'Query' }
  & { trunkedCalls: Array<Maybe<(
    { __typename?: 'TrunkedCall' }
    & Pick<TrunkedCall, 'id' | 'createdAt' | 'frequency' | 'startTime' | 'endTime' | 'emergency' | 'duration' | 'audioPath' | 'remotePaths'>
    & { talkgroup: Maybe<(
      { __typename?: 'TrunkedTalkgroup' }
      & Pick<TrunkedTalkgroup, 'decimal' | 'alphaTag' | 'description' | 'tag'>
    )>, system: Maybe<(
      { __typename?: 'TrunkedSystem' }
      & Pick<TrunkedSystem, 'id' | 'shortName' | 'type'>
    )>, transcription: Maybe<(
      { __typename?: 'Transcription' }
      & Pick<Transcription, 'body'>
      & { words: Maybe<Array<(
        { __typename?: 'TranscriptionWord' }
        & Pick<TranscriptionWord, 'text' | 'confidence' | 'start' | 'end'>
      )>> }
    )> }
  )>> }
);

export type TrunkedSystemQueryVariables = {
  where: TrunkedSystemWhereUniqueInput
};


export type TrunkedSystemQuery = (
  { __typename?: 'Query' }
  & { trunkedSystem: Maybe<(
    { __typename?: 'TrunkedSystem' }
    & Pick<TrunkedSystem, 'id' | 'name' | 'shortName'>
    & { talkgroups: Maybe<Array<(
      { __typename?: 'TrunkedTalkgroup' }
      & Pick<TrunkedTalkgroup, 'id' | 'hex' | 'decimal'>
    )>> }
  )> }
);

export type TrunkedSystemsQueryVariables = {};


export type TrunkedSystemsQuery = (
  { __typename?: 'Query' }
  & { trunkedSystems: Array<Maybe<(
    { __typename?: 'TrunkedSystem' }
    & Pick<TrunkedSystem, 'id' | 'name' | 'shortName' | 'controlChannels' | 'updatedAt' | 'createdAt' | 'type'>
    & { talkgroups: Maybe<Array<(
      { __typename?: 'TrunkedTalkgroup' }
      & Pick<TrunkedTalkgroup, 'id' | 'hex' | 'decimal'>
    )>> }
  )>> }
);

export type TrunkedSystemsStatsQueryVariables = {};


export type TrunkedSystemsStatsQuery = (
  { __typename?: 'Query' }
  & { trunkedSystemsStats: Maybe<Array<(
    { __typename?: 'TrunkedSystemStats' }
    & Pick<TrunkedSystemStats, 'systemId' | 'callCount' | 'talkgroupCount'>
    & { system: (
      { __typename?: 'TrunkedSystem' }
      & Pick<TrunkedSystem, 'shortName' | 'name' | 'id'>
    ) }
  )>> }
);

export type NewTrunkedCallsSubscriptionVariables = {};


export type NewTrunkedCallsSubscription = (
  { __typename?: 'Subscription' }
  & { trunkedCalls: Maybe<(
    { __typename?: 'TrunkedCall' }
    & Pick<TrunkedCall, 'id' | 'createdAt' | 'frequency' | 'startTime' | 'endTime' | 'emergency' | 'duration' | 'audioPath' | 'remotePaths'>
    & { talkgroup: Maybe<(
      { __typename?: 'TrunkedTalkgroup' }
      & Pick<TrunkedTalkgroup, 'decimal' | 'alphaTag' | 'description' | 'tag'>
    )>, system: Maybe<(
      { __typename?: 'TrunkedSystem' }
      & Pick<TrunkedSystem, 'id' | 'shortName' | 'type'>
    )>, transcription: Maybe<(
      { __typename?: 'Transcription' }
      & Pick<Transcription, 'body'>
      & { words: Maybe<Array<(
        { __typename?: 'TranscriptionWord' }
        & Pick<TranscriptionWord, 'text' | 'confidence' | 'start' | 'end'>
      )>> }
    )> }
  )> }
);

export type TranscriptionsSubscriptionVariables = {};


export type TranscriptionsSubscription = (
  { __typename?: 'Subscription' }
  & { transcriptions: Maybe<(
    { __typename?: 'Transcription' }
    & Pick<Transcription, 'body'>
    & { call: (
      { __typename?: 'TrunkedCall' }
      & Pick<TrunkedCall, 'id'>
    ), words: Maybe<Array<(
      { __typename?: 'TranscriptionWord' }
      & Pick<TranscriptionWord, 'text' | 'confidence' | 'end' | 'start'>
    )>> }
  )> }
);
