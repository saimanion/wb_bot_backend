import express from 'express'
import cors from 'cors'
const app = express();
import priceChangerForItemsArray from './priceChangerForItemsArray.js'
app.use(express.json()); // для парсинга JSON из body
app.use(cors({ origin: '*' }));

// Допустим, это «долгая» функция
async function longRunningTask(params) {
    // console.log('Начинаем долгую задачу, кол во циклов:', params.cycles);
    // console.log('Кол-во товаров', params.items);
    // let paramsModified = JSON.parse(params);
    // console.log('Данные с фронта: ',params)
    const array = params.items
    const cycles = params.cycles
    // console.log('Массив: ',array)
    // console.log('Кол-во циклов: ',cycles)
    for (let i = 0; i < params.cycles; i++) {
        try {
            console.log('Выполняем цикл:', i );
            await priceChangerForItemsArray(array)
            console.log('Запускаем задержку 4 минуты')
            await new Promise((resolve) => setTimeout(resolve, 240000));
            console.log('Задержка 4 минуты закончилась')
        }catch (e){console.log(e);}

    }

    console.log('Долгая задача завершена');
}

app.post('/start-task', (req, res) => {
    const params = req.body; // Получаем данные из запроса

    // Запускаем «долгую» функцию в фоне

    longRunningTask(params)
        .then(() => {
            // Когда задача завершится, что-то логируем или записываем в БД
            console.log('Фоновая задача успешно выполнилась');
        })
        .catch((err) => {
            console.error('Ошибка в фоновой задаче:', err);
        });

    // Возвращаем ответ сразу, не дожидаясь завершения задачи
    res.json({ message: 'Задача запущена' });
});

app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});
