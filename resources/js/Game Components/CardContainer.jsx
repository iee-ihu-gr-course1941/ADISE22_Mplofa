import Card from "./Card";
import styled from "styled-components";
import {useMemo, useState} from "react";
import {Pagination} from "../Components/Pagination";
import uuid from "react-uuid";

export const Hand = styled.div`
  justify-items:center;
  display:  grid;
  grid-gap: 0.5rem;
  grid-template-columns: repeat(52, 25px);
  transition: grid-template-columns 0.5s;
  position:relative;
  grid-column-start:4;
  // margin-left:12%;
  padding-left:150px;
  // color:red;
`;

export default function CardContainer(props) {
    const { compare } = Intl.Collator('en-US');
    const cards = props.cards.sort((a, b) => compare(a.id, b.id)),
    [currentPage, setCurrentPage] = useState(1),
        PageSize=10,
        [totalCount, setTotalCount] = useState(cards.length),
         currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return cards.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]),
    pagination = props.Enemy ? '' :  <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}/>;
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
            return <Card key={card.id} card={props.Enemy ? CardMap.get(53): CardMap.get(card.id)} size={'1'} Enemy={props.Enemy}
            color={card.color} cardId={card.id} handleClick={props.onSelectCard} selectedCards={props.selectedCards}></Card>;
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
