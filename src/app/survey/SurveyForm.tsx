"use client"

import React from "react"

export interface SurveyFormData {
  [key: string]: number;
}

interface SurveyFormProps {
  formData: SurveyFormData;
  setFormData: React.Dispatch<React.SetStateAction<SurveyFormData>>;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error: string;
  success: string;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export const questions = [
  {
    key: "sleep_quality",
    label: "How would you rate your sleep quality recently?",
    options: [
      { value: 1, label: "Poor, I rarely feel rested" },
      { value: 2, label: "Fair, I sometimes feel rested" },
      { value: 3, label: "Good, I usually feel rested" },
      { value: 4, label: "Excellent, I always feel rested" },
    ],
  },
  {
    key: "stress_level",
    label: "How often do you feel stressed?",
    options: [
      { value: 1, label: "Almost always" },
      { value: 2, label: "Often" },
      { value: 3, label: "Sometimes" },
      { value: 4, label: "Rarely" },
    ],
  },
  {
    key: "energy_day",
    label: "How is your energy throughout the day?",
    options: [
      { value: 1, label: "Very low, I feel tired most of the time" },
      { value: 2, label: "Low, I struggle to stay alert" },
      { value: 3, label: "Moderate, I have ups and downs" },
      { value: 4, label: "High, I feel energetic most of the day" },
    ],
  },
  {
    key: "mood_stability",
    label: "How stable is your mood?",
    options: [
      { value: 1, label: "Very unstable, frequent mood swings" },
      { value: 2, label: "Somewhat unstable" },
      { value: 3, label: "Mostly stable" },
      { value: 4, label: "Very stable" },
    ],
  },
  {
    key: "social_connection",
    label: "How connected do you feel to others?",
    options: [
      { value: 1, label: "Very isolated" },
      { value: 2, label: "Somewhat isolated" },
      { value: 3, label: "Somewhat connected" },
      { value: 4, label: "Very connected" },
    ],
  },
  {
    key: "focus_concentration",
    label: "How would you rate your focus and concentration?",
    options: [
      { value: 1, label: "Very poor" },
      { value: 2, label: "Poor" },
      { value: 3, label: "Good" },
      { value: 4, label: "Excellent" },
    ],
  },
  {
    key: "enjoyment_activities",
    label: "How much do you enjoy your daily activities?",
    options: [
      { value: 1, label: "Not at all" },
      { value: 2, label: "A little" },
      { value: 3, label: "Quite a bit" },
      { value: 4, label: "A lot" },
    ],
  },
  {
    key: "anxiety_level",
    label: "How often do you feel anxious or worried?",
    options: [
      { value: 1, label: "Almost always" },
      { value: 2, label: "Often" },
      { value: 3, label: "Sometimes" },
      { value: 4, label: "Rarely" },
    ],
  },
  {
    key: "self_care",
    label: "How often do you make time for self-care?",
    options: [
      { value: 1, label: "Never" },
      { value: 2, label: "Rarely" },
      { value: 3, label: "Sometimes" },
      { value: 4, label: "Often" },
    ],
  },
  {
    key: "optimism",
    label: "How optimistic do you feel about the future?",
    options: [
      { value: 1, label: "Not at all" },
      { value: 2, label: "A little" },
      { value: 3, label: "Somewhat" },
      { value: 4, label: "Very optimistic" },
    ],
  },
] as const;

export default function SurveyForm({
  formData,
  setFormData,
  handleSubmit,
  loading,
  error,
  success,
  step,
  setStep,
}: SurveyFormProps) {
  const totalSteps = questions.length;
  const current = questions[step];
  const isLast = step === questions.length - 1;
  const isFirst = step === 0;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData[current.key]) return;
    setStep((s: number) => s + 1);
  };

  const handleBack = (e: React.FormEvent) => {
    e.preventDefault();
    setStep((s: number) => s - 1);
  };

  return (
    <form
      onSubmit={isLast ? handleSubmit : handleNext}
      className="space-y-6 bg-white/50 rounded-2xl p-10 shadow-lg backdrop-blur-lg min-h-[380px] text-lg text-black"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-base font-bold tracking-wide uppercase text-black bg-black/10 px-3 py-1 rounded shadow-sm">
          Question {step + 1} of {totalSteps}
        </span>
      </div>
      <div>
        <label className="block mb-6 font-semibold text-xl text-black" htmlFor={current.key}>
          {current.label}
        </label>
        <div className="flex flex-col gap-3">
          {current.options.map((opt) => (
            <label
              key={opt.value}
              className={`flex items-center gap-3 p-3 rounded cursor-pointer border border-black/20 transition-colors text-black ${
                formData[current.key] === opt.value
                  ? "bg-black/10 border-black"
                  : "hover:bg-black/5"
              }`}
            >
              <input
                type="radio"
                name={current.key}
                value={opt.value}
                checked={formData[current.key] === opt.value}
                onChange={() =>
                  setFormData((prev) => ({ ...prev, [current.key]: opt.value }))
                }
                className="form-radio h-5 w-5 text-black"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="flex justify-between gap-2">
        {!isFirst && (
          <button
            type="button"
            className="bg-gray-200 text-black py-2 px-4 rounded hover:bg-gray-300"
            onClick={handleBack}
            disabled={loading}
          >
            Back
          </button>
        )}
        <div className="flex-1"></div>
        {!isLast ? (
          <button
            type="submit"
            className="bg-[#183D5D] text-white py-2 px-6 rounded hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            disabled={loading || !formData[current.key]}
          >
            Next
          </button>
        ) : (
          !success && (
            <button
              type="submit"
              className="bg-[#183D5D] text-white py-2 px-6 rounded hover:bg-[#183D5D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Show result"}
            </button>
          )
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {success && (
        <p className="text-green-600 text-lg mt-4 font-bold flex items-center justify-center gap-2 animate-bounce">
          {success}
        </p>
      )}
    </form>
  );
}
