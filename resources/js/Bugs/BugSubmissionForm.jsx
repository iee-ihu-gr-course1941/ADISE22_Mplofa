export function BugSubmissionForm() {
    console.log('Rendered Submission');
    return (
        <>
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-4 align-content-center">
                        <div>
                            <img src={'Images/BugIcon.png'} className="img-fluid rounded-start" alt="..."></img>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">Submit Bugs</h5>
                            <p className="card-text">This is a wider card with supporting text below as a natural
                                lead-in to additional content. This content is a little bit longer.</p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>
                 <div className="modal fade" id="BugSubmission" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                     <div className="modal-dialog">
                         <div className="modal-content">
                             <div className="modal-header">
                                 <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                             </div>
                             <div className="modal-body">
                                 ...
                             </div>
                             <div className="modal-footer">
                                 <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                 <button type="button" className="btn btn-primary">Save changes</button>
                             </div>
                         </div>
                     </div>
                 </div>
            </div>
        </>
    )
}
