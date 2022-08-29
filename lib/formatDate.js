
import { utc } from "moment/moment"


export const formatDate = (date) => {
    if (date) {
        return utc(date).toDate().toLocaleString('en-US', {
            'localeMatcher':'lookup',
            'timeZoneName': 'long',
            'year':'numeric',
            'month':'long',
            'day':'numeric',
            'hour':'numeric',
            'minute':'numeric'
        })
    } else
        return
}

export const formatDateAlert = (date) => {
    if (date) {
        return utc(date).toDate().toLocaleString('en-US', {
            'localeMatcher': 'lookup',

            'year':'numeric',
            'month': 'numeric',
            'day': 'numeric',
            'hour': 'numeric',
            'minute': 'numeric'
        })
    } else
        return
}
