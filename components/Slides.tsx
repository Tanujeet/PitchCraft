type SlidesProps = {
  idea: string;
};

const Slides = ({ idea }: SlidesProps) => {
  return (
    <div className="space-y-4 text-center">
      <div className="p-4 bg-gray-100 rounded-lg">
        <h2 className="font-bold text-xl text-center">Slide 1: Your Idea</h2>
        <p>{idea || "No idea provided"}</p>
      </div>
    </div>
  );
};

export default Slides;
