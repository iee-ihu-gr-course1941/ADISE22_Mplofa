export function InputGroup({children,labeltext,classes}) {
    return (
        <div className={"input-group mb-3" + classes}>
            <span className="input-group-text">{labeltext}</span>
            {children}
        </div>
    )
}
