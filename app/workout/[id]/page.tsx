"use client";

import Image from "next/image";
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

  useEffect(() => {
    if (!id) return;

    fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Workout data:", data);
        setWorkout(data);
      })
      .catch((error) => {
        console.error("Error fetching workout:", error);
      });
  }, [id]);

  if (!workout) {
    return (
      <main className="min-h-screen bg-black p-10 text-white">
        Loading workout...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">

        {/* Image */}
        <div className="overflow-hidden rounded-3xl">
          <Image
            src={workout.image}
            alt={workout.name}
            width={800}
            height={800}
            className="h-full min-h-[400px] w-full object-cover"
            unoptimized
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">

          <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-lime-400">
            WORKOUT DETAILS
          </p>

          <h1 className="mb-5 text-4xl font-black uppercase md:text-5xl">
            {workout.name}
          </h1>

          <p className="mb-6 leading-7 text-gray-400">
            {workout.description}
          </p>

          {/* Tags */}
          <div className="mb-6 flex flex-wrap gap-2">
            {workout.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="rounded-full border border-lime-400 px-4 py-2 text-sm text-lime-400"
              >
                {muscle}
              </span>
            ))}
          </div>

          {/* Specs */}
          <div className="grid grid-cols-2 gap-3">

            <div className="rounded-xl bg-zinc-900 p-4">
              <p className="text-sm text-gray-500">Equipment</p>
              <p className="mt-1 font-semibold">{workout.equipment}</p>
            </div>

            <div className="rounded-xl bg-zinc-900 p-4">
              <p className="text-sm text-gray-500">Difficulty</p>
              <p className="mt-1 font-semibold">{workout.difficulty}</p>
            </div>

            <div className="rounded-xl bg-zinc-900 p-4">
              <p className="text-sm text-gray-500">Sets</p>
              <p className="mt-1 font-semibold">{workout.sets}</p>
            </div>

            <div className="rounded-xl bg-zinc-900 p-4">
              <p className="text-sm text-gray-500">Reps</p>
              <p className="mt-1 font-semibold">{workout.reps}</p>
            </div>

            <div className="rounded-xl bg-zinc-900 p-4">
              <p className="text-sm text-gray-500">Duration</p>
              <p className="mt-1 font-semibold">{workout.duration} min</p>
            </div>

            <div className="rounded-xl bg-zinc-900 p-4">
              <p className="text-sm text-gray-500">Calories</p>
              <p className="mt-1 font-semibold">
                {workout.caloriesBurned} kcal
              </p>
            </div>

          </div>

          {/* Rating */}
          <div className="mt-5 text-lg">
  ⭐ {workout.rating}
</div>

<div className="mt-6 flex flex-col gap-3 sm:flex-row">
  <button
    onClick={() => {
      const savedPlan = JSON.parse(
        localStorage.getItem("fitlog-plan") || "[]"
      );

      if (savedPlan.length >= 5) {
        alert("Today's Plan is full. Maximum 5 workouts.");
        return;
      }

      const alreadyAdded = savedPlan.some(
        (item: Workout) => item.id === workout.id
      );

      if (alreadyAdded) {
        alert("This workout is already in Today's Plan.");
        return;
      }

      localStorage.setItem(
        "fitlog-plan",
        JSON.stringify([...savedPlan, workout])
      );

      alert("Added to Today's Plan!");
    }}
    className="rounded-full bg-[#ccff00] px-6 py-3 font-bold text-black transition hover:bg-lime-300"
  >
    Add to Today's Plan
  </button>

  <button
    onClick={() => {
      const savedWorkouts = JSON.parse(
        localStorage.getItem("fitlog-saved") || "[]"
      );

      const alreadySaved = savedWorkouts.some(
        (item: Workout) => item.id === workout.id
      );

      if (alreadySaved) {
        alert("This workout is already saved.");
        return;
      }

      localStorage.setItem(
        "fitlog-saved",
        JSON.stringify([...savedWorkouts, workout])
      );

      alert("Saved for later!");
    }}
    className="rounded-full border border-white/20 px-6 py-3 font-bold text-white transition hover:border-[#ccff00] hover:text-[#ccff00]"
  >
    Save for Later
  </button>
</div>
        </div>
      </div>
    </main>
  );
}