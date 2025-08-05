import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import api from '../../../../Api/baseurl';

const moodEmojis = {
  Unknown: '❓',
  Happy: '😊',
  Sad: '😢',
  Anxious: '😰',
  Frustrated: '😤',
  Angry: '😡',
  Calm: '🙂',
  Grateful: '🤩',
};

export default function ReflectionCalendar() {
  const [reflections, setReflections] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const fetchReflections = async () => {
    try {
      const res = await api.get('/reflection/Weekly',{
        withCredentials:true
      });
      setReflections(res.data.data || []);
    } catch (error) {
      console.error('Error fetching reflections', error);
    }
  };

  useEffect(() => {
    fetchReflections();
  }, []);

  const getEmojiForDate = (date) => {
    const match = reflections.find((r) => {
      const d = new Date(r.date);
      return (
        d.getFullYear() === date.getFullYear() &&
        d.getMonth() === date.getMonth() &&
        d.getDate() === date.getDate()
      );
    });

    return match ? moodEmojis[match.mood] || '📝' : null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-indigo-200 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-4">🗓️ Reflection Calendar</h2>

        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileContent={({ date, view }) => {
            const emoji = getEmojiForDate(date);
            return view === 'month' && emoji ? (
              <div className="text-center text-xl mt-1">{emoji}</div>
            ) : null;
          }}
          tileClassName={({ date, view }) => {
            const hasReflection = reflections.some((r) => {
              const d = new Date(r.date);
              return (
                d.getFullYear() === date.getFullYear() &&
                d.getMonth() === date.getMonth() &&
                d.getDate() === date.getDate()
              );
            });

            return view === 'month' && hasReflection ? 'bg-purple-100 border-l-4 border-purple-500' : null;
          }}
        />

        {selectedDate && (
          <div className="mt-6 p-4 bg-purple-50 rounded-md shadow-inner">
            <h3 className="text-lg font-semibold text-purple-700">
              Reflection for {format(selectedDate, 'PPP')}
            </h3>

            {reflections
              .filter((r) => {
                const d = new Date(r.date);
                return (
                  d.getFullYear() === selectedDate.getFullYear() &&
                  d.getMonth() === selectedDate.getMonth() &&
                  d.getDate() === selectedDate.getDate()
                );
              })
              .map((r, index) => (
                <div key={index} className="mt-2 p-2 rounded bg-white shadow">
                  <div>
                    <strong>Mood:</strong> {moodEmojis[r.mood] || '📝'} {r.mood}
                  </div>
                  <div className="mt-1 text-gray-700">{r.entry || r.reflectionText}</div>
                </div>
              ))}

            {!reflections.some((r) => {
              const d = new Date(r.date);
              return (
                d.getFullYear() === selectedDate.getFullYear() &&
                d.getMonth() === selectedDate.getMonth() &&
                d.getDate() === selectedDate.getDate()
              );
            }) && (
              <p className="text-sm text-gray-500 mt-2">No reflection for this day.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
