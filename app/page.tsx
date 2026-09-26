"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
};

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("duration");
  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    const plan = JSON.parse(localStorage.getItem("fitlog-plan") || "[]");
    const saved = JSON.parse(localStorage.getItem("fitlog-saved") || "[]");

    setPlanCount(plan.length);
    setSavedCount(saved.length);

    fetch("https://api.abcz.workers.dev/api/fitlog")
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load workouts:", error);
        setLoading(false);
      });
  }, []);

  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === "calories") {
      return b.caloriesBurned - a.caloriesBurned;
    }

    if (sortBy === "rating") {
      return b.rating - a.rating;
    }

    return a.duration - b.duration;
  });

  return (
    <main className="min-h-screen bg-[#0b0d0c] text-white">

      {/* ================= NAVBAR ================= */}
      <nav className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

          <a href="/" className="flex items-center">
            <Image
              src="/logo-image.png"
              alt="FitLog"
              width={120}
              height={40}
              className="h-10 w-auto object-contain"
            />
          </a>

          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#library"
              className="rounded-full bg-[#ccff00] px-5 py-2 text-sm font-bold text-black transition hover:opacity-90"
            >
              Workout
            </a>

            <a
              href="/my-plan"
              className="text-sm font-semibold text-white/60 transition hover:text-white"
            >
              My Plan
            </a>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/my-plan"
              className="rounded-full bg-[#ccff00] px-3 py-2 text-xs font-bold text-black"
            >
              Plan {planCount}
            </a>

            <a
              href="/my-plan"
              className="rounded-full border border-white/30 px-3 py-2 text-xs font-bold text-white"
            >
              Saved {savedCount}
            </a>
          </div>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="mx-auto max-w-7xl px-5 py-8">
        <div className="grid min-h-80 items-center gap-8 overflow-hidden rounded-2xl bg-[#171a19] px-7 py-10 md:grid-cols-2 md:px-10">

          <div>
            <p className="mb-4 text-xs font-bold tracking-[0.2em] text-[#ccff00]">
              WORKOUT LIBRARY
            </p>

            <h1 className="max-w-xl text-4xl font-black uppercase leading-[0.95] sm:text-5xl md:text-6xl">
              TRAIN WITH INTENT.
              <br />
              LOG EVERY SET.
            </h1>

            <p className="mt-5 max-w-lg text-sm leading-6 text-white/50">
              FitLog is a dark, no-nonsense gym companion: pick a lift,
              lock it into today&apos;s plan, and watch the week&apos;s work
              add up.
            </p>

            <a
              href="#library"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#ccff00] px-5 py-3 text-xs font-black text-black transition hover:scale-105"
            >
              BROWSE WORKOUTS
              <span className="text-base">→</span>
            </a>
          </div>

          <div className="flex min-h-64 items-center justify-center">
            <Image
              src="/hero-image.png"
              alt="Workout illustration"
              width={600}
              height={400}
              priority
              className="h-64 w-full object-contain md:h-80"
            />
          </div>

        </div>
      </section>

      {/* ================= LIBRARY ================= */}
      <section
        id="library"
        className="mx-auto max-w-7xl px-5 py-12"
      >

        <p className="text-xs font-bold tracking-[0.2em] text-[#ccff00]">
          WORKOUT LIBRARY
        </p>

        <h2 className="mt-2 text-3xl font-black uppercase sm:text-4xl">
          THE LIBRARY
        </h2>

        <p className="mt-2 text-sm text-white/50">
          Twelve lifts covering every major muscle group.
        </p>

        {/* ================= SORT ================= */}
        <div className="mt-5 flex items-center gap-3">
          <label className="text-sm text-white/50">
            Sort by:
          </label>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-white/20 bg-[#151817] px-4 py-2 text-sm text-white outline-none"
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-10 py-16 text-center">
            <p className="animate-pulse text-sm text-white/50">
              Loading workouts…
            </p>
          </div>
        )}

        {/* Workout Cards */}
        {!loading && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {sortedWorkouts.map((workout) => (
              <Link
                key={workout.id}
                href={`/workout/${workout.id}`}
                className="block overflow-hidden rounded-2xl border border-white/10 bg-[#151817] transition hover:-translate-y-1 hover:border-[#ccff00]/50"
              >

                {/* Image */}
                <div className="relative h-56 overflow-hidden bg-[#202322]">
                  <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    className="object-cover transition duration-300 hover:scale-105"
                    unoptimized
                  />
                </div>

                {/* Card Content */}
                <div className="p-5">

                  {/* Categories */}
                  <div className="flex flex-wrap gap-2">
                    {workout.muscleGroups.map((muscle) => (
                      <span
                        key={muscle}
                        className="rounded-full bg-[#ccff00]/10 px-3 py-1 text-[10px] font-bold uppercase text-[#ccff00]"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>

                  {/* Name */}
                  <h3 className="mt-4 text-xl font-black uppercase">
                    {workout.name}
                  </h3>

                  {/* Equipment */}
                  <p className="mt-2 text-sm text-white/50">
                    {workout.equipment}
                  </p>

                  {/* Stats */}
                  <div className="mt-5 grid grid-cols-3 border-t border-white/10 pt-4">

                    <div>
                      <p className="text-[10px] uppercase text-white/40">
                        Duration
                      </p>
                      <p className="mt-1 text-sm font-bold">
                        {workout.duration} min
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase text-white/40">
                        Calories
                      </p>
                      <p className="mt-1 text-sm font-bold">
                        {workout.caloriesBurned}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase text-white/40">
                        Rating
                      </p>
                      <p className="mt-1 text-sm font-bold">
                        ★ {workout.rating}
                      </p>
                    </div>

                  </div>
                </div>
              </Link>
            ))}

          </div>
        )}

      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 px-5 py-7">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 sm:flex-row sm:items-center">

          <a href="/" className="flex items-center">
            <Image
              src="/logo-image.png"
              alt="FitLog"
              width={100}
              height={35}
              className="h-8 w-auto object-contain"
            />
          </a>

          <p className="text-xs text-white/40">
            © 2026 FitLog — Workout Library. Train hard, log honest.
          </p>

        </div>
      </footer>

    </main>
  );
}