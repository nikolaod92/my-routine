import { Prisma } from "@prisma/client";
import data from "data.json";
import { prisma } from "./prisma";

const exerciseList: Prisma.ExerciseCreateWithoutDaysInput[] = data.map((exercise) => {
  const { equipment, name, target, gifUrl, bodyPart } = exercise;
  return {
    name,
    equipment,
    target,
    gif: gifUrl,
    bodyPart
  };
});

export const exercisePromises = exerciseList.map((e) => {
  return prisma.exercise.create({ data: e });
});
