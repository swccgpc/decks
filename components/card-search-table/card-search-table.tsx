import { useState } from "react";
import { CardIcon } from "./card-icon";
import Link from "next/link";
import { Card } from "./card.interface";

function CardRow({
  card,
  rowColor,
  onMouseOver,
  onMouseOut,
}: {
  card: Card;
  rowColor: string;
  onMouseOver: (event: any) => void;
  onMouseOut: () => void;
}) {
  return (
    <div
      style={{ cursor: "pointer", display: "flex", backgroundColor: rowColor }}
    >
      <div
        onMouseEnter={onMouseOver}
        onMouseOut={onMouseOut}
        style={{
          width: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CardIcon style={{ pointerEvents: "none", width: "20px" }} />
      </div>
      <div style={{ flex: 40 }}>
        <Link href={`/card/${card.id}`}>{card.front && card.front.title}</Link>
      </div>
      <div style={{ flex: 10 }}>{card.side}</div>
      <div style={{ flex: 10 }}>{card.front.type}</div>
      <div style={{ flex: 10 }}>{card.set}</div>
    </div>
  );
}

function CardHover({
  card,
  location,
}: {
  card: Card;
  location: { x: number; y: number };
}) {
  if (!location) {
    return null;
  }
  return (
    <div
      style={{
        pointerEvents: "none",
        position: "absolute",
        top: location.y,
        left: location.x,
      }}
    >
      <img src={card.front.imageUrl} style={{ height: "400px" }}></img>
    </div>
  );
}

export async function getCards() {
  return (await import("../../cards/cards.json")).default;
}

export function CardSearchTable() {
  const [nameFilter, setNameFilter] = useState(null);
  const [cardHover, setCardHover] = useState({ card: null, location: null });
  const [cards, setCards] = useState(null);
  if (cards === null) {
    getCards().then(setCards);
    return <div>Loading Cards</div>;
  }
  return (
    <div>
      <CardHover {...cardHover} />
      <div>
        <input
          onKeyUp={(e) => setNameFilter((e.target as any).value)}
          placeholder="Card Name"
        ></input>
      </div>

      <div style={{ display: "flex" }}>
        <div style={{ fontWeight: "bold", width: "50px" }}>Card</div>
        <div
          style={{
            fontWeight: "bold",
            flex: 40,
            display: "flex",
            alignItems: "center",
          }}
        >
          Name
        </div>
        <div style={{ fontWeight: "bold", flex: 10 }}>Side</div>
        <div style={{ fontWeight: "bold", flex: 10 }}>Type</div>
        <div style={{ fontWeight: "bold", flex: 10 }}>Set</div>
      </div>
      <div style={{ border: "1px solid grey" }}>
        {cards
          .filter((card) => {
            if (!nameFilter) {
              return true;
            }
            return card.front.title
              .toLowerCase()
              .includes(nameFilter.toLowerCase());
          })
          .slice(0, 30)
          .map((card, i) => {
            return (
              <CardRow
                key={card.id}
                rowColor={i % 2 ? "#f5f5f5" : "white"}
                card={card}
                onMouseOver={(e) =>
                  setCardHover({
                    card: card,
                    location: { x: e.pageX, y: e.pageY },
                  })
                }
                onMouseOut={() => setCardHover({ card: null, location: null })}
              />
            );
          })}
      </div>
    </div>
  );
}
