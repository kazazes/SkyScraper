// This resolver file was scaffolded by github.com/prisma/graphqlgen, DO NOT EDIT.
// Please do not import this file directly but copy & paste to your application code.

import { Resolvers } from "../generated/graphqlgen";

import { Mutation } from "./Mutation";
import { Query } from "./Query";
import { Subscription } from "./Subscription";
import { Transcription } from "./Transcription";
import { TranscriptionWord } from "./TranscriptionWord";
import { TrunkedCall } from "./TrunkedCall";
import { TrunkedCallFrequencyTime } from "./TrunkedCallFrequencyTime";
import { TrunkedCallSource } from "./TrunkedCallSource";
import { TrunkedSystem } from "./TrunkedSystem";
import { TrunkedTalkgroup } from "./TrunkedTalkgroup";

export const resolvers: Resolvers = {
  Query,
  Mutation,
  TrunkedCall,
  TrunkedTalkgroup,
  TrunkedSystem,
  TrunkedCallSource,
  TrunkedCallFrequencyTime,
  Transcription,
  TranscriptionWord,
  Subscription,
};
