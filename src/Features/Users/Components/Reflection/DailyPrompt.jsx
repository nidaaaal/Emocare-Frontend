import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../../../Api/baseurl';

export default function DailyCheckIn({ onSuccess }) {
  const [mood, setMood] = useState('');
  const [entry, setEntry] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const moods = [
    'Happy',
    'Sad',
    'Anxious',
    'Frustrated',
    'Angry',
    'Calm',
    'Grateful'
  ];

  const handleSubmit = async () => {
    if (!mood || !entry.trim()) {
      setError('Please select a mood and write your journal entry.');
      return;
    }

    setLoading(true);
    setError('');
    let payload = {
  "prompt": entry,
  "mood": mood
}

    try {
      const res = await api.post('/reflection/Daily',payload);

      if (res.data.success) {
        toast.success("Reflection submitted!");
        
        onSuccess?.(res.data); // Notify parent to close modal
      } else {
        toast.error("Failed to submit reflection.");
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">🌤️ Daily Check-In</h2>

      <label className="block mb-2 text-sm font-medium text-gray-700">Your Mood</label>
      <select
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        onChange={e => setMood(e.target.value)}
        value={mood}
      >
        <option value="">-- Select Mood --</option>
        {moods.map(m => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>

      <label className="block mb-2 text-sm font-medium text-gray-700">Journal Entry</label>
      <textarea
        className="w-full p-3 h-32 border border-gray-300 rounded resize-none mb-4"
        placeholder="Write your thoughts..."
        value={entry}
        onChange={e => setEntry(e.target.value)}
      />

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`w-full py-2 rounded text-white font-semibold transition-all ${
          loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
        }`}
      >
        {loading ? 'Submitting...' : 'Start Reflection'}
      </button>
    </div>
  );
}
