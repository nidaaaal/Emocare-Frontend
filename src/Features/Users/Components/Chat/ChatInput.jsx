import { useState, useRef, useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';
import { FaHeart, FaRegLightbulb } from 'react-icons/fa';
import clsx from 'clsx';

export default function ChatInput({ onSend, isLoading, chatMode }) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '44px';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(scrollHeight, 120)}px`;
    }
  }, [message]);

  return (
    <div className="p-4 border-t border-gray-200 bg-white">
      <div className="mb-2 flex justify-center">
        <div className="text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-medium flex items-center gap-1">
          {chatMode === 'emotional' 
            ? <><FaHeart className="text-pink-500" /> Emotional Mode</>
            : <><FaRegLightbulb className="text-amber-500" /> CBT Mode</>}
        </div>
      </div>
      <div className="flex gap-2 items-end">
        <div className="flex-grow relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full border border-gray-300 rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            placeholder={
              chatMode === 'emotional' 
                ? "How are you feeling today?" 
                : "What thought would you like to examine?"
            }
            rows={1}
            style={{ minHeight: '44px', maxHeight: '120px' }}
          />
          <button
            onClick={handleSubmit}
            disabled={isLoading || !message.trim()}
            className={clsx(
              'absolute right-2 bottom-2 p-2 rounded-full transition-all',
              isLoading || !message.trim()
                ? 'text-gray-400'
                : chatMode === 'emotional'
                  ? 'bg-pink-500 text-white hover:bg-pink-600'
                  : 'bg-amber-500 text-white hover:bg-amber-600'
            )}
          >
            {isLoading ? (
              <FaSpinner className="animate-spin" />
            ) : (
              <IoSend />
            )}
          </button>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2 text-center">
        Press Enter to send, Shift+Enter for new line
      </p>
    </div>
  );
}