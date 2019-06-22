import moment from 'moment'

export const transTime = function(value: any, type: string): string {
    return moment(value).format(type)
}