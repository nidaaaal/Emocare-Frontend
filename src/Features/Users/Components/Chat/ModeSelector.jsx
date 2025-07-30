import { FaRegLightbulb, FaHeart } from 'react-icons/fa';
import clsx from 'clsx';

export default function ModeSelector({ currentMode, onChange }) {
  return (
    <div className="flex bg-white/20 rounded-full p-1">
      <button
        onClick={() => onChange('emotional')}
        className={clsx(
          'px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 transition-all',
          currentMode === 'emotional' ? 'bg-white text-indigo-600' : 'text-white hover:bg-white/10'
        )}
      >
        <FaHeart className="text-xs" />
        Emotional
      </button>
      <button
        onClick={() => onChange('cbt')}
        className={clsx(
          'px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 transition-all',
          currentMode === 'cbt' ? 'bg-white text-indigo-600' : 'text-white hover:bg-white/10'
        )}
      >
        <FaRegLightbulb className="text-xs" />
        CBT
      </button>
    </div>
  );
}