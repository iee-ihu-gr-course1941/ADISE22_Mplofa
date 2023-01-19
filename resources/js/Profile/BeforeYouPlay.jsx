export function BeforeYouPlay() {
    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
                <div className="modal-content">
                    <div className="modal-header text-center">
                        <h1 className="modal-title fs-5 w-100 text-success" id="exampleModalLabel">Before you play!</h1>
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
                                                When using your mobile, you might face visual bugs due to scaling.
                                            </strong>
                                        </p>
                                        {/*<p>*/}
                                        {/*    <strong>*/}
                                        {/*        If you happen to come across such issues, please report them using the bug submission form,*/}
                                        {/*        stating your mobile phone model, as well as where you encountered this bug in the game.*/}
                                        {/*    </strong>*/}
                                        {/*</p>*/}
                                    </div>
                                </div>
                                <div className="card mb-3">
                                    <div className={'card-header bg-transparent'}>
                                        <h5 className={'text-info'}>
                                            Before you start playing, you have to join a Room.
                                        </h5>
                                    </div>
                                    <div className="card-body">
                                        <p>

                                        </p>
                                        <p>
                                            You will need a second person to play against, so be sure to
                                            <strong> let your friends know about this game so you can enjoy it together.</strong>
                                        </p>
                                        <p>
                                            You can either create a new Room, or join an existing one!
                                        </p>
                                        <p>
                                            If you can't see any active Rooms trying reloading, or create a new one!
                                        </p>
                                        <p>
                                            Once you are in a room, you have to wait for an opponent to join the room.
                                        </p>
                                        <p>
                                            When there are 2 players in the Room, you can click "Ready" whenever and wait for the game to begin.
                                        </p>
                                    </div>
                                </div>
                                {/*<div className="card">*/}
                                {/*    <div className={'card-header bg-transparent'}>*/}
                                {/*        <h5 className={'text-info'}>*/}
                                {/*            Rules*/}
                                {/*        </h5>*/}
                                {/*    </div>*/}
                                {/*    <div className="card-body">*/}
                                {/*        <p>*/}
                                {/*            <strong> The rules are actually pretty simple.</strong>*/}
                                {/*        </p>*/}
                                {/*        <p>*/}
                                {/*           <strong>The goal is to get rid of your cards.</strong>*/}
                                {/*        </p>*/}
                                {/*        <p>*/}
                                {/*            If there are no cards in the stack and it is your turn to play, simply pick any number of cards,*/}
                                {/*            state what you are about to play using the bar that will show on your screen when you select any cards,*/}
                                {/*            and click "Play Cards"*/}
                                {/*        </p>*/}
                                {/*        <p>*/}
                                {/*            If what you stated, doesn't match the cards you actually played, that means you bluffed.*/}
                                {/*        </p>*/}
                                {/*        <p>*/}
                                {/*            The other player can either choose to pass his turn, or call a bluff on you revealing the cards.*/}
                                {/*            In that case you take your cards back and it's the other player's turn to play.*/}
                                {/*        </p>*/}
                                {/*        <p>*/}
                                {/*            If you haven't bluffed and the other player calls a bluff on you,*/}
                                {/*            he gets all the cards from the stack and it is your turn to play.*/}
                                {/*        </p>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
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
