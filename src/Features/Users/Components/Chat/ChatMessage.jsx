import { motion } from 'framer-motion';
import { FaUser, FaRobot, FaSpinner, FaHeart, FaRegLightbulb } from 'react-icons/fa';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function ChatMessage({ message, isLast, isLoading, chatMode }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      className={twMerge(
        'flex items-start gap-3',
        message.role === "User" ? 'justify-end' : 'justify-start'
      )}
    >
      <div className={twMerge(
        'flex items-start gap-3 max-w-[90%]',
        message.role === "User" ? 'flex-row-reverse' : ''
      )}>
        <div className={clsx(
          'rounded-full p-2 shadow-sm',
          message.role === "User" 
            ? 'bg-blue-100 text-blue-600' 
            : message.mode === 'emotional'
              ? 'bg-pink-100 text-pink-600'
              : 'bg-amber-100 text-amber-600'
        )}>
          {message.role === "User" ? <FaUser /> : <FaRobot />}
        </div>
        <motion.div
          className={clsx(
            'p-3 rounded-xl text-sm shadow-sm relative',
            message.role === "User" 
              ? 'bg-blue-500 text-white rounded-br-none' 
              : message.mode === 'emotional'
                ? 'bg-pink-50 text-gray-800 rounded-bl-none border border-pink-200'
                : 'bg-amber-50 text-gray-800 rounded-bl-none border border-amber-200'
          )}
        >
          {message.role !== "User" && (
            <div className="absolute -top-2 -left-2 bg-white rounded-full p-1 shadow border border-gray-200">
              {message.mode === 'emotional' 
                ? <FaHeart className="text-pink-500 text-xs" /> 
                : <FaRegLightbulb className="text-amber-500 text-xs" />}
            </div>
          )}
          <p className="whitespace-pre-wrap">{message.message}</p>
          {message.role !== 1 && isLast && isLoading && (
            <motion.div 
              className="absolute -bottom-2 right-2 bg-white p-1 rounded-full shadow"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <FaSpinner className={clsx(
                "text-xs",
                chatMode === 'emotional' ? 'text-pink-500' : 'text-amber-500'
              )} />
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}