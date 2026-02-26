"use client"
import React from "react";
import Verification from "@/components/verification/Verification";

interface SetUpProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SetUp = ({ open, setOpen }: SetUpProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-[90%] h-[90%] rounded-2xl shadow-2xl relative overflow-auto bg-background">
        
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-xl"
        >
          ✕
        </button>

        <Verification setOpen={setOpen} />
      </div>
    </div>
  );
};

export default SetUp;