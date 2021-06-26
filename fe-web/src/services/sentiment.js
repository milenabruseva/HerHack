export function getSentiment(stock) {
    return fetch(
        `http://164.90.163.136/app/sentiment?searchquery=${stock}&startdate=2021-01-24%2002:33:15&enddate=2021-01-27%2002:33:15`,
    ).then((data) => data.json())
}
