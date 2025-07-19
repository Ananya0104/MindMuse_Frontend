"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function MoodCheckInPage() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [sleepHours, setSleepHours] = useState("")
  const [sleepQuality, setSleepQuality] = useState<number | null>(null)
  const [energy, setEnergy] = useState<number | null>(null)
  const [stress, setStress] = useState<number | null>(null)
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const moodOptions = [
    { value: 1, emoji: "😢", label: "Very Sad", color: "#EF4444" },
    { value: 2, emoji: "😔", label: "Sad", color: "#F97316" },
    { value: 3, emoji: "😐", label: "Neutral", color: "#EAB308" },
    { value: 4, emoji: "😊", label: "Happy", color: "#22C55E" },
    { value: 5, emoji: "😄", label: "Very Happy", color: "#16A34A" },
  ]

  const handleSubmit = async () => {
    if (!selectedMood) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setShowSuccess(true)
    setIsSubmitting(false)

    // Reset form after success
    setTimeout(() => {
      setSelectedMood(null)
      setSleepHours("")
      setSleepQuality(null)
      setEnergy(null)
      setStress(null)
      setNotes("")
      setShowSuccess(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen relative bg-light-cream">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "url(/mood.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.3,
        }}
      />

      {/* Main Content */}
      <main className="relative z-10 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          {showSuccess && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div
                className="bg-white p-8 rounded-lg shadow-xl max-w-md mx-4 text-center"
                style={{ backgroundColor: "#FAF7F0", border: "2px solid #5B3016" }}
              >
                <div className="text-6xl mb-4">✨</div>
                <h3 className="text-2xl font-bold mb-4 text-blue-dark font-dm-sans">
                  Mood Logged!
                </h3>
                <p className="text-lg text-blue-dark font-dm-sans">
                  Thank you for checking in with yourself today.
                </p>
              </div>
            </div>
          )}

          {/* Title */}
          <h1
            className="text-4xl md:text-5xl font-bold text-center mb-8 text-blue-dark font-dm-sans"
          >
            How are you feeling today?
          </h1>

          <div className="space-y-12">
            {/* Mood Selection */}
            <div
              className="p-8 rounded-lg bg-overlay border-cream"
            >
              <h2 className="text-2xl font-bold mb-6 text-center text-blue-dark font-dm-sans">
                Your Mood
              </h2>
              <div className="grid grid-cols-5 gap-4">
                {moodOptions.map((mood) => (
                  <button
                    key={mood.value}
                    onClick={() => setSelectedMood(mood.value)}
                    className={`p-4 rounded-lg text-center transition-all duration-200 font-dm-sans ${
                      selectedMood === mood.value ? "scale-110 shadow-lg text-light-cream" : "hover:scale-105 text-blue-dark"
                    }`}
                    style={{
                      backgroundColor: selectedMood === mood.value ? mood.color : "#FFFFFF",
                      border: `2px solid ${mood.color}`,
                    }}
                  >
                    <div className="text-3xl mb-2">{mood.emoji}</div>
                    <div className="text-sm font-medium font-dm-sans">
                      {mood.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sleep Section */}
            <div
              className="p-8 rounded-lg bg-overlay border-cream"
            >
              <h2 className="text-2xl font-bold mb-6 text-blue-dark font-dm-sans">
                Sleep (Optional)
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-medium mb-3 text-blue-dark font-dm-sans">
                    Hours of Sleep
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="24"
                    step="0.5"
                    value={sleepHours}
                    onChange={(e) => setSleepHours(e.target.value)}
                    placeholder="e.g., 7.5"
                    className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 bg-white border-cream text-blue-dark font-dm-sans"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium mb-3 text-blue-dark font-dm-sans">
                    Sleep Quality (1-5)
                  </label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setSleepQuality(rating)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all font-dm-sans ${
                          sleepQuality === rating ? "scale-110 bg-blue-dark text-light-cream border-blue-dark" : "hover:scale-105 bg-white text-blue-dark border-blue-dark"
                        }`}
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Energy & Stress */}
            <div
              className="p-8 rounded-lg bg-overlay border-cream"
            >
              <h2 className="text-2xl font-bold mb-6 text-blue-dark font-dm-sans">
                Energy & Stress (Optional)
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-medium mb-3 text-blue-dark font-dm-sans">
                    Energy Level (1-5)
                  </label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setEnergy(rating)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all font-dm-sans ${
                          energy === rating ? "scale-110 bg-mood-green text-light-cream border-mood-green" : "hover:scale-105 bg-white text-mood-green border-mood-green"
                        }`}
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-lg font-medium mb-3 text-blue-dark font-dm-sans">
                    Stress Level (1-5)
                  </label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setStress(rating)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all font-dm-sans ${
                          stress === rating ? "scale-110 bg-mood-red text-light-cream border-mood-red" : "hover:scale-105 bg-white text-mood-red border-mood-red"
                        }`}
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div
              className="p-8 rounded-lg bg-overlay border-cream"
            >
              <h2 className="text-2xl font-bold mb-6 text-blue-dark font-dm-sans">
                Notes (Optional)
              </h2>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="How was your day? Any thoughts or reflections..."
                rows={4}
                className="w-full px-4 py-3 rounded-lg border-2 resize-none focus:outline-none focus:ring-2 bg-white border-cream text-blue-dark font-dm-sans"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <Button
                onClick={handleSubmit}
                disabled={!selectedMood || isSubmitting}
                className={`px-12 py-4 text-xl font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-dm-sans ${selectedMood ? "bg-blue-dark text-light-cream" : "bg-dark-cream text-blue-dark"}`}
              >
                {isSubmitting ? "Saving..." : "Log My Mood"}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
