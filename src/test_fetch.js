// Название файла: fetchRequest.js
https://www.wildberries.ru/catalog/296643961/detail.aspx?targetUrl=GP
(async () => {
    try {
        let dataToBackend = {
            cycles: 1,
            items: [
                {
                price: 300000,
                prevPrice: 500000,
                id: 271237805
            }
            ]
        }
        const response = await fetch('http://213.139.211.2:3000/start-task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToBackend),
        });

        if (!response.ok) {
            throw new Error(`Ошибка сервера: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Ответ сервера:', data);
    } catch (error) {
        console.error('Произошла ошибка:', error);
    }
})();
