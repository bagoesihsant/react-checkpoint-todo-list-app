export function Input({
    inputType, 
    inputName, 
    inputId, 
    placeholder, 
    value, 
    handleChange, 
    handleKeyDown,
    checked,
}) {
    
    if (inputType === "text") {
        return (
            <input 
                type={inputType} 
                name={inputName} 
                id={inputId}
                autoComplete='off'
                placeholder={placeholder}
                value={value}
                autoCorrect="off"
                spellCheck='false'
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
        )
    } else {
        return (
            <input 
                type={inputType} 
                name={inputName} 
                id={inputId}
                onChange={handleChange}
                checked={checked}
            />
        )
    }

}