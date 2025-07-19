"use client"

import React from "react"
import SurveyHeader from "@/app/survey/SurveyHeader";
import SurveyForm, { questions, SurveyFormData } from "@/app/survey/SurveyForm";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiCall } from "@/lib/api";
import { HTTP_METHODS } from "@/constants/api";



export default function SurveyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState<SurveyFormData>({
    sleep_quality: 0,
    stress_level: 0,
    energy_day: 0,
    mood_stability: 0,
    social_connection: 0,
    focus_concentration: 0,
    enjoyment_activities: 0,
    anxiety_level: 0,
    self_care: 0,
    optimism: 0
  });
  const [step, setStep] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate all required fields
    for (const q of questions) {
      if (!formData[q.key]) {
        setError("Please answer all questions before submitting.");
        return;
      }
    }
    setError("");
    setSuccess("");
    // Calculate average score
    const totalScore = questions.reduce((sum, q) => sum + (formData[q.key] || 0), 0);
    const avgScore = totalScore / questions.length;
    const payload = {
      score: avgScore,
      timestamp: new Date().toISOString(),
    };
    await handleSurveySubmit(payload);
    if (!error) {
      sessionStorage.setItem("mentalWellnessScore", JSON.stringify(avgScore));
      router.push(`/survey/result`);
    }
  };

  const handleSurveySubmit = async (payload: { score: number; timestamp: string }) => {
    try {
      setLoading(true);
      setError("");
      setSuccess("Submitting survey...");
      // POST to backend score endpoint
      await apiCall("/api/score/submit", HTTP_METHODS.POST, payload);
      setSuccess("Survey submitted successfully!");
    } catch (err) {
      console.log(err);
      setError("Failed to submit survey. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#A9CFDC] flex flex-col relative overflow-hidden">
      <img src="/quiz.jpeg" alt="background" className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 blur-sm" />
      <SurveyHeader/>
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        <div className="w-full max-w-xl">
          <SurveyForm
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            loading={loading}
            error={error}
            success={success}
            step={step}
            setStep={setStep}
          />
        </div>
      </div>
    </div>
  );
}
