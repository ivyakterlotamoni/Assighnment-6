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

 const markAsDone = (id: number) => {
  removeFromPlan(id);
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
    <main className="min-h-screen bg-black text-white">

      {/* ================= NAVBAR ================= */}
      <nav className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

          <Link href="/" className="flex items-center">
            <Image
              src="/logo-image.png"
              alt="FitLog"
              width={120}
              height={40}
              className="h-10 w-auto object-contain"
            />
          </Link>

          <div className="hidden items-center gap-8 md:flex">

            <Link
              href="/#library"
              className="text-sm font-semibold text-white/60 transition hover:text-white"
            >
              Workout
            </Link>

            <Link
              href="/my-plan"
              className="rounded-full bg-[#ccff00] px-5 py-2 text-sm font-bold text-black"
            >
              My Plan
            </Link>

          </div>

          <div className="flex items-center gap-2">

            <Link
              href="/my-plan"
              className="rounded-full bg-[#ccff00] px-3 py-2 text-xs font-bold text-black"
            >
              Plan {plan.length}
            </Link>

            <Link
              href="/my-plan"
              className="rounded-full border border-white/30 px-3 py-2 text-xs font-bold text-white"
            >
              Saved {saved.length}
            </Link>

          </div>

        </div>
      </nav>

      {/* ================= CONTENT ================= */}
      <div className="px-6 py-10">
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
              <p className="text-sm text-gray-500">
                Exercises
              </p>

              <p className="mt-2 text-2xl font-bold">
                {plan.length}
              </p>
            </div>

            <div className="rounded-2xl bg-zinc-900 p-5">
              <p className="text-sm text-gray-500">
                Minutes
              </p>

              <p className="mt-2 text-2xl font-bold">
                {totalMinutes}
              </p>
            </div>

            <div className="rounded-2xl bg-zinc-900 p-5">
              <p className="text-sm text-gray-500">
                Calories
              </p>

              <p className="mt-2 text-2xl font-bold">
                {totalCalories}
              </p>
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

          {/* Empty State */}
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

            /* Workout Cards */
            <div className="grid gap-5 md:grid-cols-2">

              {workouts.map((workout) => (

                <div
                  key={workout.id}
                  className="flex gap-4 rounded-2xl border border-white/10 bg-zinc-900 p-4"
                >

                  {/* Image */}
                  <Image
                    src={workout.image}
                    alt={workout.name}
                    width={120}
                    height={120}
                    className="h-28 w-28 rounded-xl object-cover"
                    unoptimized
                  />

                  {/* Details */}
                  <div className="flex min-w-0 flex-1 flex-col">

                    <h2 className="text-xl font-bold uppercase">
                      {workout.name}
                    </h2>

                    <p className="mt-1 text-sm text-gray-400">
                      {workout.equipment}
                    </p>

                    <p className="mt-2 text-sm text-gray-400">
                      {workout.duration} min •{" "}
                      {workout.caloriesBurned} kcal • ⭐{" "}
                      {workout.rating}
                    </p>

                    {/* Buttons */}
                    <div className="mt-auto flex flex-wrap gap-2 pt-4">

                      <Link
                        href={`/workout/${workout.id}`}
                        className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black"
                      >
                        View Details
                      </Link>

                      {activeTab === "plan" && (
                        <button
                          onClick={() => markAsDone(workout.id)}
                          className="rounded-full bg-[#ccff00] px-4 py-2 text-sm font-semibold text-black"
                        >
                          ✓ Mark as Done
                        </button>
                      )}

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
      </div>

    </main>
  );
}