import uuid from "react-uuid";
import React, {Fragment} from 'react'

export function AsCardBar(props) {
    const selected = props.selected;
    const CardMap1 = [
        ['A', "Ace"], ['1', "One"],['2', "Two"], ['3', "Three"],['4', "Four"],
        ['5', "Five"],['6', "Six"]],
        CardMap2 = [['7', "Seven"],['8', "Eight"], ['9', "Nine"],
            ['10', "Ten"],['J', "Jack"], ['Q', "Queen"],['K', "King"]];
        const Buttons1 = CardMap1.map((card) => {
            return (
                <Fragment key={card[1]}>
                    <input type="radio" className="btn-check" name='as' id={card[1]} value={card[1]}/>
                    <label className="btn btn-outline-primary" htmlFor={card[1]}>
                        {selected.length>1 ? card[0] + "'s" : card[0]}
                    </label>
                </Fragment>
            )
        });const Buttons2 = CardMap2.map((card) => {
            return (
                <Fragment key={card[1]}>
                    <input type="radio" className="btn-check" name='as' id={card[1]} value={card[1]}/>
                    <label className="btn btn-outline-primary" htmlFor={card[1]}>
                        {selected.length>1 ? card[0] + "'s" : card[0]}
                    </label>
                </Fragment>
            )
        });
    return (
        <>
            <div className="btn-group" role="group" aria-label="Basic example">
                <div className="btn-group-vertical me-2" role="group" aria-label="First group" onChange={props.handleAs.bind(this)}>
                    {Buttons1}
                </div>
                <div className="btn-group-vertical me-2" role="group" aria-label="First group" onChange={props.handleAs.bind(this)}>
                    {Buttons2}
                </div>
            </div>
        </>
    )
}
