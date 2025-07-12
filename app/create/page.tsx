import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";
const page = () => {
  return (
    <main>
      <section>
        <div className="flex justify-center items-center mt-20">
          <div className="text-center max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
              Describe your idea. Let AI craft your pitch.
            </h1>
            <p className="text-lg sm:text-xl mt-4 font-medium text-gray-600">
              Powered by AI, built for visionaries.
            </p>

            <Textarea
              placeholder="An app that connects local artists with businesses for mural projects..."
              className="mt-10 h-40 text-base resize-none"
            />
            <Button className="mt-10">Generate Slides</Button>

            <p className="font-light mt-4 text-gray-500">
              💡 Tip: Write your idea like you're talking to an investor or
              user.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
