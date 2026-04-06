"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Eye,
  Edit2,
  Trash2,
  RefreshCw,
  FileDown,
  X,
  Loader2,
  FileText,
} from "lucide-react";
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
      closeModal();
    } catch (error) {
      console.error("Failed to delete project", error);
    }
  };

  const handleRegenerateSlides = async (id: string) => {
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
    if (!selectedPitchId) return;
    try {
      const res = await axiosInstance.get(
        `/slides/export?projectId=${selectedPitchId}`,
        { responseType: "blob" },
      );
      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "pitchcraft_slides.pdf";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("❌ PDF generation failed:", error);
    }
  };

  const closeModal = () => {
    if (loadingSlides) return;
    setOpen(false);
    setIsEditing(false);
    setSlides([]);
    setSelectedPitchId(null);
  };

  return (
    <div className="w-full">
      <div className="p-4 sm:p-6 flex flex-col gap-4">
        <div className="flex items-center gap-2 text-white mb-2">
          <Clock className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-semibold">Recent Pitches</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-400 text-sm">
                <th className="pb-3 font-medium pl-4">Pitch Title</th>
                <th className="pb-3 font-medium">Created At</th>
                <th className="pb-3 font-medium text-right pr-4">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i} className="border-b border-neutral-800/50">
                    <td className="py-4 pl-4">
                      <div className="h-4 w-32 bg-neutral-800 rounded animate-pulse" />
                    </td>
                    <td className="py-4">
                      <div className="h-4 w-24 bg-neutral-800 rounded animate-pulse" />
                    </td>
                    <td className="py-4 pr-4 flex justify-end gap-2">
                      <div className="h-8 w-8 bg-neutral-800 rounded animate-pulse" />
                      <div className="h-8 w-8 bg-neutral-800 rounded animate-pulse" />
                    </td>
                  </tr>
                ))
              ) : pitches && pitches.length > 0 ? (
                pitches.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-neutral-800/50 hover:bg-neutral-800/30 transition-colors group"
                  >
                    <td className="py-4 pl-4 font-medium text-neutral-200 group-hover:text-white transition-colors flex items-center gap-3">
                      <FileText className="w-4 h-4 text-neutral-500" />
                      {item.title}
                    </td>
                    <td className="py-4 text-neutral-500">
                      {new Date(item.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-4 pr-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditClick(item.id)}
                          className="p-2 text-neutral-400 hover:text-purple-400 hover:bg-purple-400/10 rounded-lg transition-colors"
                          title="Edit Pitch"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleViewClick(item.id)}
                          className="p-2 text-neutral-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                          title="View Pitch"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="py-12 text-center text-neutral-500"
                  >
                    No recent pitches found. Start creating!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View/Edit Modal */}
      <AnimatePresence>
        {(open || isEditing) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
            >
              <div className="flex items-center justify-between p-6 border-b border-neutral-800">
                <h2 className="text-lg font-semibold text-white">
                  {isEditing ? "Edit Pitch" : "View Pitch"}
                  <span className="text-neutral-500 font-normal ml-2">
                    — {pitches?.find((p) => p.id === selectedPitchId)?.title}
                  </span>
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 bg-neutral-950/50">
                {loadingSlides ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
                    <p className="text-neutral-400 animate-pulse">
                      Loading slides...
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {slides.map((slide, idx) => (
                      <div
                        key={slide.id ?? `slide-${idx}`}
                        className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-sm"
                      >
                        <div className="flex items-center gap-3 mb-4 border-b border-neutral-800/50 pb-3">
                          <span className="bg-purple-500/10 text-purple-400 text-xs font-bold px-2 py-1 rounded">
                            {idx + 1}
                          </span>
                          <h4 className="font-semibold text-neutral-200">
                            Slide
                          </h4>
                        </div>
                        <p className="text-sm text-neutral-300 whitespace-pre-wrap leading-relaxed">
                          {slide.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {!loadingSlides && isEditing && (
                <div className="p-6 border-t border-neutral-800 bg-neutral-900 flex flex-wrap items-center justify-between gap-4">
                  <button
                    onClick={() => handleDeleteProject(selectedPitchId!)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" /> Delete Pitch
                  </button>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleRegenerateSlides(selectedPitchId!)}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-300 border border-neutral-700 hover:bg-neutral-800 rounded-lg transition-colors"
                    >
                      <RefreshCw className="w-4 h-4" /> Regenerate
                    </button>
                    <button
                      onClick={handleExportToPDF}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-950 bg-white hover:bg-neutral-200 rounded-lg transition-colors shadow-lg shadow-white/5"
                    >
                      <FileDown className="w-4 h-4" /> Export PDF
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RecentPitches;
