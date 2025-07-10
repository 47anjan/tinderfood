import { MessageSquare } from "lucide-react";

const ChatLayoutPage = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center">
      <div className="flex flex-col items-center w-full space-y-6 p-8  ">
        <div className="w-20 h-20 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center">
          <MessageSquare size={28} className="text-gray-400" />
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-xl font-medium text-gray-800">
            Start a Conversation
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Select a contact from the sidebar to begin messaging
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatLayoutPage;
