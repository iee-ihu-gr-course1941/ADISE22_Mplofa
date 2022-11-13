import {PlayerGameCard} from "./PlayerGameCard";

export function ScoreBoard({myCards,enemyCards,Players,NextPlayer}) {
    const Player1 = Players.Player1,
        Player2 = Players.Player2;
    console.log(Player1,Player2);
    return (
        <>
            <div className={'row align-items-start h-50 text-center'}>
                <PlayerGameCard Player={Player2} NextPlayer={NextPlayer === Player1.id ? 'You' : Player2.name}></PlayerGameCard>
            </div>
            <div className={'row align-items-end h-50'}>
                <PlayerGameCard Player={Player1} Me={true}></PlayerGameCard>
            </div>
        </>
    )
}
