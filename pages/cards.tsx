import { Toolbar, Content } from "../components/Toolbar";
import { LightCards } from "../cards/Light";
import { DarkCards } from "../cards/Dark";

export default function Cards() {
  return (
    <div>
      <Toolbar />
      <Content>
        {LightCards.slice(0, 30).map((card) => {
          return (
            <img
              src={card.front.imageUrl}
              key={card.id}
              style={{ height: "330px", display: "inline", margin: "10px" }}
            ></img>
          );
        })}
      </Content>
    </div>
  );
}