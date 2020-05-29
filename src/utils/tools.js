export const genDigitToken = (n = 4) => {   // n digit
    const r = Math.random() * (10 ** (n+1))
    // console.log('genDigitToken', r)
    return Math.ceil(r).toString().substr(n)
}

export const addSeconds = (date, seconds) => {
    return new Date(date.getTime() + seconds * 1000)
}
