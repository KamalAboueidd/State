import { useSnapshot } from 'valtio';
import { appState, appActions } from './vakitoWithActions';

export default function ThemeToggle() {
   
    const snap = useSnapshot(appState);

    return (
        <div style={{ padding: '10px', background: snap.theme === 'dark' ? '#333' : '#f9f9f9', color: snap.theme === 'dark' ? '#fff' : '#000' }}>

            <button onClick={appActions.toggleTheme} style={{ marginLeft: '10px' }}>
                     toggleTheme
            </button>
        </div>
    );
}