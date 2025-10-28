export const Spinner = () => (
  <div className="flex items-center justify-center space-x-2">
    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" />
    <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce [animation-delay:0.2s]" />
    <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce [animation-delay:0.4s]" />
  </div>
);
