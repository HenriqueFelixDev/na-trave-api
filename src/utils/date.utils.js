import moment from 'moment'

export function getStartAndEndDateOfDay(date) {
    const momentDate = moment(date).parseZone()
    const startDate = momentDate.startOf('day').toDate()
    const endDate = momentDate.endOf('day').toDate()

    return {
        startDate,
        endDate
    }
}

export function dateIsBeforeNow(date) {
    const now = moment()
    const momentDate = moment(date)

    return momentDate.isBefore(now)
}