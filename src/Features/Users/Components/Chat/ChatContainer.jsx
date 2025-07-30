import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot } from 'react-icons/fa';
import ChatMessage from './ChatMessage';

export default function ChatContainer({ chatLog, chatMode, isLoading, bottomRef }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <AnimatePresence initial={false}>
        {chatLog.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center h-full text-center text-gray-500"
          >
            <div className="bg-white p-6 rounded-xl shadow-sm max-w-md">
              <FaRobot className="text-4xl text-indigo-500 mx-auto mb-3" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Welcome to AI Chat</h3>
              <p className="text-gray-500 mb-4">
                {chatMode === 'emotional' 
                  ? "I'm here to help you explore and understand your emotions."
                  : "Let's work through cognitive behavioral techniques together."}
              </p>
              <div className="text-sm text-indigo-500 font-medium">
                Current mode: {chatMode === 'emotional' ? "Emotional Support" : "CBT Techniques"}
              </div>
            </div>
          </motion.div>
        )}

        {chatLog.map((msg, idx) => (
          <ChatMessage 
            key={idx}
            message={msg}
            isLast={idx === chatLog.length - 1}
            isLoading={isLoading}
            chatMode={chatMode}
          />
        ))}
      </AnimatePresence>
      <div ref={bottomRef} />
    </div>
  );
}