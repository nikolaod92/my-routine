import data from "data.json";

export const exerciseList = data.map((exercise) => {
  const { equipment, name, target, gifUrl, bodyPart } = exercise;
  return {
    name,
    equipment,
    target,
    gif: gifUrl,
    bodyPart
  };
});

export const unique = [...new Map(exerciseList.map((item) => [item.name, item])).values()];
