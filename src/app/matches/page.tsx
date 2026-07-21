import { getMatches, getTeams } from "@/lib/api";
import { extractTeams } from "@/lib/typeGuards";
import type { Team } from "@/lib/api";
import { MatchCard } from "@/components/MatchCard";

export default async function MatchesPage() {
  const [matches, teamsRaw] = await Promise.all([getMatches(), getTeams()]);
  const teams: Team[] = extractTeams(teamsRaw);
  const teamMap = new Map(teams.map((t) => [t.id, t] as const));

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-slate-900">
          All Matches
        </h1>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {matches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              homeTeam={teamMap.get(match.home_team_id)}
              awayTeam={teamMap.get(match.away_team_id)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}