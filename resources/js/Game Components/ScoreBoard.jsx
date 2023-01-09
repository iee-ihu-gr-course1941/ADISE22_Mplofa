import {PlayerGameCard} from "./PlayerGameCard";
import {useContext} from "react";
import {TurnContext} from "../Contexts/TurnContext";
import {RoomContext} from "../Contexts/RoomContext";

export function ScoreBoard({Players}) {
    const Player1 = Players.Player1,
        Player2 = Players.Player2;
    return (
        <div className="offcanvas offcanvas-end" data-bs-backdrop="static" tabIndex="-1" id="staticBackdrop"
             aria-labelledby="staticBackdropLabel">
            <div className="offcanvas-header">
                <h2 className="offcanvas-title" id="staticBackdropLabel">Players in the Room</h2>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body p-5">
                <div>
                    <div className={'row align-items-start h-50 text-center'}>
                        <PlayerGameCard Player={Player2}></PlayerGameCard>
                    </div>
                    <div className={'row align-items-end h-50'}>
                        <PlayerGameCard Player={Player1} Me={true}></PlayerGameCard>
                    </div>
                </div>
            </div>
        </div>
    )
}
