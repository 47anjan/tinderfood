"use client";

import { BASE_URL } from "@/lib/constants";
import { Check, Loader2, X } from "lucide-react";
import { useState } from "react";

interface RequestActionButtonsProps {
  requestId: string;
}

const RequestActionButtons = ({ requestId }: RequestActionButtonsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);

  const handleAccept = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${BASE_URL}/api/request/review/accepted/${requestId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const result = await response.json();

      console.error(result);

      setIsAccepted(true);
    } catch (error) {
      console.error("Error sending connection request:", error);
      alert("Failed to send connection request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCanceled = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${BASE_URL}/api/request/review/removed/${requestId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const result = await response.json();

      console.error(result);

      setIsDeclined(true);
    } catch (error) {
      console.error("Error sending connection request:", error);
      alert("Failed to send connection request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {!isAccepted && (
        <div>
          {isDeclined ? (
            <button
              disabled
              className="flex  items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-lg border border-orange-200 cursor-not-allowed"
            >
              <Check size={16} />
              <span className="font-medium hidden sm:block">Declined</span>
            </button>
          ) : (
            <button
              onClick={handleCanceled}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <X
                  size={16}
                  className="transition-transform group-hover:scale-110"
                />
              )}
              <span className="font-medium hidden sm:block">
                {isLoading ? "Declining..." : "Decline"}
              </span>
            </button>
          )}
        </div>
      )}

      {!isDeclined && (
        <div>
          {isAccepted ? (
            <button
              disabled
              className="flex  items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-lg border border-orange-200 cursor-not-allowed"
            >
              <Check size={16} />
              <span className="font-medium hidden sm:block">Accepted</span>
            </button>
          ) : (
            <button
              onClick={handleAccept}
              disabled={isLoading}
              className="group cursor-pointer flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-lg hover:from-orange-600 hover:to-rose-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Check
                  size={16}
                  className="transition-transform group-hover:scale-110"
                />
              )}
              <span className="font-medium hidden sm:block">
                {isLoading ? "Accepting..." : "Accept"}
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
export default RequestActionButtons;
