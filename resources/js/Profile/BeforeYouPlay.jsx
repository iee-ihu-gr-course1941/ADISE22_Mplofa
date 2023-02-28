import {Link} from "@inertiajs/inertia-react";

export function BeforeYouPlay() {
    return (
        <div className="modal fade w-100 mx-auto" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header text-center">
                        <h1 className="modal-title fs-5 w-100 text-success" id="exampleModalLabel">
                            Before you play!
                        </h1>
                    </div>
                    <div className="modal-body">
                        <div className="row text-center justify-content-center">
                            <div className="col">
                                <div className="card mb-3">
                                    <div className={'card-header bg-transparent'}>
                                        <h5 className={'text-danger'}>
                                            This game is in early development stage.
                                        </h5>
                                    </div>
                                    <div className="card-body">
                                        <p>
                                            <strong>
                                                It is strongly recommended that you try this game using either a laptop or a desktop.
                                            </strong>
                                        </p>
                                        <p>
                                            <strong>
                                                When using your mobile, be advised that the responsiveness of the game to different devices
                                                is under heavy development.
                                                <br></br>
                                                <br></br>
                                                Devices with known responsiveness issues :
                                                <br></br>
                                                ( during gameplay only )
                                                <br></br>
                                                <br></br>
                                                - Galaxy Fold
                                                <br></br>
                                                - Surface Duo
                                            </strong>
                                        </p>
                                        <p className={'fst-italic mt-2'}>
                                            * Please report any responsiveness abnormalities you come across using the Bug Submission Form.
                                            ( No matter which device you're playing on! )
                                        </p>
                                        {/*<p>*/}
                                        {/*    <strong>*/}
                                        {/*        Using Incognito Mode might cause some issues while loading the css files.*/}
                                        {/*        It is recommended that you do not use incognito mode.*/}
                                        {/*    </strong>*/}
                                        {/*</p>*/}
                                        {/*<p>*/}
                                        {/*    <strong>*/}
                                        {/*        If for whatever reason you are using Incognito Mode, when you first log in, please reload the page*/}
                                        {/*        to mitigate such problems.*/}
                                        {/*    </strong>*/}
                                        {/*</p>*/}
                                        {/*<p>*/}
                                        {/*    <strong>*/}
                                        {/*        If you happen to come across such issues, please report them using the bug submission form,*/}
                                        {/*        stating your mobile phone model, as well as where you encountered this bug in the game.*/}
                                        {/*    </strong>*/}
                                        {/*</p>*/}
                                    </div>
                                </div>
                                {/*<div id="list-example" className="list-group mb-3">*/}
                                {/*    <a className="list-group-item list-group-item-action text-success" href="#Rules"><h6>Rules</h6></a>*/}
                                {/*</div>*/}
                                <div className="card mb-3">
                                    <div className={'card-header bg-transparent'}>
                                        <h5 className={'text-info'}>
                                            Join a Room.
                                        </h5>
                                    </div>
                                    <div className="card-body">
                                        <p>
                                            You will need a second person to play against, so be sure to
                                            <strong> let your friends know about this game so you can enjoy it together.</strong>
                                        </p>
                                        <p>
                                            <input className={'form-control text-center text-success'} type={'text'} disabled={true} readOnly={true}
                                               value={'https://bluff-game.com/'}/>
                                        </p>
                                        <p>
                                            You can either create a new Room, or join an existing one!
                                        </p>
                                        <p>
                                            If you can't see any active Rooms trying clicking "Reload", or create a new one!
                                        </p>
                                        <p>
                                            Once you are in a room, after approximately 3-4 seconds the "Ready" button will get clickable.
                                        </p>
                                        <p>
                                           You will then have to wait for an opponent to join the room.
                                        </p>
                                        <p>
                                            When there are 2 players in the Room, you can click "Ready" whenever
                                            ( you can click the button even if an opponent hasn't yet joined if it is active )
                                            and wait for the game to begin.
                                        </p>
                                    </div>
                                </div>
                                <div className="card" id={'Rules'}>
                                    <div className={'card-header bg-transparent'}>
                                        <h5 className={'text-info'}>
                                            Rules
                                        </h5>
                                    </div>
                                    <div className="card-body">
                                       <h4 id={'Goal'}>
                                           The goal is to get rid of your cards.
                                       </h4>
                                        <p>
                                            If there are no cards in the stack and it is your turn to play, simply pick any number of cards,
                                            state what you are about to play using the bar that will show on your screen when you select any cards,
                                            and click "Play Cards"
                                        </p>
                                        <h5 id={'Bluffing'}>
                                            Bluffing
                                        </h5>
                                        <p>
                                            If what you stated, doesn't match all the cards you actually played, that means you bluffed.
                                        </p>
                                        <p>
                                            The other player can either choose to pass his turn, or call a bluff on you revealing the cards.
                                            In that case you take your cards back and it's the other player's turn to play.
                                        </p>
                                        <p>
                                            If you haven't bluffed and the other player calls a bluff on you,
                                            he gets all the cards from the stack and it is your turn to play.
                                        </p>
                                        <h5 id={'Passing_Turn'}>
                                            Passing Turn
                                        </h5>
                                        <p>
                                            If you do not want play any cards, you can simply pass your turn.
                                            ( You can only pass your turn when there are cards in the stack. )
                                            The next player can either choose to pass his turn as well,
                                            clearing the stack, or play more cards.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer text-center justify-content-center">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Got It</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
