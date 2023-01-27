
const btn = document.querySelector('button');   
const  resultDiv = document.querySelector('div');

function useRequest(url, callback) {
    const request = new XMLHttpRequest();
           
    request.open('GET', url);
       
    request.onload = function () {
        if (request.status != 200) {
            console.log(`Статус ответа: ${request.status}`);
        } else {
            const result = JSON.parse(request.response);
            if (callback) {
                callback(result);
            }
        }   
    };

    request.onerror = function() {
        console.log(`Ошибка! Статус ответа: ${request.status}`);
    };

    request.send();
}

function displayResult(responseData) {
    let cards = '';

    responseData.forEach(item => {
        const cardBlock = `
            <div class="card">
                <img src="${item.download_url}" class="card-img">
                <p>${item.author}</p>
            </div>
        `;
        cards += cardBlock;
    });

    resultDiv.innerHTML = cards;
}

function handler() {
    const value = document.querySelector('input').value;
    if (value < 1 || value > 10) {
    resultDiv.textContent = 'число вне диапазона от 1 до 10';
    } else {
        useRequest(`https://picsum.photos/v2/list?limit=${value}`, displayResult);
    }
}

btn.addEventListener('click', handler);








