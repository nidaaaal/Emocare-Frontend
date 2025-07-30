import { FaRobot } from 'react-icons/fa';
import ModeSelector from './ModeSelector';

export default function ChatHeader({ chatMode, onModeChange }) {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="bg-white text-indigo-600 rounded-full p-1">
            <FaRobot className="inline" />
          </span>
          AI Reflection Chat
        </h2>
        <ModeSelector currentMode={chatMode} onChange={onModeChange} />
      </div>
    </div>
  );
}