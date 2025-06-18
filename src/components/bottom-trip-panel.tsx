"use client";

import { Button } from "@/components/ui/button"; // if using shadcn/ui
import { motion } from "framer-motion";

type BottomPanelProps = {
  placeName: string;
  onDirections: () => void;
  onStart: () => void;
  props?: {
    eta: string | undefined,
    distance: string
  };
};

export function BottomPanel({ placeName, onDirections, onStart, props }: BottomPanelProps) {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed bottom-0 left-0 w-full bg-white shadow-lg rounded-t-2xl p-4 z-20"
    >
      <div className="text-center mb-2 text-lg font-semibold text-black">{placeName}</div>
      <div className="flex justify-center gap-4">
        <Button variant="outline" onClick={onDirections}>
          Directions
        </Button>
        <Button onClick={onStart}>Start</Button>
      </div>
      {/* <div>
        <div className="text-center text-sm text-gray-600 mt-1">
          {eta && distance && `${distance} • ${eta}`}
        </div>

      </div> */}
    </motion.div>
  );
}
