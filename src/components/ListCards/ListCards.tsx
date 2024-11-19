import { Card, CardProps } from "../Card";

export interface ListCardsProps {
  title: string;
  cards: CardProps[];
  cols?: 1 | 2 | 3 | 4;
  className?: string;
}

export const ListCards: React.FC<ListCardsProps> = ({
  title,
  cards,
  cols = 1,
  className = "",
}) => {
  // Determine the responsive grid classes based on the number of columns
  const gridClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Title */}
      <h1 className="text-2xl font-bold">{title}</h1>

      {/* Responsive Grid for Cards */}
      <div className={`grid gap-6 ${gridClasses[cols]}`}>
        {cards.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            description={card.description}
            buttons={card.buttons}
            shadow={card.shadow || "md"}
          />
        ))}
      </div>
    </div>
  );
};
