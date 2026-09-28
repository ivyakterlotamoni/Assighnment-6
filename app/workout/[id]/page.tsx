"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
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

export default function WorkoutDetails() {
  const params = useParams();
  const id = params.id;

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!id) return;

    const plan = JSON.parse(
      localStorage.getItem("fitlog-plan") || "[]"
    );

    const saved = JSON.parse(
      localStorage.getItem("fitlog-saved") || "[]"
    );

    setPlanCount(plan.length);
    setSavedCount(saved.length);

    fetch(`https://api.api-store.workers.dev/api/fitlog/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load workout");
        }
        return res.json();
      })
      .then((data) => {
        setWorkout(data);
      })
      .catch((error) => {
        console.error("Workout fetch error:", error);
      });
  }, [id]);

  const showToast = (message: string) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const addToPlan = () => {
    if (!workout) return;

    const plan = JSON.parse(
      localStorage.getItem("fitlog-plan") || "[]"
    );

    if (plan.length >= 5) {
      showToast("Today's plan is full");
      return;
    }

    if (plan.some((item: Workout) => item.id === workout.id)) {
      showToast("Already in today's plan");
      return;
    }

    const updatedPlan = [...plan, workout];

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(updatedPlan)
    );

    setPlanCount(updatedPlan.length);

    showToast("Added to today's plan");
  };

  const saveForLater = () => {
    if (!workout) return;

    const saved = JSON.parse(
      localStorage.getItem("fitlog-saved") || "[]"
    );

    if (saved.some((item: Workout) => item.id === workout.id)) {
      showToast("Already saved");
      return;
    }

    const updatedSaved = [...saved, workout];

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(updatedSaved)
    );

    setSavedCount(updatedSaved.length);

    showToast("Saved for later");
  };

  if (!workout) {
    return (
      <main className="min-h-screen bg-[#0b0d0c] text-white">
        <div className="flex min-h-screen items-center justify-center">
          <p className="animate-pulse text-sm text-white/50">
            Loading workout…
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0d0c] text-white">

      {/* TOAST */}
      {toast && (
        <div className="fixed right-5 top-5 z-[9999] flex items-center gap-3 rounded-xl border border-[#ccff00]/30 bg-[#171a17] px-5 py-3 text-sm font-bold text-white shadow-2xl">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ccff00] font-black text-black">
            ✓
          </span>

          <span>{toast}</span>
        </div>
      )}

      {/* NAVBAR */}
      <nav className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-5">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo-image.png"
              alt="FitLog"
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
            />

            <span className="text-lg font-black tracking-tight text-white">
              FITLOG
            </span>
          </Link>

          {/* NAV LINKS */}
          <div className="hidden items-center gap-8 md:flex">

            <Link
              href="/#library"
              className="text-sm font-semibold text-white/70 transition hover:text-white"
            >
              Workouts
            </Link>

            <Link
              href="/my-plan"
              className="text-sm font-semibold text-white/70 transition hover:text-white"
            >
              My Plan
            </Link>

          </div>

          {/* BADGES */}
          <div className="flex items-center gap-2">

            <Link
              href="/my-plan"
              className="rounded-full bg-[#ccff00] px-3 py-1.5 text-xs font-bold text-black"
            >
              Plan {planCount}
            </Link>

            <Link
              href="/my-plan"
              className="rounded-full border border-white/30 px-3 py-1.5 text-xs font-bold text-white"
            >
              Saved {savedCount}
            </Link>

          </div>

        </div>
      </nav>

      {/* DETAILS */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-5 sm:py-10">

        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">

          {/* LEFT IMAGE */}
               <div className="overflow-hidden rounded-2xl">
  <Image
    src={workout.image}
    alt={workout.name}
    width={800}
    height={800}
    className="w-full object-cover lg:h-full"
    unoptimized
  />
</div>
        

          

          {/* RIGHT SIDE */}
          <div>

            <p className="text-xs font-bold tracking-[0.18em] text-[#ccff00]">
              WORKOUT DETAILS
            </p>

            <h1 className="mt-2 text-3xl font-black uppercase leading-tight sm:text-4xl">
              {workout.name}
            </h1>

            <p className="mt-3 text-sm leading-6 text-white/50">
              {workout.description}
            </p>

            {/* TAGS */}
            <div className="mt-4 flex flex-wrap gap-2">

              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full bg-[#ccff00]/10 px-3 py-1 text-[10px] font-bold uppercase text-[#ccff00]"
                >
                  {muscle}
                </span>
              ))}

            </div>

            {/* SPECS */}
            <div className="mt-5 overflow-hidden rounded-xl border border-white/10 bg-[#171a1b]">

              <div className="grid grid-cols-2 border-b border-white/10 p-3">
                <span className="text-[10px] font-bold uppercase text-white/40">
                  Equipment
                </span>

                <span className="text-sm font-semibold">
                  {workout.equipment}
                </span>
              </div>

              <div className="grid grid-cols-2 border-b border-white/10 p-3">
                <span className="text-[10px] font-bold uppercase text-white/40">
                  Difficulty
                </span>

                <span className="text-sm font-semibold">
                  {workout.difficulty}
                </span>
              </div>

              <div className="grid grid-cols-2 border-b border-white/10 p-3">
                <span className="text-[10px] font-bold uppercase text-white/40">
                  Sets
                </span>

                <span className="text-sm font-semibold">
                  {workout.sets}
                </span>
              </div>

              <div className="grid grid-cols-2 border-b border-white/10 p-3">
                <span className="text-[10px] font-bold uppercase text-white/40">
                  Reps
                </span>

                <span className="text-sm font-semibold">
                  {workout.reps}
                </span>
              </div>

              <div className="grid grid-cols-2 border-b border-white/10 p-3">
                <span className="text-[10px] font-bold uppercase text-white/40">
                  Duration
                </span>

                <span className="text-sm font-semibold">
                  {workout.duration} min
                </span>
              </div>

              <div className="grid grid-cols-2 border-b border-white/10 p-3">
                <span className="text-[10px] font-bold uppercase text-white/40">
                  Calories
                </span>

                <span className="text-sm font-semibold">
                  {workout.caloriesBurned} kcal
                </span>
              </div>

              <div className="grid grid-cols-2 p-3">
                <span className="text-[10px] font-bold uppercase text-white/40">
                  Rating
                </span>

                <span className="text-sm font-semibold">
                  ★ {workout.rating}
                </span>
              </div>

            </div>

            {/* INSTRUCTIONS */}
            <div className="mt-6">

              <h2 className="text-xs font-bold tracking-[0.18em] text-white/40">
                INSTRUCTIONS
              </h2>

              <ol className="mt-3 space-y-2">

                {workout.instructions.map((instruction, index) => (
                  <li
                    key={index}
                    className="flex gap-3 text-sm leading-6 text-white/60"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white">
                      {index + 1}
                    </span>

                    <span>{instruction}</span>
                  </li>
                ))}

              </ol>

            </div>

            {/* BUTTONS */}
            <div className="mt-7 flex flex-wrap items-center gap-2">

              {/* ADD TO PLAN */}
              <button
                type="button"
                onClick={addToPlan}
                className="inline-flex items-center gap-2 rounded-full bg-[#ccff00] px-4 py-2.5 text-xs font-bold text-black transition hover:opacity-90"
              >

                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect
                    x="4"
                    y="4"
                    width="16"
                    height="16"
                    rx="2"
                  />

                  <path d="M9 2h6v4H9z" />
                  <path d="M12 10v6" />
                  <path d="M9 13h6" />
                </svg>

                Add to today's plan

              </button>

              {/* SAVE FOR LATER */}
              <button
                type="button"
                onClick={saveForLater}
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-4 py-2.5 text-xs font-semibold text-white transition hover:border-white"
              >

                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
                </svg>

                Save for later

              </button>

            </div>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="mt-6 border-t border-white/10 px-5 py-6">

        <div className="mx-auto max-w-6xl">

          <p className="text-xs text-white/40">
            © 2026 FitLog — Workout Library. Train hard, log honest.
          </p>

        </div>

      </footer>

    </main>
  );
}