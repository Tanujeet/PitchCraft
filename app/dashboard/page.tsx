"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/axios";
import RecentPitches from "@/components/RecentPitches";
import QuickAction from "@/components/QuickAction";
import styles from "./page.module.css";

interface Summary {
  totalPitch: number;
  totalSlides: number;
  averageSlidesPerPitch: number;
}

const STAT_ICONS = ["🎯", "📄", "📊"] as const;
const STAT_ICON_CLASSES = [
  styles.iconPurple,
  styles.iconTeal,
  styles.iconAmber,
] as const;
const STAT_ACCENT_CLASSES = [
  styles.accentPurple,
  styles.accentTeal,
  styles.accentAmber,
] as const;

const Page = () => {
  const { user } = useUser();
  const router = useRouter();
  const username = user?.firstName || "there";

  const [summary, setSummary] = useState<Summary | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axiosInstance.get("/summary");
        setSummary(res.data);
      } catch (e) {
        console.error("Failed to fetch summary", e);
      }
    };
    fetchSummary();
  }, []);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    year: "numeric",
  });

  const stats = summary
    ? [
        {
          label: "Total pitches",
          value: summary.totalPitch,
          sub: "All time",
        },
        {
          label: "Total slides",
          value: summary.totalSlides,
          sub: "Across all pitches",
        },
        {
          label: "Avg slides / pitch",
          value: summary.averageSlidesPerPitch.toFixed(1),
          sub: "Industry avg: 8.2",
        },
      ]
    : null;

  return (
    <main className={styles.root}>
      {/* Background orbs */}
      <div className={`${styles.orb} ${styles.orb1}`} />
      <div className={`${styles.orb} ${styles.orb2}`} />

      {/* Header */}
      <div className={styles.header}>
        <div>
          <p className={styles.greetingSub}>{today}</p>
          <h1 className={styles.greeting}>
            Welcome back, <em className={styles.greetingItalic}>{username}</em>
          </h1>
        </div>
        <button
          className={styles.newBtn}
          onClick={() => router.push("/create")}
        >
          <svg
            className={styles.plusIcon}
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          >
            <line x1="8" y1="2" x2="8" y2="14" />
            <line x1="2" y1="8" x2="14" y2="8" />
          </svg>
          New pitch
        </button>
      </div>

      {/* Stat cards */}
      <div className={styles.statGrid}>
        {stats === null
          ? [0, 1, 2].map((i) => (
              <div key={i} className={styles.statCard}>
                <div className={`${styles.statIcon} ${styles.iconPurple}`} />
                <div
                  className={styles.skeleton}
                  style={{ width: "60%", height: 13, marginBottom: 12 }}
                />
                <div
                  className={styles.skeleton}
                  style={{ width: "40%", height: 32 }}
                />
              </div>
            ))
          : stats.map((stat, i) => (
              <div key={i} className={styles.statCard}>
                <div className={`${styles.statIcon} ${STAT_ICON_CLASSES[i]}`}>
                  {STAT_ICONS[i]}
                </div>
                <p className={styles.statLabel}>{stat.label}</p>
                <p className={styles.statValue}>{stat.value}</p>
                <p className={styles.statSub}>{stat.sub}</p>
                <div
                  className={`${styles.statAccent} ${STAT_ACCENT_CLASSES[i]}`}
                />
              </div>
            ))}
      </div>

      {/* Bottom two-column layout */}
      <div className={styles.twoCol}>
        {/* Recent Activity */}
        <section className={styles.section}>
          <p className={styles.sectionLabel}>Recent activity</p>
          <RecentPitches />
        </section>

        {/* Quick Actions */}
        <section className={styles.section}>
          <p className={styles.sectionLabel}>Quick actions</p>
          <QuickAction />
        </section>
      </div>
    </main>
  );
};

export default Page;
