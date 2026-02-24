import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface WeatherErrorAnimateProps {
  error: string | null;
}

export const WeatherErrorAnimate = ({ error }: WeatherErrorAnimateProps) => {
  return (
    <AnimatePresence>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '-50%', scale: 0.9 }}
          animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
          exit={{ opacity: 0, y: 20, x: '-50%', scale: 0.9 }}
          className="fixed top-10 left-1/2 z-50"
        >
          <div className="flex items-center gap-3 rounded-2xl border border-red-500/50 bg-red-500/20 px-6 py-4 shadow-2xl shadow-red-500/20 backdrop-blur-xl">
            <AlertCircle className="text-red-400" size={20} />
            <span className="font-medium text-red-100">{error}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
