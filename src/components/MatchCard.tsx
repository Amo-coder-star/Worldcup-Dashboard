import type { Match, Team } from "@/lib/api";

function getStatusBadge(match: Match) {
  if (match.finished === "TRUE") {
    return <span className="text-xs px-2 py-1 bg-gray-700 rounded">FT</span>;
  }
  if (match.time_elapsed !== "notstarted") {
    return (
      <span className="text-xs px-2 py-1 bg-red-600 rounded animate-pulse">
        {match.time_elapsed}
      </span>
    );
  }
  return (
    <span className="text-xs px-2 py-1 bg-gray-700 rounded">
      {match.local_date}
    </span>
  );
}

export function MatchCard({
  match,
  homeTeam,
  awayTeam,
}: {
  match: Match;
  homeTeam?: Team;
  awayTeam?: Team;
}) {
  const homeName = match.home_team_name_en || match.home_team_label || "TBD";
  const awayName = match.away_team_name_en || match.away_team_label || "TBD";

  const homeFlagStyle = homeTeam?.flag
    ? {
        backgroundImage: `linear-gradient(135deg, rgba(2, 6, 23, 0.2), rgba(2, 6, 23, 0.82)), url(${homeTeam.flag})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {
        backgroundImage:
          "linear-gradient(135deg, rgba(71, 85, 105, 0.95), rgba(15, 23, 42, 0.95))",
      };

  const awayFlagStyle = awayTeam?.flag
    ? {
        backgroundImage: `linear-gradient(135deg, rgba(2, 6, 23, 0.2), rgba(2, 6, 23, 0.82)), url(${awayTeam.flag})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {
        backgroundImage:
          "linear-gradient(135deg, rgba(71, 85, 105, 0.95), rgba(15, 23, 42, 0.95))",
      };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs text-gray-400 uppercase">
          {match.type === "group" ? `Group ${match.group}` : match.group}
        </span>
        {getStatusBadge(match)}
      </div>
      <div className="flex items-center justify-between">
        <div className="w-28">
          <div
            className="glassy-team team-flag-surface text-sm font-medium truncate text-white"
            style={homeFlagStyle}
            title={homeName}
          >
            {homeName}
          </div>
        </div>

        <div className="mx-4 text-xl font-black tracking-wide text-white">
          {match.home_score} - {match.away_score}
        </div>

        <div className="w-28 text-right">
          <div
            className="glassy-team team-flag-surface text-sm font-medium truncate text-white"
            style={awayFlagStyle}
            title={awayName}
          >
            {awayName}
          </div>
        </div>
      </div>
    </div>
  );
}