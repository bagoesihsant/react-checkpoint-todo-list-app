export function Button({children, btnType, btnClass}){

    return (
        <button type={btnType} className={btnClass}>
            {children}
        </button>
    )

}