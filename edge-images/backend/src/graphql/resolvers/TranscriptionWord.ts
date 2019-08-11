// This resolver file was scaffolded by github.com/prisma/graphqlgen, DO NOT EDIT.
// Please do not import this file directly but copy & paste to your application code.

import { TranscriptionWordResolvers } from "../generated/graphqlgen";

export const TranscriptionWord: TranscriptionWordResolvers.Type = {
  ...TranscriptionWordResolvers.defaultResolvers,
  transcription: (parent, args, { prisma }) => {
    return prisma.transcriptionWord({ id: parent.id }).transcription();
  },
};
