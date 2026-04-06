"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Slides from "@/components/Slides";
import { Spinner } from "@/components/Spinner";
import { axiosInstance } from "@/lib/axios";
import styles from "./page.module.css";

const EXAMPLES = [
  "A subscription app for indie bookstores",
  "AI tutor for rural students",
  "Zero-waste grocery delivery",
];

const MAX_CHARS = 500;

const Page = () => {
  const [idea, setIdea] = useState("");
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [projectId, setProjectId] = useState("");

  const router = useRouter();

  const generateSlides = async () => {
    if (!idea.trim()) return;
    try {
      setLoading(true);
      setModalOpen(true);
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

  const handleIdea = (val: string) => {
    if (val.length <= MAX_CHARS) setIdea(val);
  };

  return (
    <main className={styles.root}>
      {/* Background orbs */}
      <div className={`${styles.orb} ${styles.orb1}`} />
      <div className={`${styles.orb} ${styles.orb2}`} />

      {/* Main card */}
      <div className={styles.card}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          AI-powered pitch builder
        </div>

        <h1 className={styles.heading}>
          Describe your idea.
          <br />
          <em className={styles.headingItalic}>Let AI craft your pitch.</em>
        </h1>

        <p className={styles.subtitle}>
          Turn a rough idea into a compelling slide deck in seconds.
        </p>

        {/* Textarea */}
        <div className={styles.textareaWrap}>
          <textarea
            className={styles.textarea}
            value={idea}
            onChange={(e) => handleIdea(e.target.value)}
            placeholder="An app that connects local artists with businesses for mural projects..."
          />
          <span className={styles.charCount}>
            {idea.length} / {MAX_CHARS}
          </span>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button
            className={styles.btnPrimary}
            onClick={generateSlides}
            disabled={loading || !idea.trim()}
          >
            {loading ? (
              <>
                <Spinner />
                Generating…
              </>
            ) : (
              "Generate slides"
            )}
          </button>
          <button className={styles.btnSecondary} onClick={() => setIdea("")}>
            Clear
          </button>
        </div>

        {/* Tip */}
        <div className={styles.tip}>
          <span className={styles.tipIcon}>💡</span>
          <p>
            <strong>Tip:</strong> Write your idea like you're pitching to an
            investor — include the problem, your solution, and who it's for.
          </p>
        </div>

        {/* Example chips */}
        <div className={styles.examples}>
          <p className={styles.examplesLabel}>Try an example</p>
          <div className={styles.chips}>
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                className={styles.chip}
                onClick={() => setIdea(ex)}
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className={styles.modalBackdrop}
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
        >
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <span className={styles.modalTitle}>Your slides</span>
              <button
                className={styles.modalClose}
                onClick={() => setModalOpen(false)}
              >
                ✕
              </button>
            </div>

            {loading ? (
              <div className={styles.loadingState}>
                <div className={styles.loadingRing} />
                <p className={styles.loadingText}>Crafting your pitch deck…</p>
              </div>
            ) : (
              <>
                <div className={styles.slidesWrap}>
                  <Slides slides={slides} />
                </div>
                <button
                  className={styles.btnFull}
                  onClick={() => router.push(`/dashboard/${projectId}`)}
                >
                  Continue to editor →
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default Page;
