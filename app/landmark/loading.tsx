const Loading = () => {
  return (
    <div
      className="flex items-center justify-center 
    h-full min-h-[200px] bg-background 
    text-foreground text-lg font-semibold"
    >
      Loading
      <span className="inline-block ml-1">
        <span
          className="inline-block animate-bounce"
          style={{ animationDelay: "0s" }}
        >
          .
        </span>
        <span
          className="inline-block animate-bounce"
          style={{ animationDelay: "0.2s" }}
        >
          .
        </span>
        <span
          className="inline-block animate-bounce"
          style={{ animationDelay: "0.4s" }}
        >
          .
        </span>
      </span>
    </div>
  );
};

export default Loading;
