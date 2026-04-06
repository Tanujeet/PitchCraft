"use client";

import Features from "@/components/Features";
import HowItWorksSection from "@/components/HowItWorksSection";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import { Spinner } from "@/components/Spinner";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function HomePage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user) {
      router.push("/dashboard");
    }
  }, [isLoaded, user]);

  if (!isLoaded) {
    return (
      <div className={styles.loadingWrap}>
        <Spinner />
      </div>
    );
  }

  return (
    <main className={styles.root}>
      {/* Background orbs */}
      <div className={`${styles.orb} ${styles.orb1}`} />
      <div className={`${styles.orb} ${styles.orb2}`} />
      <div className={`${styles.orb} ${styles.orb3}`} />

      {/* Navbar */}
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <div className={styles.logoDot} />
          PitchCraft
        </div>
        <div className={styles.navLinks}>
          <a className={styles.navLink} href="#features">
            Features
          </a>
          <a className={styles.navLink} href="#pricing">
            Pricing
          </a>
          <a className={styles.navLink} href="#how-it-works">
            How it works
          </a>
          <Link href="/sign-in">
            <button className={styles.navCta}>Sign in</button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBadge}>
          <div className={styles.heroBadgeDot} />
          Powered by AI · Trusted by founders
        </div>

        <h1 className={styles.heroHeading}>
          Craft the perfect pitch
          <br />
          <em className={styles.heroItalic}>in minutes, not days.</em>
        </h1>

        <p className={styles.heroSub}>
          Describe your startup idea. PitchCraft turns it into a professional
          slide deck — instantly.
        </p>

        <div className={styles.heroActions}>
          <Link href="/sign-in">
            <button className={styles.btnPrimary}>Create your pitch →</button>
          </Link>
          <a href="#how-it-works">
            <button className={styles.btnOutline}>See how it works</button>
          </a>
        </div>

        <p className={styles.heroNote}>
          No credit card required · Free to start
        </p>

        {/* Social proof */}
        <div className={styles.socialProof}>
          <div className={styles.avatars}>
            {["A", "B", "C", "D"].map((l, i) => (
              <div
                key={i}
                className={`${styles.avatar} ${styles[`av${i + 1}`]}`}
              >
                {l}
              </div>
            ))}
          </div>
          <p className={styles.socialText}>
            Loved by <strong>2,400+ founders</strong> worldwide
          </p>
        </div>
      </section>

      {/* App mockup */}
      <div className={styles.mockupWrap}>
        <div className={styles.mockup}>
          <div className={styles.mockupBar}>
            <div className={`${styles.dot} ${styles.dotRed}`} />
            <div className={`${styles.dot} ${styles.dotYellow}`} />
            <div className={`${styles.dot} ${styles.dotGreen}`} />
          </div>
          <div className={styles.mockupTextarea}>
            💡 An app that connects local artists with businesses for mural
            projects across the city…
          </div>
          <div className={styles.mockupSlides}>
            {[
              {
                cls: styles.slide1,
                title: "The Problem",
                body: "Businesses struggle to find local art talent for meaningful brand spaces.",
              },
              {
                cls: styles.slide2,
                title: "Our Solution",
                body: "A curated marketplace matching muralists with commercial clients instantly.",
              },
              {
                cls: styles.slide3,
                title: "Market Size",
                body: "$12B commercial art market with 80% of SMBs underserved today.",
              },
            ].map((s) => (
              <div key={s.title} className={`${styles.slideMini} ${s.cls}`}>
                <div className={styles.slideMiniTitle}>{s.title}</div>
                <div className={styles.slideMiniBody}>{s.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How it works */}
      <section id="how-it-works" className={styles.section}>
        <HowItWorksSection />
      </section>

      {/* Features */}
      <section id="features" className={styles.section}>
        <Features />
      </section>

      {/* Pricing */}
      <section id="pricing" className={styles.section}>
        <Pricing />
      </section>

      {/* Testimonials */}
      <section className={styles.section}>
        <Testimonials />
      </section>

      {/* Footer CTA */}
      <div className={styles.footerCta}>
        <h2 className={styles.footerCtaHeading}>
          Your idea deserves a<br />
          <em className={styles.heroItalic}>great pitch.</em>
        </h2>
        <p className={styles.footerCtaSub}>
          Join thousands of founders who ship faster with PitchCraft.
        </p>
        <Link href="/sign-in">
          <button className={styles.btnPrimary}>
            Create your pitch for free →
          </button>
        </Link>
      </div>

      {/* Footer strip */}
      <footer className={styles.footerStrip}>
        <div className={styles.footerLogo}>PitchCraft</div>
        <p className={styles.footerCopy}>
          © 2026 PitchCraft. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
