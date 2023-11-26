
//@ts-nocheck
import React, { useState } from 'react';

const ChatMenu = ({ chat }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const copyMessage = (message) => {
    navigator.clipboard.writeText(message);
    alert('Message copied to clipboard');
  };

  const downloadAudio = (audioUrl) => {
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = 'audio.mp3';
    link.target = '_blank'; 
    link.click();
  };

  const replyToMessage = (message) => {
    // Implement reply functionality here
  };

  return (
    <div className="absolute top-0 right-20 mt-2 mr-2 bg-[#F6F6F7] chatmenu inline-block text-left">
      <div>
        <button type="button" className="chatmenu absolute top-0 right-0 mt-2 mr-2 bg-[#F6F6F7] chatmenu" onClick={toggleOpen}>
          {/* Button content here */}
          
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
</svg>

        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-8 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" style={{ marginRight: '-85px' }}>
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button
              onClick={() => copyMessage(chat.text)}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Copy Message
            </button>
            {chat.voiceMessage && (
  <button
    onClick={() => downloadAudio(chat.voiceMessage)}
    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
    role="menuitem"
  >
    Download Voice Message
  </button>
)}
{chat.answeraudio && (
  <button
    onClick={() => downloadAudio(chat.answeraudio)}
    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
    role="menuitem"
  >
    Download Answer Audio
  </button>
)}
            <button
              onClick={() => replyToMessage(chat.text)}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Reply to Message
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


export default ChatMenu;
