"use client";
import { createContext, useContext } from "react";

interface PopupContextType {
  handlePopUp: () => void;
}

export const PopupContext = createContext<PopupContextType | null>(null);

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("usePopup must be used inside PopupProvider");
  }
  return context;
};