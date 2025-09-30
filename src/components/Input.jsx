export function Input({inputType, inputName, inputId, placeholder, handleChange, value}) {
    
    if (inputType === "text") {
        return (
            <input 
                type={inputType} 
                name={inputName} 
                id={inputId}
                autoComplete='off'
                placeholder={placeholder}
                onChange={handleChange}
                value={value}
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