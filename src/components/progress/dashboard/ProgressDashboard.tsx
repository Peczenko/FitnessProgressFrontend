import { KeyMetrics } from './KeyMetrics';
import { QuickStats } from './QuickStats';

export function ProgressDashboard() {
    return (
        <div className="space-y-6">
            <KeyMetrics />
            <QuickStats />
        </div>
    );
}