export const genDigitToken = (n = 4) => {   // n digit
    const r = (Math.random() + 0.1) * (10 ** n)
    console.log('genDigitToken', r)
    return Math.ceil(r).toString().substr(0, n)
}

export const addSeconds = (date, seconds) => {
    return new Date(date.getTime() + seconds * 1000)
}
