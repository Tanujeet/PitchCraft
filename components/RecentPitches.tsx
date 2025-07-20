"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { axiosInstance } from "@/lib/axios";

interface Pitch {
  id: string;
  title: string;
  createdAt: string;
}

const RecentPitches = () => {
  const [pitches, setPitches] = useState<Pitch[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedPitchId, setSelectedPitchId] = useState<string | null>(null);
  const [slides, setSlides] = useState<any[]>([]);
  const [loadingSlides, setLoadingSlides] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchPitches = async () => {
      try {
        const res = await axiosInstance.get("/recent-pitches");
        setPitches(res.data);
      } catch (e) {
        console.error("Failed to fetch recent pitches", e);
      } finally {
        setLoading(false);
      }
    };
    fetchPitches();
  }, []);

  const handleViewClick = async (id: string) => {
    setSelectedPitchId(id);
    setOpen(true);
    setLoadingSlides(true);
    try {
      const res = await axiosInstance.get(`/slides?projectId=${id}`);
      setSlides(res.data);
    } catch (e) {
      console.error("Failed to fetch slides", e);
    } finally {
      setLoadingSlides(false);
    }
  };

  const handleEditClick = async (id: string) => {
    setSelectedPitchId(id);
    setIsEditing(true);
    setLoadingSlides(true);
    try {
      const res = await axiosInstance.get(`/slides?projectId=${id}`);
      setSlides(res.data);
    } catch (e) {
      console.error("Failed to fetch slides for edit", e);
    } finally {
      setLoadingSlides(false);
    }
  };

const handleDeleteProject = async (id: string) => {
  try {
    await axiosInstance.delete(`/projects/${id}`);
    setPitches((prev) => prev?.filter((p) => p.id !== id) || null);

    // ✅ Close dialog properly
    setOpen(false);
    setIsEditing(false); // <-- this is missing!
    setSlides([]);
    setSelectedPitchId(null);
  } catch (error) {
    console.error("Failed to delete project", error);
  }
};


  const handleRegenerateSlides = async (id: string) => {
    setSelectedPitchId(id);
    setIsEditing(true);
    setLoadingSlides(true);
    try {
      const res = await axiosInstance.post("/slides/regenrate", {
        projectId: id,
        idea: "Optional updated idea here",
      });
      setSlides(res.data.slides);
    } catch (error) {
      console.error("Slide regeneration failed", error);
    } finally {
      setLoadingSlides(false);
    }
  };

  const handleExportToPDF = async () => {
    // implement export logic
  };

  return (
    <Card className="mt-2">
      <CardHeader>
        <CardTitle>🕓 Recently Created Pitches</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pitch Title</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-8 w-20 inline-block mr-2" />
                    <Skeleton className="h-8 w-20 inline-block" />
                  </TableCell>
                </TableRow>
              ))
            ) : pitches && pitches.length > 0 ? (
              pitches.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditClick(item.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleViewClick(item.id)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center text-muted-foreground py-6"
                >
                  No recent pitches found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      <Dialog
        open={open || isEditing}
        onOpenChange={(v) => {
          if (!loadingSlides) {
            setOpen(false);
            setIsEditing(false);
            setSlides([]);
          }
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Pitch" : "Slides"} -{" "}
              {pitches?.find((p) => p.id === selectedPitchId)?.title}
            </DialogTitle>
          </DialogHeader>

          {loadingSlides ? (
            <div className="p-4 text-center">⏳ Loading slides...</div>
          ) : (
            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              {slides.map((slide, idx) => (
                <div
                  key={slide.id ?? `slide-${idx}`}
                  className="p-4 border rounded-md"
                >
                  <h4 className="font-semibold mb-2">Slide {idx + 1}</h4>
                  <p className="text-sm whitespace-pre-wrap">{slide.content}</p>
                </div>
              ))}
            </div>
          )}

          {!loadingSlides && isEditing && (
            <div className="mt-6 flex justify-between flex-wrap gap-2">
              <Button
                variant="destructive"
                onClick={() => handleDeleteProject(selectedPitchId!)}
              >
                Delete
              </Button>
              <div className="ml-auto flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleRegenerateSlides(selectedPitchId!)}
                >
                  Regenerate
                </Button>
                <Button variant="default" onClick={handleExportToPDF}>
                  Export to PDF
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default RecentPitches;
