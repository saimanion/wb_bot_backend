import axios from 'axios';

class WildberriesAPIError extends Error {
    constructor(message) {
        super(message);
        this.name = 'WildberriesAPIError';
    }
}

/**
 * Устанавливает цены для продуктов на Wildberries.
 *
 * @param {Object} data - Входные данные.
 * @param {string} data.apiKey - Ваш API ключ Wildberries.
 * @param {Array} data.items - Список товаров для обновления, каждый объект должен содержать nmID и price.
 * @returns {Object} - JSON-ответ от API Wildberries.
 * @throws {WildberriesAPIError} - Если API возвращает ошибку.
 * @throws {Error} - Если входные данные некорректны или запрос не выполнен.
 */
async function setPricesWildberries(data) {

    const API_URL = 'https://discounts-prices-api.wildberries.ru/api/v2/upload/task';


    // Подготовка Полезной Нагрузки
    const payload = {
        data: data.items.map(item => ({
            nmID: item.nmID,
            price: item.price,
        }))
    };

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': data.apiKey
    };

    try {
        const response = await axios.post(API_URL, payload, { headers });

        // Обработка Ответов
        switch (response.status) {
            case 200:
                return response.data;
            case 208:
                throw new WildberriesAPIError("Загрузка уже существует.");
            case 400:
                throw new WildberriesAPIError("Неверный запрос. Проверьте полезную нагрузку.");
            case 401:
                throw new WildberriesAPIError("Пользователь не авторизован. Проверьте API ключ.");
            case 422:
                throw new WildberriesAPIError("Неожиданный результат.");
            case 429:
                throw new WildberriesAPIError("Слишком много запросов. Попробуйте позже.");
            default:
                throw new WildberriesAPIError(`Неожиданный статус ответа: ${response.status}`);
        }
    } catch (error) {
        if (error.response) {
            // API вернул статус-код, выходящий за пределы 2xx
            const { status, data } = error.response;
            let errorMessage = `Ошибка API: ${status}`;

            if (data && data.errorText) {
                errorMessage += ` - ${data.errorText}`;
            }

            throw new WildberriesAPIError(errorMessage);
        } else if (error.request) {
            // Запрос был сделан, но ответа не получено
            throw new WildberriesAPIError("Нет ответа от API.");
        } else {
            // Произошла ошибка при настройке запроса
            throw new Error(`Ошибка запроса: ${error.message}`);
        }
    }
}

export default setPricesWildberries;