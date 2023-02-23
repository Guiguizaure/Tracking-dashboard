//DOM elements
const gridContainer = document.querySelector('.grid-container');
const timeCardContainer = document.querySelector('.time-card-container');

//JSON
const getJson = "data.json"



//Create Time Cards
async function getCardsElements(timeframeFrequency) {

    //get JSON data
    const response = await fetch(getJson)
    const data = await response.json();

    
    let gridNumber = 1;
    let html = '';


    data.forEach((data) => {

        html += `
        <div class="time-card">
            <!-- colored card + icone -->
            <div class="time-card__style grid-${gridNumber++}"> 
            <object data="${data.icone}" alt=""> </object>
            
                <!-- card containing main info -->
                <div class="card-info">
    
                    <div class="card-info__header">
                        <h2 class="card-info__header--title">${data.title}</h2>
                        <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="#BBC0FF" fill-rule="evenodd"/></svg>
                    </div>
                    <div class="card-info__time">
                        <div class="card-info__current-time">${data.timeframes[timeframeFrequency].current}hrs</div>
                        <div class="card-info__previous-time">Last ${data.timeframes[timeframeFrequency].date} - ${data.timeframes[timeframeFrequency].previous}hrs</div>
                    </div>
                </div>
            </div>
        </div>
        
        `
    })
    return html;
}


//Create function that will add the created cards to the DOM
async function renderCards(timeframeFrequency){

    let cardElements = await getCardsElements(timeframeFrequency);
    timeCardContainer.innerHTML = cardElements;
}


//timeframe change depending on which button we click on
const btnContainer = document.querySelector('.btn-container');
const timeBtn = document.querySelectorAll('.time-btn');


for (let i = 0; i < timeBtn.length; i++){
    timeBtn[i].addEventListener('click', function(e) {

        let timeframeFrequency = e.target.id;

        renderCards(timeframeFrequency);
    })
}

//add or remove active class from buttons
timeBtn.forEach(e => {
    e.addEventListener('click', function(){
        btnContainer.querySelector('.is-active').classList.remove('is-active');
        e.classList.add('is-active');
    })
})

//Allow the daily setting to be on when the page is load
window.addEventListener('DOMContentLoaded', () => {
    renderCards("daily");
});








