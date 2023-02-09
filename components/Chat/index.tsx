import React from "react";

const Chat = ({ chatId }: { chatId: string }) => {
  const [showChat, setShowChat] = React.useState(false);

  if (!showChat) {
    return (
      <div
        className="absolute top-0 right-0 p-2 z-40 rounded bg-opacity-80 bg-blue-900 text-white m-4 cursor-pointer w-16 text-center animate-bounce"
        onClick={() => setShowChat(true)}
      >
        Chat
      </div>
    );
  }

  return (
    <div className="absolute right-0 w-96 z-30 h-screen">
      <div
        className="absolute top-0 left-0 z-40 rounded-full bg-opacity-80 text-white m-4 cursor-pointer text-center "
        onClick={() => setShowChat(false)}
      >
        X
      </div>
      <iframe
        className=" w-full h-full   bg-zinc-800 bg-opacity-80"
        src={`https://stingray-app-u9f8x.ondigitalocean.app/${chatId}`}
        width="100%"
        height="100%"
        frameBorder="0"
      />
    </div>
  );
};


export default Chat