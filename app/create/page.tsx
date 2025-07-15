"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Slides from "@/components/Slides";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { axiosInstance } from "@/lib/axios";
import { Spinner } from "@/components/Spinner";

const Page = () => {
  const [idea, setIdea] = useState("");
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const router = useRouter();
  const [projectId, setProjectId] = useState("");
  const generateSlides = async () => {
    try {
      setLoading(true);
      setDialogOpen(true); // 👈 open dialog manually
      const res = await axiosInstance.post("/slides/generate", { idea });
      const { projectId, slides } = res.data;

      setSlides(slides);
      setProjectId(projectId);
      setIdea("");
    } catch (error) {
      console.error("Slide generation failed:", error);
    } finally {
      setLoading(false);
    }
  };

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
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="An app that connects local artists with businesses for mural projects..."
              className="mt-10 h-40 text-base resize-none"
            />

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="mt-10"
                  onClick={generateSlides}
                  disabled={loading || !idea.trim()}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <Spinner />
                      Generating...
                    </div>
                  ) : (
                    "Generate Slides"
                  )}
                </Button>
              </DialogTrigger>

              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle className="text-center">
                    Your AI-Generated Slides
                  </DialogTitle>
                </DialogHeader>

                {loading ? (
                  <div className="flex justify-center items-center min-h-[200px]">
                    <Spinner />
                  </div>
                ) : (
                  <>
                    <Slides slides={slides} />

                    <Button
                      onClick={() => router.push(`/projects/${projectId}`)}
                      className="mt-6 w-full"
                    >
                      Continue to Editor
                    </Button>
                  </>
                )}
              </DialogContent>
            </Dialog>

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

export default Page;
