type Slide = {
  id: string;
  title: string;
  content: any;
};

type SlidesProps = {
  slides: Slide[];
  onEdit?: (slide: Slide) => void;
  onDelete?: (id: string) => void;
};

const Slides = ({ slides, onEdit, onDelete }: SlidesProps) => {
  return (
    <div className="space-y-4 text-center">
      {slides.map((slide, idx) => (
        <div key={slide.id} className="p-4 bg-gray-100 rounded-lg">
          <h2 className="font-bold text-xl">
            Slide {idx + 1}: {slide.title}
          </h2>
          <p>{slide.content}</p>

          {onEdit && onDelete && (
            <div className="flex justify-center gap-2 mt-4">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={() => onEdit(slide)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => onDelete(slide.id)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Slides;
