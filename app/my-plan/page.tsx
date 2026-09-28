
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

  const [toast, setToast] = useState("");
  const [toastType, setToastType] =
    useState<"success" | "error">("success");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedPlan = JSON.parse(
        localStorage.getItem("fitlog-plan") || "[]"
      );

      const savedWorkouts = JSON.parse(
        localStorage.getItem("fitlog-saved") || "[]"
      );

      setPlan(savedPlan);
      setSaved(savedWorkouts);
    } catch (error) {
      console.error("Failed to load saved data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const showToast = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    setToast(message);
    setToastType(type);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const removeFromPlan = (id: number) => {
    const updated = plan.filter((item) => item.id !== id);

    setPlan(updated);
    localStorage.setItem("fitlog-plan", JSON.stringify(updated));

    showToast("Removed from today's plan", "error");
  };

  const removeFromSaved = (id: number) => {
    const updated = saved.filter((item) => item.id !== id);

    setSaved(updated);
    localStorage.setItem("fitlog-saved", JSON.stringify(updated));

    showToast("Removed from saved", "error");
  };

  const markAsDone = (id: number) => {
    const updated = plan.filter((item) => item.id !== id);

    setPlan(updated);
    localStorage.setItem("fitlog-plan", JSON.stringify(updated));

    showToast("Workout marked as done", "success");
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
    <main className="min-h-screen bg-[#0b0d0c] text-white">

      {/* TOAST */}
      {toast && (
        <div
          className={`fixed right-5 top-5 z-[9999] flex items-center gap-3 rounded-xl border px-5 py-3 text-sm font-bold shadow-2xl ${
            toastType === "error"
              ? "border-red-500/30 bg-[#191416] text-white"
              : "border-[#ccff00]/30 bg-[#171a17] text-white"
          }`}
        >
          <span
            className={`flex h-6 w-6 items-center justify-center rounded-full font-black ${
              toastType === "error"
                ? "bg-red-500 text-white"
                : "bg-[#ccff00] text-black"
            }`}
          >
            {toastType === "error" ? "×" : "✓"}
          </span>

          <span>{toast}</span>
        </div>
      )}

      {/* NAVBAR */}
      <nav className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo-image.png"
              alt="FitLog"
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
            />

            <span className="text-lg font-black tracking-tight">
              FITLOG
            </span>
          </Link>

          {/* NAV LINKS */}
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="/#library"
              className="text-sm font-semibold text-white/60 transition hover:text-white"
            >
              Workouts
            </Link>

            <Link
              href="/my-plan"
              className="text-sm font-semibold text-white"
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
              Plan {plan.length}
            </Link>

            <Link
              href="/my-plan"
              className="rounded-full border border-white/30 px-3 py-1.5 text-xs font-bold text-white"
            >
              Saved {saved.length}
            </Link>
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-5 sm:py-10">

        {/* HEADER */}
        <div className="mb-8">
          <p className="text-xs font-bold tracking-[0.2em] text-[#ccff00]">
            FITLOG
          </p>

          <h1 className="mt-2 text-4xl font-black uppercase sm:text-5xl">
            MY PLAN
          </h1>

          <p className="mt-3 text-sm text-white/50">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* METRICS */}
        <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">

          <div className="rounded-2xl border border-white/10 bg-[#151817] p-5">
            <p className="text-xs uppercase tracking-wide text-white/40">
              Exercises
            </p>

            <p className="mt-2 text-2xl font-black">
              {plan.length}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#151817] p-5">
            <p className="text-xs uppercase tracking-wide text-white/40">
              Minutes
            </p>

            <p className="mt-2 text-2xl font-black">
              {totalMinutes}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#151817] p-5">
            <p className="text-xs uppercase tracking-wide text-white/40">
              Calories
            </p>

            <p className="mt-2 text-2xl font-black">
              {totalCalories}
            </p>
          </div>

        </div>

        {/* TABS */}
        <div className="mb-6 flex flex-wrap gap-3">

          <button
            type="button"
            onClick={() => setActiveTab("plan")}
            className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
              activeTab === "plan"
                ? "bg-[#ccff00] text-black"
                : "border border-white/20 text-white hover:border-white/40"
            }`}
          >
            Today's Plan ({plan.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("saved")}
            className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
              activeTab === "saved"
                ? "bg-[#ccff00] text-black"
                : "border border-white/20 text-white hover:border-white/40"
            }`}
          >
            Saved ({saved.length})
          </button>

        </div>

        {/* LOADING */}
        {loading ? (
          <div className="flex min-h-[250px] items-center justify-center">
            <p className="animate-pulse text-sm font-semibold text-white/50">
              Loading workouts…
            </p>
          </div>
        ) : workouts.length === 0 ? (

          /* EMPTY STATE */
          <div className="rounded-3xl border border-white/10 bg-[#151817] px-6 py-16 text-center">

            <p className="text-xs font-bold tracking-[0.2em] text-[#ccff00]">
              FITLOG
            </p>

            <h2 className="mt-3 text-2xl font-black uppercase sm:text-3xl">
              NOTHING HERE YET
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/50">
              Browse the library and add a lift to get today moving.
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex rounded-full bg-[#ccff00] px-6 py-3 text-sm font-black text-black transition hover:scale-105"
            >
              Go to workouts
            </Link>

          </div>

        ) : (

          /* WORKOUT CARDS */
          <div className="flex flex-col gap-3">

            {workouts.map((workout) => (

              <div
                key={workout.id}
                className="flex w-full flex-col gap-4 rounded-2xl border border-white/10 bg-[#151817] p-3 transition hover:border-white/20 sm:flex-row sm:items-center sm:p-4"
              >

                {/* IMAGE */}
                <Image
                  src={workout.image}
                  alt={workout.name}
                  width={112}
                  height={80}
                  className="h-24 w-full shrink-0 rounded-xl object-cover sm:h-20 sm:w-28"
                  unoptimized
                />

                {/* WORKOUT INFO */}
                <div className="min-w-0 flex-1">

                  <h2 className="text-base font-black uppercase leading-tight sm:text-lg">
                    {workout.name}
                  </h2>

                  <p className="mt-1 text-xs text-white/50">
                    {workout.equipment}
                  </p>

                  {/* STATS */}
                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/50">

                    <span>
                      <span className="text-white/30">Duration</span>{" "}
                      <span className="font-bold text-white/80">
                        {workout.duration} min
                      </span>
                    </span>

                    <span>
                      <span className="text-white/30">Calories</span>{" "}
                      <span className="font-bold text-white/80">
                        {workout.caloriesBurned} kcal
                      </span>
                    </span>

                    <span>
                      <span className="text-white/30">Rating</span>{" "}
                      <span className="font-bold text-white/80">
                        ★ {workout.rating}
                      </span>
                    </span>

                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex shrink-0 flex-wrap items-center gap-2">

                  {/* VIEW DETAILS */}
                  <Link
                    href={`/workout/${workout.id}`}
                    className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2.5 text-xs font-bold text-black transition hover:bg-white/90"
                  >
                    View Details
                  </Link>

                  {/* MARK AS DONE */}
                  {activeTab === "plan" && (
                    <button
                      type="button"
                      onClick={() => markAsDone(workout.id)}
                      className="inline-flex items-center justify-center rounded-full bg-[#ccff00] px-4 py-2.5 text-xs font-black text-black transition hover:opacity-90"
                    >
                      ✓ Mark as Done
                    </button>
                  )}

                  {/* REMOVE */}
                  <button
                    type="button"
                    onClick={() => {
                      if (activeTab === "plan") {
                        removeFromPlan(workout.id);
                      } else {
                        removeFromSaved(workout.id);
                      }
                    }}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-red-500 text-xl font-bold leading-none text-red-500 transition hover:bg-red-500 hover:text-white"
                    aria-label="Remove workout"
                  >
                    ×
                  </button>

                </div>

              </div>

            ))}

          </div>
        )}

      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-4 py-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs text-white/40">
            © 2026 FitLog — Workout Library. Train hard, log honest.
          </p>
        </div>
      </footer>

    </main>
  );
}