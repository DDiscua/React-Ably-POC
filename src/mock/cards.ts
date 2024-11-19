import { CardProps } from "../components/Card";

export const CARD_DATA: CardProps[] = [
  {
    title: "Card 1",
    description: "This is the first card.",
    actions: ["view", "edit", "delete", "custom"],
    shadow: "lg",
  },
  {
    title: "Card 2",
    description: "This is the second card.",
    actions: ["view", "edit"],
    shadow: "sm",
  },
  {
    title: "Card 3",
    description: "This is the third card with no buttons.",
    actions: ["view", "delete"],
  },
];
