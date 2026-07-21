import type { Group, Team } from "@/lib/api";
import Image from 'next/image';

export function GroupTable({
  group,
  teams,
}: {
  group: Group;
  teams: Team[];
}) {
  const teamMap = new Map(teams.map((t) => [t.id, t]));

  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900/95 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
      <div className="mb-3 flex items-center justify-between border-b border-gray-800 pb-3">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
          Group {group.group}
        </span>
        <span className="rounded-full bg-gray-800 px-2.5 py-1 text-[11px] font-semibold text-gray-200">
          Standings
        </span>
      </div>

      <div className="space-y-2">
        {group.teams.map((standing, index) => {
          const team = teamMap.get(standing.team_id);
          return (
            <div
              key={`${standing.team_id}-${index}`}
              className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-950/70 px-3 py-2.5 transition-colors hover:bg-gray-800/70"
            >
              <div className="min-w-0 flex-1 pr-3">
                <div
                  className="flex w-full items-center gap-2 truncate rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
                  title={team?.name_en}
                >
                  {team?.flag ? (
                    <Image
                      src={team.flag}
                      alt={team?.name_en || "Team flag"}
                      width={40}
                      height={24}
                      className="h-6 w-10 flex-shrink-0 rounded border border-white/15 object-cover"
                    />
                  ) : (
                    <div className="h-6 w-10 flex-shrink-0 rounded border border-white/15 bg-gray-700" />
                  )}
                  <span className="truncate">{team?.name_en || "Unknown"}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm font-semibold text-white">
                <span className="w-8 text-center font-bold text-white">{standing.pts}</span>
                <span className="w-8 text-center text-gray-400">{standing.gf}</span>
                <span className="w-8 text-center text-gray-400">{standing.ga}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
