export const generateRandomObjects = (
  count: number
): Array<Record<string, unknown>> => {
  const actionsList = ["view", "edit", "delete", "custom"];
  const categories = ["old", "new", "archived", "featured"];
  const shadows = ["sm", "md", "lg", "xl"];

  const getRandomArrayItem = <T>(arr: T[]): T =>
    arr[Math.floor(Math.random() * arr.length)];

  const getRandomDate = (): string => {
    const start = new Date(2020, 0, 1).getTime(); // January 1, 2020
    const end = new Date().getTime(); // Current date
    const randomTimestamp = new Date(
      start + Math.random() * (end - start)
    ).toISOString();
    return randomTimestamp;
  };

  return Array.from({ length: count }, (_, index) => ({
    title: `Card ${index + 1}`,
    description: `This is card number ${index + 1}.`,
    actions: [...actionsList],
    category: getRandomArrayItem(categories),
    shadow: getRandomArrayItem(shadows),
    createdAt: getRandomDate(),
    updatedAt: getRandomDate(),
  }));
};
