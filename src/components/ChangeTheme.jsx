// Import Context
import { useTheme, useThemeDispatch } from '../contexts/TasksProvider';

export function ChangeTheme(){
    const theme = useTheme();
    const themeDispatch = useThemeDispatch();

    function handleThemeChange(){
        themeDispatch({type: 'invert'});
    }
    
    return (
        <div className='toggle-container'>
            <div className="switch-button">
                <input 
                    type="checkbox" 
                    id="toggle" 
                    onChange={handleThemeChange} 
                    checked={
                        theme === 'dark' ? true : false
                    }
                />
                <label id="switch" htmlFor="toggle">
                    <div id="circle"></div>
                    <div id="text">Light mode</div>
                    <div id="text2">Dark mode</div>
                </label>
            </div>
        </div>
    )
}