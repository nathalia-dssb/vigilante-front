"use client";

import Alert  from "@/components/Alert";
import {Modal}  from "@/components/ui/modal"
import { AlertData } from "@/types/types";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  alertData: AlertData;
}

export function AlertModal({ isOpen, onClose, alertData }: AlertModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 max-w-2xl w-full">
        <Alert data={alertData} expanded={true} />
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-vtwhite text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  );
}