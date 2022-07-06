import day from 'dayjs'


const DAY_FROMAT = (date, string = 'YYYY-MM-DD HH:mm:ss') => {
    return day(date).format(string)
}

const DAY_UNIX = (date) => {
    return day(date).valueOf()
}



export {
    DAY_FROMAT,
    DAY_UNIX
}