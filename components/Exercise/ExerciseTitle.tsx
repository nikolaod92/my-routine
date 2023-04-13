function ExerciseTitle({ name }: { name: string }) {
  return (
    <p className="font-semibold text-xs truncate capitalize hover:bg-red-500">
      {name}
    </p>
  )
}

export default ExerciseTitle
