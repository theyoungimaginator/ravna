import { MoreHorizontal } from 'lucide-react';

const campaigns = [
  { name: 'Campaign Alpha', replies: 50, conversions: 25 },
  { name: 'Campaign Beta', replies: 40, conversions: 20 },
  { name: 'Campaign Gamma', replies: 30, conversions: 15 },
];

export function CampaignTable() {
  return (
    <div className="bg-card rounded-lg border overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-4 text-sm font-medium text-muted-foreground">
              Campaign Name
            </th>
            <th className="text-left p-4 text-sm font-medium text-muted-foreground">
              Replies
            </th>
            <th className="text-left p-4 text-sm font-medium text-muted-foreground">
              Conversions
            </th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map(campaign => (
            <tr key={campaign.name} className="border-b last:border-b-0">
              <td className="p-4 font-medium">{campaign.name}</td>
              <td className="p-4 text-muted-foreground">{campaign.replies}</td>
              <td className="p-4 text-muted-foreground">
                {campaign.conversions}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 