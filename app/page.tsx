'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  PenSquare,
  Wallet,
  Zap,
  Users,
  Shield,
  TrendingUp,
  Layers,
  Share2,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { Suspense, useEffect, useState } from 'react';

import { useWeb3 } from '@/components/providers/web3-provider';
import { TrendingStories } from '@/components/trending-stories';
import { Button } from '@/components/ui/button';

// Lazy-load Spline ONLY after the page has rendered
const Spline = dynamic(
  () => import('@splinetool/react-spline').then((mod) => mod.default || mod),
  { ssr: false, loading: () => null }
);

export default function Home() {
  const { account, connectWallet } = useWeb3();
  const [showSpline, setShowSpline] = useState(false);
  const [splineReady, setSplineReady] = useState(false);

  // Delay Spline load until after page content is painted
  useEffect(() => {
    const timer = setTimeout(() => setShowSpline(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const howItWorks = [
    {
      step: '01',
      title: 'Create',
      desc: 'Use our AI-powered tools to craft unique stories in any genre with 70+ customization options.',
      icon: <PenSquare className="w-8 h-8" />,
      color: 'var(--comic-yellow)',
    },
    {
      step: '02',
      title: 'Mint',
      desc: 'Turn your story into a unique NFT on the Monad blockchain. Own your creative work forever.',
      icon: <Layers className="w-8 h-8" />,
      color: 'var(--comic-cyan)',
    },
    {
      step: '03',
      title: 'Share',
      desc: 'Share with the community, earn royalties, and connect with readers worldwide.',
      icon: <Share2 className="w-8 h-8" />,
      color: 'var(--comic-green)',
    },
  ];

  const features = [
    {
      title: 'Lightning Fast AI',
      desc: 'Powered by Groq for instant story generation. Create entire narratives in seconds.',
      icon: <Zap className="w-8 h-8" />,
      accent: 'var(--comic-yellow)',
    },
    {
      title: 'True Ownership',
      desc: 'Mint stories as NFTs on the Monad blockchain. Trade, collect, and earn royalties.',
      icon: <Shield className="w-8 h-8" />,
      accent: 'var(--comic-cyan)',
    },
    {
      title: 'Vibrant Community',
      desc: 'Join thousands of creators. Read, share, and build connections worldwide.',
      icon: <Users className="w-8 h-8" />,
      accent: 'var(--comic-green)',
    },
  ];

  const genres = [
    { name: 'Sci-Fi', icon: <Zap className="w-7 h-7" />, color: 'var(--comic-cyan)' },
    { name: 'Fantasy', icon: <Layers className="w-7 h-7" />, color: 'var(--comic-purple)' },
    { name: 'Mystery', icon: <Shield className="w-7 h-7" />, color: 'var(--comic-blue)' },
    { name: 'Romance', icon: <Users className="w-7 h-7" />, color: 'var(--comic-pink)' },
    { name: 'Horror', icon: <Zap className="w-7 h-7" />, color: 'var(--comic-red)' },
    { name: 'Adventure', icon: <Share2 className="w-7 h-7" />, color: 'var(--comic-orange)' },
  ];

  return (
    <main className="flex min-h-screen flex-col relative overflow-hidden">
      {/* ═══════════════════════════════════════
          SPLINE 3D — Fixed Full-Page Background
          ═══════════════════════════════════════ */}
      {showSpline && (
        <div
          className="fixed inset-0 z-0 transition-opacity duration-1000"
          style={{ opacity: splineReady ? 1 : 0 }}
        >
          <Suspense fallback={null}>
            <Spline
              scene="/storybook.spline"
              onLoad={() => setSplineReady(true)}
            />
          </Suspense>
        </div>
      )}

      {/* Fallback gradient while Spline loads */}
      {!splineReady && <div className="fixed inset-0 z-0 hero-gradient" />}

      {/* ═══════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════ */}
      <section className="relative min-h-[95vh] flex flex-col items-center justify-center overflow-hidden z-[1]">
        {/* Hero text content */}
        <motion.div
          className="relative z-10 container mx-auto px-6 text-center pointer-events-none"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* Main heading */}
          <motion.h1
            variants={fadeUp}
            className="comic-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] text-foreground leading-[0.9] mb-8"
            style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.3)' }}
          >
            <span className="block">Create</span>
            <span className="block scribble-underline" style={{ color: 'var(--comic-red)' }}>
              Mint
            </span>
            <span className="block">&amp; Share</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            className="text-base md:text-lg text-foreground/80 font-bold max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.2)' }}
          >
            Unleash your imagination with AI. Turn your stories into
            valuable NFTs on the Monad blockchain.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-4 justify-center pointer-events-auto"
          >
            <Link href="/create/ai-story">
              <Button
                size="lg"
                className="bg-[var(--comic-red)] hover:bg-[var(--comic-red)]/90 text-white border-4 border-foreground shadow-[6px_6px_0px_0px_var(--shadow-color)] hover:shadow-[3px_3px_0px_0px_var(--shadow-color)] hover:-translate-y-0.5 transition-all duration-200 text-base font-black uppercase px-8 py-5 h-auto rounded-none"
              >
                <PenSquare className="mr-2 h-5 w-5" />
                Start Creating
              </Button>
            </Link>

            {!account && (
              <Button
                onClick={connectWallet}
                size="lg"
                className="bg-card/90 backdrop-blur-sm text-foreground border-4 border-foreground shadow-[6px_6px_0px_0px_var(--shadow-color)] hover:shadow-[3px_3px_0px_0px_var(--shadow-color)] hover:-translate-y-0.5 transition-all duration-200 text-base font-black uppercase px-8 py-5 h-auto rounded-none"
              >
                <Wallet className="mr-2 h-5 w-5" />
                Connect Wallet
              </Button>
            )}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <div className="w-5 h-8 border-2 border-foreground/30 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-2.5 bg-foreground/40 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════
          HOW IT WORKS
          ═══════════════════════════════════════ */}
      <section className="relative z-[1] py-24 bg-background/90 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.span variants={fadeUp} className="inline-block text-xs font-black uppercase tracking-[0.3em] text-[var(--comic-red)] mb-4">
              The Process
            </motion.span>
            <motion.h2 variants={fadeUp} className="comic-display text-4xl md:text-6xl text-foreground mb-4">
              How It Works
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base text-muted-foreground font-bold max-w-lg mx-auto">
              From idea to NFT in three simple steps
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 max-w-5xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {howItWorks.map((item) => (
              <motion.div
                key={item.step}
                variants={scaleIn}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="relative bg-card border-4 border-foreground p-8 text-center group"
                style={{ boxShadow: '8px 8px 0px 0px var(--shadow-color)' }}
              >
                <div
                  className="absolute -top-5 -left-3 comic-display text-5xl font-black opacity-80 group-hover:opacity-100 transition-opacity"
                  style={{ color: item.color, WebkitTextStroke: '2px var(--foreground)' }}
                >
                  {item.step}
                </div>
                <div
                  className="w-16 h-16 mx-auto mb-5 flex items-center justify-center border-4 border-foreground group-hover:scale-110 transition-transform duration-200"
                  style={{ backgroundColor: item.color, boxShadow: '4px 4px 0px 0px var(--shadow-color)' }}
                >
                  <div className="text-white">{item.icon}</div>
                </div>
                <h3 className="comic-display text-2xl mb-3 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground font-bold text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Connecting line (desktop) */}
          <div className="hidden md:flex justify-center mt-8 gap-0 max-w-5xl mx-auto">
            <motion.div
              className="flex-1 h-1 mx-8 rounded-full"
              style={{ background: 'linear-gradient(90deg, var(--comic-yellow), var(--comic-cyan))' }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
            <motion.div
              className="flex-1 h-1 mx-8 rounded-full"
              style={{ background: 'linear-gradient(90deg, var(--comic-cyan), var(--comic-green))' }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          WHY GROQTALES
          ═══════════════════════════════════════ */}
      <section className="relative z-[1] py-24 bg-background/90 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.span variants={fadeUp} className="inline-block text-xs font-black uppercase tracking-[0.3em] text-[var(--comic-cyan)] mb-4">
              Why Choose Us
            </motion.span>
            <motion.h2 variants={fadeUp} className="comic-display text-4xl md:text-6xl text-foreground mb-4">
              Why GroqTales?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base text-muted-foreground font-bold max-w-lg mx-auto">
              The most powerful AI storytelling platform on Web3
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={scaleIn}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="bg-card border-4 border-foreground p-8 group"
                style={{ boxShadow: '8px 8px 0px 0px var(--shadow-color)' }}
              >
                <div
                  className="w-14 h-14 flex items-center justify-center border-4 border-foreground mb-5 group-hover:scale-110 transition-transform duration-200"
                  style={{ backgroundColor: feature.accent, boxShadow: '4px 4px 0px 0px var(--shadow-color)' }}
                >
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="comic-display text-2xl mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground font-bold text-sm leading-relaxed border-l-4 pl-4" style={{ borderColor: feature.accent }}>
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TRENDING STORIES
          ═══════════════════════════════════════ */}
      <section className="relative z-[1] py-24 bg-background/90 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="flex flex-col gap-4 items-start mb-12 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <motion.span variants={fadeUp} className="inline-block text-xs font-black uppercase tracking-[0.3em] text-[var(--comic-red)] mb-4">
                Popular
              </motion.span>
              <motion.h2 variants={fadeUp} className="comic-display text-3xl md:text-5xl text-foreground flex items-center gap-3">
                <TrendingUp className="w-8 h-8" style={{ color: 'var(--comic-red)' }} />
                Trending Now
              </motion.h2>
              <motion.p variants={fadeUp} className="text-muted-foreground font-bold mt-2">
                Discover the hottest stories on the platform
              </motion.p>
            </div>
            <motion.div variants={fadeUp}>
              <Link href="/nft-gallery">
                <Button className="bg-foreground text-background border-4 border-foreground hover:bg-foreground/90 font-black uppercase rounded-none shadow-[4px_4px_0px_0px_var(--shadow-color)] hover:-translate-y-0.5 transition-all duration-200">
                  View All <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
          <TrendingStories />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FEATURED GENRES
          ═══════════════════════════════════════ */}
      <section className="relative z-[1] py-24 bg-background/90 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.span variants={fadeUp} className="inline-block text-xs font-black uppercase tracking-[0.3em] text-[var(--comic-purple)] mb-4">
              Browse
            </motion.span>
            <motion.h2 variants={fadeUp} className="comic-display text-4xl md:text-6xl text-foreground mb-4">
              Explore Genres
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base text-muted-foreground font-bold max-w-lg mx-auto">
              Dive into worlds of your choosing
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {genres.map((genre) => (
              <motion.div
                key={genre.name}
                variants={scaleIn}
                whileHover={{ y: -5, scale: 1.04, transition: { duration: 0.2 } }}
              >
                <Link href={`/genres?genre=${genre.name.toLowerCase()}`}>
                  <div
                    className="bg-card border-4 border-foreground p-5 text-center cursor-pointer transition-all"
                    style={{ boxShadow: '6px 6px 0px 0px var(--shadow-color)' }}
                  >
                    <div
                      className="w-14 h-14 mx-auto mb-3 flex items-center justify-center border-3 border-foreground"
                      style={{ backgroundColor: genre.color, color: '#fff', boxShadow: '3px 3px 0px 0px var(--shadow-color)' }}
                    >
                      {genre.icon}
                    </div>
                    <h3 className="font-black text-sm uppercase text-foreground">{genre.name}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FINAL CTA
          ═══════════════════════════════════════ */}
      <section className="relative z-[1] py-28 overflow-hidden bg-background/90 backdrop-blur-sm">
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeUp}
              className="comic-display text-4xl md:text-6xl lg:text-8xl text-foreground mb-6"
              style={{ textShadow: '4px 4px 0px var(--shadow-color)' }}
            >
              Ready to Create?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-foreground/80 font-bold text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Join thousands of creators minting their stories as NFTs on GroqTales.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/create/ai-story">
                <Button className="comic-display bg-[var(--comic-yellow)] text-[#1a1a2e] border-4 border-foreground text-lg md:text-2xl font-black uppercase px-8 md:px-12 py-5 md:py-7 h-auto shadow-[8px_8px_0px_0px_var(--shadow-color)] hover:shadow-[4px_4px_0px_0px_var(--shadow-color)] hover:-translate-y-1 active:shadow-none active:translate-y-0.5 transition-all duration-200 rounded-none tracking-wider">
                  Start Your Story
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}