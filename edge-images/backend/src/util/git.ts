import git from "git-rev-sync";

export function short(): string | undefined {
  return git.short() || undefined;
}
