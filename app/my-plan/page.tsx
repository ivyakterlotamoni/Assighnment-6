"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Workout = {
  id: number;
  name: string;
  image: string;
  equipment: string;
  duration: number;
  caloriesBurned: number;
  rating: number;
};

export default function MyPlan() {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");

  useEffect(() => {
    const savedPlan = JSON.parse(
      localStorage.getItem("fitlog-plan") || "[]"
    );

    const savedWorkouts = JSON.parse(
      localStorage.getItem("fitlog-saved") || "[]"
    );

    setPlan(savedPlan);
    setSaved(savedWorkouts);
  }, []);

  const removeFromPlan = (id: number) => {
    const updated = plan.filter((item) => item.id !== id);

    setPlan(updated);
    localStorage.setItem("fitlog-plan", JSON.stringify(updated));
  };

  const removeFromSaved = (id: number) => {
    const updated = saved.filter((item) => item.id !== id);

    setSaved(updated);
    localStorage.setItem("fitlog-saved", JSON.stringify(updated));
  };

  const workouts = activeTab === "plan" ? plan : saved;

  const totalMinutes = plan.reduce(
    (total, item) => total + item.duration,
    0
  );

  const totalCalories = plan.reduce(
    (total, item) => total + item.caloriesBurned,
    0
  );

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-lime-400">
            FITLOG
          </p>

          <h1 className="text-4xl font-black uppercase md:text-5xl">
            MY PLAN
          </h1>

          <p className="mt-3 text-gray-400">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Metrics */}
        <div className="mb-8 grid grid-cols-3 gap-3">
          <div className="rounded-2xl bg-zinc-900 p-5">
            <p className="text-sm text-gray-500">Exercises</p>
            <p className="mt-2 text-2xl font-bold">{plan.length}</p>
          </div>

          <div className="rounded-2xl bg-zinc-900 p-5">
            <p className="text-sm text-gray-500">Minutes</p>
            <p className="mt-2 text-2xl font-bold">{totalMinutes}</p>
          </div>

          <div className="rounded-2xl bg-zinc-900 p-5">
            <p className="text-sm text-gray-500">Calories</p>
            <p className="mt-2 text-2xl font-bold">{totalCalories}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-3">
          <button
            onClick={() => setActiveTab("plan")}
            className={`rounded-full px-5 py-2 font-semibold ${
              activeTab === "plan"
                ? "bg-[#ccff00] text-black"
                : "border border-white/20 text-white"
            }`}
          >
            Today's Plan ({plan.length})
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`rounded-full px-5 py-2 font-semibold ${
              activeTab === "saved"
                ? "bg-[#ccff00] text-black"
                : "border border-white/20 text-white"
            }`}
          >
            Saved ({saved.length})
          </button>
        </div>

        {/* Cards */}
        {workouts.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-zinc-900 p-10 text-center">
            <h2 className="text-2xl font-bold">
              {activeTab === "plan"
                ? "Your plan is empty."
                : "No saved workouts yet."}
            </h2>

            <p className="mt-3 text-gray-400">
              Browse workouts and add your favorites.
            </p>

            <Link
              href="/#library"
              className="mt-6 inline-block rounded-full bg-[#ccff00] px-6 py-3 font-bold text-black"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {workouts.map((workout) => (
              <div
                key={workout.id}
                className="flex gap-4 rounded-2xl border border-white/10 bg-zinc-900 p-4"
              >
                <Image
                  src={workout.image}
                  alt={workout.name}
                  width={120}
                  height={120}
                  className="h-28 w-28 rounded-xl object-cover"
                  unoptimized
                />

                <div className="flex min-w-0 flex-1 flex-col">
                  <h2 className="text-xl font-bold uppercase">
                    {workout.name}
                  </h2>

                  <p className="mt-1 text-sm text-gray-400">
                    {workout.equipment}
                  </p>

                  <p className="mt-2 text-sm text-gray-400">
                    {workout.duration} min • {workout.caloriesBurned} kcal • ⭐{" "}
                    {workout.rating}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-2 pt-4">
                    <Link
                      href={`/workout/${workout.id}`}
                      className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black"
                    >
                      View Details
                    </Link>

                    <button
                      onClick={() =>
                        activeTab === "plan"
                          ? removeFromPlan(workout.id)
                          : removeFromSaved(workout.id)
                      }
                      className="rounded-full border border-red-400/40 px-4 py-2 text-sm font-semibold text-red-400"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}