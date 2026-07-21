import type { Group, Team } from "./api";

export function extractGroups(data: unknown): Group[] {
  if (Array.isArray(data)) return data;
  if (
    data &&
    typeof data === "object" &&
    "groups" in data &&
    Array.isArray((data as Record<string, unknown>).groups)
  ) {
    return (data as Record<string, unknown>).groups as Group[];
  }
  return [];
}

export function extractTeams(data: unknown): Team[] {
  if (Array.isArray(data)) return data;
  if (
    data &&
    typeof data === "object" &&
    "teams" in data &&
    Array.isArray((data as Record<string, unknown>).teams)
  ) {
    return (data as Record<string, unknown>).teams as Team[];
  }
  return [];
}