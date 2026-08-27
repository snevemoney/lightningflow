import { Card } from '@/components/ui/card';

interface NodeStats {
  alias: string;
  pubkey: string;
  numChannels: number;
  totalCapacity: bigint;
  pendingChannels: number;
  version: string;
}

async function getNodeStats(): Promise<NodeStats> {
  return {
    alias: 'Your Lightning Node',
    pubkey: '03a...b4c',
    numChannels: 24,
    totalCapacity: 5_000_000n,
    pendingChannels: 2,
    version: 'v0.16.0'
  };
}

function formatSats(value: bigint): string {
  return `${value.toString()} sats`;
}

export default async function NodePage() {
  try {
    const stats = await getNodeStats();

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Node Health</h1>
          <p className="text-muted-foreground">
            Monitor your Lightning node status and channel health
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6">
            <h3 className="text-lg font-medium">Node Info</h3>
            <div className="mt-4 space-y-2">
              <div>
                <span className="text-muted-foreground">Alias: </span>
                <span>{stats.alias}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Pubkey: </span>
                <span className="font-mono text-sm">{stats.pubkey}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Version: </span>
                <span>{stats.version}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-medium">Channel Summary</h3>
            <div className="mt-4 space-y-2">
              <div>
                <span className="text-muted-foreground">Active Channels: </span>
                <span>{stats.numChannels}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Total Capacity: </span>
                <span>{formatSats(stats.totalCapacity)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Pending: </span>
                <span>{stats.pendingChannels}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-medium">Quick Actions</h3>
            <div className="mt-4 space-y-2">
              <button className="w-full rounded bg-primary px-4 py-2 text-primary-foreground">
                Open Channel
              </button>
              <button className="w-full rounded bg-secondary px-4 py-2 text-secondary-foreground">
                Rebalance Channels
              </button>
            </div>
          </Card>
        </div>
      </div>
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to load node stats';
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Node Health</h1>
        <p className="rounded border border-red-300 bg-red-50 p-4 text-sm text-red-800">
          {message}
        </p>
      </div>
    );
  }
}
