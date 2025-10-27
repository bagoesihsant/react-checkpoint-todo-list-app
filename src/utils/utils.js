const regex = new RegExp(/^[a-zA-Z0-9 ]+$/)

export function validateUserInput(string) {
    if (!string.trim()) return { cond: false, message: "Input can't be empty." }

    if (!regex.test(string)) return { cond: false, message: "Input contain prohibited character(s)." }

    return { cond: true, message: '' }
}

export function getLatestId(tasks){
    return (tasks.length < 1) ? 0 : tasks.reduce((prev, current) => (prev && prev.id > current.id) ? prev.id : current.id, {}) 
}

export function setLocalItems(key, value){
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.log(`Error serving to localStorage: ${error}`);
    }
}

export function getLocalItems(key) {
    try {
        const items = localStorage.getItem(key);
        return items ? JSON.parse(items) : undefined;
    } catch (error) {
        console.log(`Error serving to localStorage: ${error}`);
    }
}