import Card from "./Card";
import styled from "styled-components";
import {useContext, useEffect, useMemo, useState} from "react";
import {Pagination} from "../Components/Pagination";
import uuid from "react-uuid";
import {CardsContext} from "../Contexts/CardsContext";
import {SelectedCardsContext} from "../Contexts/SelectedCardsContext";
import {StackContext} from "../Contexts/StackContext";

export const Hand = styled.div`
  justify-items:center;
  display:  grid;
  grid-gap: 0.5rem;
  grid-template-columns: repeat(10, 45px);
  transition: grid-template-columns 0.5s;
  position:relative;
  grid-column-start:4;
  // margin-left:12%;
  padding-left:150px;
  // color:red;
`;

export default function CardContainer(props) {
    const { compare } = Intl.Collator('en-US');
    const { myCards , setMyCards } = useContext(CardsContext);
    const { enemyCards , setEnemyCards } = useContext(CardsContext);
    const { selectedCards, onSelectCard } = !props.Enemy && useContext(SelectedCardsContext);
    const sortedCards = myCards ? myCards.sort((a, b) => compare(a.id, b.id)) : enemyCards.sort((a, b) => compare(a.id, b.id));
    const [changed,setChanged] = useState(false);
    const [currentPage, setCurrentPage] = useState(1),
        PageSize=10,
        [totalCount, setTotalCount] = useState(myCards ? myCards.length : enemyCards.length),
         currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return sortedCards.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]),
    pagination = props.Enemy ? '' :  <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}/>,
    stackSize = useContext(StackContext);

    useEffect(()=> {
        setChanged(!changed);
        setCurrentPage(2);
    },[myCards ? myCards : enemyCards]);

    useEffect(()=> {
        setCurrentPage(1);
    },[changed]);

    const CardMap = new Map([
        // Spades
        [1, "🂡"], [2, "🂢"], [3, "🂣"], [4, "🂤"], [5, "🂥"], [6, "🂦"], [7, "🂧"], [8, "🂨"], [9, "🂩"], [10, "🂪"], [11, "🂫"],
        [12, "🂭"], [13, "🂮"],
        // Hearts
        [14, "🂱"], [15, "🂲"], [16, "🂳"], [17, "🂴"], [18, "🂵"], [19, "🂶"], [20, "🂷"], [21, "🂸"], [22, "🂹"], [23, "🂺"],
        [24, "🂻"], [25, "🂽"], [26, "🂾"],
        // Diamonds
        [27, "🃁"], [28, "🃂"], [29, "🃃"], [30, "🃄"], [31, "🃅"], [32, "🃆"], [33, "🃇"], [34, "🃈"], [35, "🃉"], [36, "🃊"],
        [37, "🃋"], [38, "🃍"], [39, "🃎"],
        // Clubs
        [40, "🃑"], [41, "🃒"], [42, "🃓"], [43, "🃔"], [44, "🃕"], [45, "🃖"], [46, "🃗"], [47, "🃘"], [48, "🃙"], [49, "🃚"],
        [50, "🃛"], [51, "🃝"], [52, "🃞"],

        [53, "🂠"]
    ]);
    const Cards = currentTableData.map((card)=> {
        if(card==='Empty')
            return <Card key={uuid()} card={CardMap.get(53)} size={'1'} Enemy={props.Enemy}
                         color={card.color} cardId={card.id}></Card>;
        else
            return <Card cardObject={card} key={card.id} card={props.Enemy ? CardMap.get(53): CardMap.get(card.id)} size={'1'} Enemy={props.Enemy}
            color={card.color} cardId={card.id} handleClick={props.onSelectCard} selectedCards={selectedCards}></Card>;
    });
    return (
        <>
            <div className={'col col-' + (props.Enemy ? 4 : 5)}>
                <Hand>
                    {Cards}
                </Hand>
            </div>
            <div className='col col-2 text-center'>
                {pagination}
            </div>
        </>
    )
}
