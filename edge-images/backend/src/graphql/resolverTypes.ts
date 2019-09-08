import {
  TrunkedCall,
  TrunkedSystem,
  TrunkedTalkgroup,
} from "./generated/prisma-client";

export interface TrunkedSystemStats {
  system: TrunkedSystem;
  systemId: string;
  talkgroupCount: number;
  callCount: number;
  calls: TrunkedCall[];
  talkgroups: TrunkedTalkgroup[];
}

export interface LoginResponse {
  token: string | null;
}
