const regex = new RegExp(/^[a-zA-Z0-9 ]+$/)

export function validateUserInput(string) {
    if (!string.trim()) return { cond: false, message: "Input can't be empty." }

    if (!regex.test(string)) return { cond: false, message: "Input contain prohibited character(s)." }

    return { cond: true, message: '' }
}