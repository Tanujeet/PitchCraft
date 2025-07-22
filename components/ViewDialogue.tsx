// ViewSlidesDialog.tsx
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Slides from "./Slides";

interface Slide {
  id: string;
  title: string;
  content: string;
}

export default function ViewSlidesDialog({ projectId }: { projectId: string }) {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSlides = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/slides/view?projectId=${projectId}`);
      const data = await res.json();
      setSlides(data);
    } catch (err) {
      console.error("Failed to load slides", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog onOpenChange={(open) => open && fetchSlides()}>
      <DialogTrigger asChild>
        <button className="px-4 py-2 bg-gray-800 text-white rounded">
          View
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Slides Preview</DialogTitle>
        </DialogHeader>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : slides.length > 0 ? (
          <Slides slides={slides} />
        ) : (
          <p className="text-center">No slides found.</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
