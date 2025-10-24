export function Button({children, btnType, btnClass, handleClick}){

    return (
        <button type={btnType} className={btnClass} onClick={handleClick}>
            {children}
        </button>
    )

}