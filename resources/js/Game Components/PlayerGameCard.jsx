export function PlayerGameCard({Player,Me,NextPlayer}) {
    return (
        <>
            <div className="card mb-2">
                <div className="card-body text-center">
                    <img src={'Images/UserIcon.png'} alt="avatar"
                         className="rounded-circle img-fluid"/>
                    <h5 className="my-3">{Player.name + (Me ? ' (You) ' : '')}</h5>
                    <p className="text-muted mb-1">Points : {Player.points}</p>
                    <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                    { !Me ? <div className="d-flex justify-content-center mb-2">
                        <button type="button" className="btn btn-primary">Follow</button>
                        <button type="button" className="btn btn-outline-primary ms-1">Message</button>
                    </div> : ''
                    }
                </div>
            </div>
            { !Me ?
            <>
                <h4 className={'mt-5'} style={{color:"blue"}}>Currently Playing</h4>
                <h6>{NextPlayer}</h6>
            </>
                :''}
        </>
    )
}
