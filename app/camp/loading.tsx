const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-black">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-150"></div>
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-300"></div>
      </div>
    </div>
  );
};

export default Loading;
