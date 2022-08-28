

const formatDate=(date) => {
    if (date) {

        const splittedDate = date.split('T')
        const formattedDate = new Date(`${splittedDate[0]} ${splittedDate[1]}Z`)
        // console.log(formattedDate.toLocaleString())
        return formattedDate.toLocaleString()
    } else
        return 
}

export default formatDate