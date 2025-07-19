"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export default function ResultPage() {
  const [showResults, setShowResults] = useState(false);
  // const searchParams = useSearchParams();
  const confettiRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowResults(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let storedScore: number | null = null;
    try {
      const stored = sessionStorage.getItem("mentalWellnessScore");
      if (stored) storedScore = JSON.parse(stored);
    } catch {}
    setScore(storedScore);
  }, []);

  useEffect(() => {
    if (showResults && confettiRef.current) {
      import("canvas-confetti").then((module) => {
        const confetti = module.default;
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#b77b4b", "#e2c9b0", "#f7e7d1", "#a67c52", "#fff"],
        });
      });
    }
  }, [showResults]);

  if (!showResults) return <div className="flex items-center justify-center h-screen bg-white text-black">Loading...</div>;

  function getScoreMessage(score: number | null) {
    if (score === null) return "No score available.";
    if (score < 2) return "Your mental wellness score is low. Consider reaching out for support and practicing self-care.";
    if (score < 3) return "Your mental wellness score is moderate. There is room for improvement—keep taking care of yourself!";
    return "Great job! Your mental wellness score is high. Keep up the good habits!";
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-light-cream relative overflow-hidden">
      {/* Confetti Canvas */}
      <canvas ref={confettiRef} className="pointer-events-none fixed inset-0 w-full h-full z-50" style={{display: showResults ? 'block' : 'none'}} />
      {/* Background image and overlay for theme consistency */}
      <Image
        src="/quiz.jpeg"
        alt="Background"
        fill
        className="object-cover object-center z-0 opacity-60"
        // priority
      />
      <div className="absolute inset-0 z-10 backdrop-blur-md" />
      <div className="relative z-20 text-center flex flex-col items-center justify-center w-full max-w-7xl bg-white/90 rounded-3xl shadow-2xl p-12 backdrop-blur-2xl border border-[#80BADD]/20">
        <h1 className="text-3xl text-black md:text-6xl font-extrabold font-serif mb-2 drop-shadow-lg">
          Your Mental Wellness Score
        </h1>
        {score !== null && (
          <div className="text-5xl font-bold text-[#80BADD] mb-4">{score.toFixed(2)}</div>
        )}
        <div className="text-lg md:text-xl text-[#254C47] mb-4 font-medium">
          {getScoreMessage(score)}
        </div>
        <div className="flex justify-center">
          <Link href="/dashboard" passHref>
            <button
              type="button"
              className="bg-[#80BADD] text-black px-10 py-4 rounded-xl font-semibold text-xl transition-all duration-200 shadow-lg hover:bg-[#6bb0d6] hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#254C47] mt-8"
            >
              Go to Dashboard
            </button>
          </Link>
        </div>
        <style jsx global>{`
          @keyframes gradient-x {
            0%,
            100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 3s ease-in-out infinite;
          }
          @keyframes bounce-slow {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-12px);
            }
          }
          .animate-bounce-slow {
            animation: bounce-slow 2.5s infinite;
          }
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 1.2s cubic-bezier(0.4,0,0.2,1);
          }
          @keyframes border-glow {
            0%,100% { box-shadow: 0 0 0 0 #b77b4b44; }
            50% { box-shadow: 0 0 24px 4px #b77b4b88; }
          }
          .animate-border-glow {
            animation: border-glow 2.5s infinite;
          }
          @keyframes pop {
            0% { transform: scale(0.7); opacity: 0; }
            80% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); }
          }
          .animate-pop {
            animation: pop 0.8s cubic-bezier(0.4,0,0.2,1);
          }
          @keyframes pulse-shimmer {
            0%,100% { box-shadow: 0 0 0 0 #b77b4b44; }
            50% { box-shadow: 0 0 16px 4px #b77b4b88; }
          }
          .animate-pulse-shimmer {
            animation: pulse-shimmer 2s infinite;
          }
          @keyframes fade-in-signup {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in-signup {
            animation: fade-in-signup 0.8s 1.2s forwards;
          }
          .animate-delay-1200 {
            animation-delay: 1.2s;
          }
        `}</style>
      </div>
    </div>
  );
}
