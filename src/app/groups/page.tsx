import { getGroups, getTeams } from "@/lib/api";
import { GroupTable } from "@/components/GroupTable";
import { extractGroups, extractTeams } from "@/lib/typeGuards";
import type { Group, Team } from "@/lib/api";

export default async function GroupsPage() {
  const [groupsRaw, teamsRaw] = await Promise.all([getGroups(), getTeams()]);

  const groups: Group[] = extractGroups(groupsRaw);
  const teams: Team[] = extractTeams(teamsRaw);

  return (
    <main className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Group Standings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group, index) => (
          <GroupTable key={`${group.group}-${index}`} group={group} teams={teams} />
        ))}
      </div>
    </main>
  );
}