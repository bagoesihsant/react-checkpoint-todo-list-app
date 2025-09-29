export function Input({inputType, inputName, inputId, placeholder}) {
    
    if (inputType === "text") {
        return (
            <input 
                type={inputType} 
                name={inputName} 
                id={inputId}
                autoComplete='off'
                placeholder={placeholder}
            />
        )
    } else {
        return (
            <input 
                type={inputType} 
                name={inputName} 
                id={inputId}
            />
        )
    }

}