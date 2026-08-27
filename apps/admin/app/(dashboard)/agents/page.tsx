import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RagSettingsForm } from './rag-settings-form';

interface Agent {
  id: string;
  name: string;
  type: 'onboarding' | 'payout' | 'analytics' | 'yield';
  status: 'active' | 'inactive' | 'error';
  lastActive: string;
  assignedClients: number;
}

const agents: Agent[] = [
  {
    id: '1',
    name: 'Client Onboarding Agent',
    type: 'onboarding',
    status: 'active',
    lastActive: '2026-08-27T14:52:00.000Z',
    assignedClients: 12
  },
  {
    id: '2',
    name: 'Payout Manager',
    type: 'payout',
    status: 'active',
    lastActive: '2026-08-27T14:49:00.000Z',
    assignedClients: 45
  },
  {
    id: '3',
    name: 'Analytics Bot',
    type: 'analytics',
    status: 'active',
    lastActive: '2026-08-27T13:54:00.000Z',
    assignedClients: 30
  },
  {
    id: '4',
    name: 'Partner Yield Bot',
    type: 'yield',
    status: 'inactive',
    lastActive: '2026-08-27T11:54:00.000Z',
    assignedClients: 8
  }
];

function getStatusColor(status: Agent['status']) {
  switch (status) {
    case 'active':
      return 'bg-green-500';
    case 'inactive':
      return 'bg-yellow-500';
    case 'error':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
}

export default function AgentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AI Agents</h1>
        <p className="text-muted-foreground">
          Manage your RAG-enabled AI agents and their assignments
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {agents.map((agent) => (
          <Card key={agent.id} className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">{agent.name}</h3>
              <div className="flex items-center space-x-2">
                <div
                  className={`h-2 w-2 rounded-full ${getStatusColor(
                    agent.status
                  )}`}
                />
                <span className="text-sm text-muted-foreground">
                  {agent.status}
                </span>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div>
                <Badge variant="outline" className="mr-2">
                  {agent.type}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Last active:{' '}
                  <time dateTime={agent.lastActive}>{agent.lastActive}</time>
                </span>
              </div>

              <div>
                <span className="text-muted-foreground">Assigned Clients: </span>
                <span>{agent.assignedClients}</span>
              </div>

              <div className="mt-4 flex space-x-2">
                <button className="rounded bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Configure
                </button>
                <button className="rounded bg-secondary px-3 py-1 text-sm text-secondary-foreground">
                  View Logs
                </button>
                <button className="rounded border px-3 py-1 text-sm">
                  Reassign
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-medium">RAG Configuration</h3>
        <p className="mt-2 text-muted-foreground">
          Configure knowledge base and retrieval settings for all agents
        </p>
        <RagSettingsForm />
      </Card>
    </div>
  );
}
