import moment from 'moment'

export const transTime = function(value: any, type: string) {
    return moment(value).format(type)
}