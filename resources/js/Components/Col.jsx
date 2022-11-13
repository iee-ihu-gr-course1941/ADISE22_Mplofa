export function Col({cols,Classes,children}) {
    return (
        <div className={'col-' + cols + ' ' + Classes}>
            {children}
        </div>
    )
}
