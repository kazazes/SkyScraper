import { Resolvers } from "../generated/graphqlgen";
import { Query } from "./Query";
import { Subscription } from "./Subscription";
import { TrunkedCall } from "./TrunkedCall";
import { TrunkedCallFrequencyTime } from "./TrunkedCallFrequencyTime";
import { TrunkedCallSource } from "./TrunkedCallSource";
import { TrunkedSystem } from "./TrunkedSystem";
import { TrunkedTalkgroup } from "./TrunkedTalkgroup";

export const resolvers: Resolvers = {
  Query,
  TrunkedCall,
  TrunkedTalkgroup,
  TrunkedSystem,
  TrunkedCallSource,
  TrunkedCallFrequencyTime,
  Subscription
};
