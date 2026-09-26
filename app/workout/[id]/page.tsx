"use client";

import Image from "next/image";
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
  const [workout, setWorkout] = useState<Workout | null>(null);

  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/fitlog/1")
      .then((res) => res.json())
      .then((data) => {
        setWorkout(data);
      });
  }, []);

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

          <div className="mt-5 text-lg">
            ⭐ {workout.rating}
          </div>

        </div>
      </div>
    </main>
  );
}