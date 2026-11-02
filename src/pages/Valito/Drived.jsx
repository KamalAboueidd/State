import { useSnapshot } from 'valtio';
import { state } from './DrivedState';

export default function TodoStats() {
    const snap = useSnapshot(state);

    return (
        <div style={{ padding: '15px' }}>
          
            <p>completed tasks {snap.completedCount}</p>
            <p>Remaining tasks {snap.remainingCount}</p>
        </div>
    );
}