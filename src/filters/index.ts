import moment from 'moment'

export const transTime = function(value: any, type: string): string {
    return moment(value).format(type)
}

export const transAge = function(value: any) {
    return moment(value).fromNow().replace(/\s/g, '').replace(/[a-zA-Z]+/g, '岁')
}