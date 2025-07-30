import { motion } from 'framer-motion';
import ChatHeader from './ChatHeader';
import ChatContainer from './ChatContainer';
import ChatInput from './ChatInput';

export default function Chat({ chatLog, isLoading, chatMode, onSend, onModeChange, bottomRef }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <ChatHeader chatMode={chatMode} onModeChange={onModeChange} />
      <ChatContainer 
        chatLog={chatLog} 
        chatMode={chatMode} 
        isLoading={isLoading} 
        bottomRef={bottomRef} 
      />
      <ChatInput 
        onSend={onSend} 
        isLoading={isLoading} 
        chatMode={chatMode} 
      />
    </motion.div>
  );
}