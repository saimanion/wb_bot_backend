import setPricesWildberries from "./api.js";


async function priceChangerForItemsArray(itemsToUpdate){
    // Создания массивов с ценами изначальными и новыми
    const newPricesArray = itemsToUpdate.map(item => ({
        nmID: item.id,
        price: parseInt(item.price)
    }));

    const prevPricesArray = itemsToUpdate.map(item => ({
        nmID: item.id,
        price: item.prevPrice
    }));

// Установка новых цен для каждого товара
    let dataNew = {
        apiKey: 'eyJhbGciOiJFUzI1NiIsImtpZCI6IjIwMjQxMjE3djEiLCJ0eXAiOiJKV1QifQ.eyJlbnQiOjEsImV4cCI6MTc1MjM1NTg4OSwiaWQiOiIwMTk0NTRiNC00YWFmLTc0YjItYTFmYy1iNjJhYjRkZWMyMzYiLCJpaWQiOjE3OTMyMDM4LCJvaWQiOjE0MDg3NzEsInMiOjgsInNpZCI6IjEwYjYyMDM4LWFmY2YtNDIwMS04YzQwLTQ2ZTI0ZjQwZWZlOSIsInQiOmZhbHNlLCJ1aWQiOjE3OTMyMDM4fQ.TfN_-bxc_xxkRh-0pikWGM5RK15Zu1DUO1iaZVIsPkDfxxTFBzGcZHyX_uI9mYECLsIRveTSPOPqxdICObX1pQ',
        items: newPricesArray
    };

    await setPricesWildberries(dataNew)
        .then(response => {
            console.log('Успех, установили заниженные цены:', response);
        })
        .catch(error => {
            console.error('Ошибка:', error.message);
        });

// Таймер на две минуты
    console.log('ставим таймер на 2 минуты')
    await new Promise(resolve => setTimeout(resolve, 30000 )).then(() => {
        console.log('2 минуты прошли');})
// Установка начальных цен для каждого товара
    let dataPrev = {
        apiKey: 'eyJhbGciOiJFUzI1NiIsImtpZCI6IjIwMjQxMjE3djEiLCJ0eXAiOiJKV1QifQ.eyJlbnQiOjEsImV4cCI6MTc1MjM1NTg4OSwiaWQiOiIwMTk0NTRiNC00YWFmLTc0YjItYTFmYy1iNjJhYjRkZWMyMzYiLCJpaWQiOjE3OTMyMDM4LCJvaWQiOjE0MDg3NzEsInMiOjgsInNpZCI6IjEwYjYyMDM4LWFmY2YtNDIwMS04YzQwLTQ2ZTI0ZjQwZWZlOSIsInQiOmZhbHNlLCJ1aWQiOjE3OTMyMDM4fQ.TfN_-bxc_xxkRh-0pikWGM5RK15Zu1DUO1iaZVIsPkDfxxTFBzGcZHyX_uI9mYECLsIRveTSPOPqxdICObX1pQ',
        items: prevPricesArray
    };

    await setPricesWildberries(dataPrev)
        .then(response => {
            console.log('Успех, вернули цены к предыдущим значениям:', response);
        })
        .catch(error => {
            console.error('Ошибка:', error.message);
        });

// Таймер на 4 минуты
    await new Promise(resolve => setTimeout(resolve, 24000 )).then(() => {
        console.log('Установили заниженные цены на 2 минуты');})
// Завершение работы алгоритма
}
export default setPricesWildberries;
// Получение данных с фронта
// const itemsToUpdate = [
//     {
//         "id": 271237805,
//         "price": 200000,
//         "prevPrice": 500000
//     }
// ]
//
// await priceChangerForItemsArray(itemsToUpdate)
