import React, { useEffect, useState } from "react";
import Component from "components";
import isElectron from "is-electron";
import "assets/styles/view.less";
import background from "../../assets/images/view-background.svg";

const View: React.FC = () => {
  const [doorprize, setDoorprize] = useState<string>("");
  const [winners, setWinners] = useState<string[]>([]);

  useEffect(() => {
    if (isElectron()) {
      // @ts-ignore
      window.ipcRenderer.on("winners", (event, value) => {
        setWinners(value.customers);
        setDoorprize(value.doorprize);
      });
    }

    return () => {
      if (isElectron()) {
        // @ts-ignore
        window.ipcRenderer.removeListener("winners", () => {
          console.log("Winners listener removed");
        });
      }
    };
  });

  return (
    <Component.Layout>
      <div className={"public-container"}>
        <div className={"view-main"}>
          {doorprize === "" ? (
            <div>
              <img src={background} alt="" />
            </div>
          ) : (
            <div className="card">
              <div className={"header-section"}>
                <h1>
                  <b>Pemenang Dari {doorprize}</b>
                </h1>
              </div>
              <div className={"content-section"}>
                {winners.map((winner, x) => (
                  <h2 key={x}>
                    <b>{winner}</b>
                  </h2>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Component.Layout>
  );
};

export default View;
