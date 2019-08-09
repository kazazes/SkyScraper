// This resolver file was scaffolded by github.com/prisma/graphqlgen, DO NOT EDIT.
// Please do not import this file directly but copy & paste to your application code.

import { TranscriptionResolvers } from "../generated/graphqlgen";

export const Transcription: TranscriptionResolvers.Type = {
  ...TranscriptionResolvers.defaultResolvers,

  callId: (parent, args, {prisma}) => {
    return prisma.transcription({ id: parent.id }).callId();
  },
  words: (parent, args, {prisma}) => {
    return prisma.transcription({ id: parent.id }).words();
  }
};
