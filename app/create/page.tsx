import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
const page = () => {
  return (
    <main>
      <section>
        <div className="flex justify-center items-center mt-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold">
              Describe Your idea.Let AI Craft your pitch
            </h1>
            <p className="text-xl mt-4 font-medium">
              Powered by AI,Built for visionaries
            </p>
            <Textarea
              placeholder="An app that connects local artists with businesses for mural projects..."
              className="mt-10 h-40 text-base"
            />
            <Button className="mt-10">Generate Slides</Button>
            <p className="font-light mt-4">
              Tip:Write your idea like your talking to an investor or user
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
