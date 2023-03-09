let array;
const loadData = (dataLimit) =>{
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res => res.json())
    .then(data => {
      displayData(data.data.tools, dataLimit)
      array = data.data.tools
    })
  }

    const displayData = (cards, dataLimit) =>{
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    const showAll = document.getElementById('show-all');
    if(dataLimit && cards.length > 6){
      cards = cards.slice(0, 6);
        showAll.classList.remove('d-none')
    }
    else{
        showAll.classList.add('d-none')
    }

    cards.forEach(card =>{
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col')
        cardDiv.innerHTML = `
        <div class="card rounded card h-100">
          <img src="${card.image}" class="card-img-top img-fluid rounded-3 p-3" alt="...">
          <div class="card-body">
            <h5 class="card-title">Features</h5>
            <ol>
              ${card.features[0] ? `<li>${card.features[0]}</li>` : ''}
              ${card.features[1] ? `<li>${card.features[1]}</li>` : ''}
              ${card.features[2] ? `<li>${card.features[2]}</li>` : ''}
              ${card.features[3] ? `<li>${card.features[3]}</li>` : ''}
            </ol>
          </div>
          <div class="card-footer bg-transparent d-flex justify-content-between align-items-center">
            <div>
                <h5 class="card-title">${card.name}</h5>
                <small class="text-muted"><i class="fa-solid fa-calendar-days"> ${card.published_in}</i></small>
            </div>
            <div>
            <i onclick="loadCardDetails('${card.id}')" type="button" class="fa-solid fa-arrow-right text-danger alert alert-danger rounded-circle p-3" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
            </div>
          </div>
        </div>
        `
        cardContainer.appendChild(cardDiv)
        toggleSpinner(false)
    })
}

const toggleSpinner = isLoading =>{
    const spinnerSection = document.getElementById('spinner');
    if(isLoading){
        spinnerSection.classList.remove('d-none')
    }
    else{
        spinnerSection.classList.add('d-none')
    }
}

document.getElementById('btn-show-all').addEventListener('click', function(){
  loadData()
})

const loadCardDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayCardDetails(data.data)
}

const displayCardDetails = card =>{
    const cardDetails = document.getElementById('card-details');
    cardDetails.innerHTML = `
    <div class=" border border-danger rounded alert alert-danger px-2">
                    <h3>${card.description}</h3>
                    <div class="d-flex justify-content-around flex-sm-row mt-3">
                      <div class="bg-white rounded-3">
                        <h5 class="text-success text-center">${(card.pricing !== null && card.pricing[0].price) ? card.pricing[0].price +'<br>Basic' : 'Free of Cost<br>/Basic'}</h5>
                      </div>
                      <div class="bg-white rounded-3">
                        <h5 class="text-warning text-center">${(card.pricing !== null && card.pricing[1].price) ? card.pricing[1].price +'<br>Pro': 'Free of Cost<br>/Pro'}</h5>
                      </div>
                      <div class="bg-white rounded-3">
                        <h5 class="text-danger text-center">${(card.pricing !== null && card.pricing[2].price) ? card.pricing[2].price + '<br>Enterprise': 'Free of Cost <br>/Enterprise'}</h5>
                      </div>
                    </div>

                    <div class="d-flex justify-content-around align-items-center mt-3">
                      <div class="">
                        <h4 class="">Features</h4>
                        <ul>
                          <li>${card.features[1].feature_name}</li>
                          <li>${card.features[2].feature_name}</li>
                          <li>${card.features[3].feature_name}</li>
                        </ul>
                      </div>
                      <div class="">
                        <h4 class="">Integrations</h4>
                        <ul>
                          <li>${(card.integrations !== null && card.integrations[0]) ? card.integrations[0] : 'No Data Found'}</li>
                          <li>${(card.integrations !== null && card.integrations[1]) ? card.integrations[1] : 'No Data Found'}</li>
                          <li>${(card.integrations !== null && card.integrations[2]) ? card.integrations[2] : 'No Data Found'}</li>
                          <li>${(card.integrations !== null && card.integrations[3]) ? card.integrations[3] : 'No Data Found'}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="">
                  <div class="card position-relative h-100">
                  <img src="${card.image_link[0]}" class="card-img-top img-fluid rounded-3" alt="...">
                  <div class=" bg-danger position-absolute top-0 end-0 rounded">
                    ${card.accuracy.score !== null ? `<span class="badge text-center text-white">${card.accuracy.score*100}% Accuracy</span>` : ''}
                  </div>
                  <div class="card-body">
                    <h5 class="card-title">${(card.input_output_examples !== null && card.input_output_examples[0].input) ? card.input_output_examples[0].input : 'Can you give any example?'}</h5>
                    <p class="card-text">${(card.input_output_examples !== null && card.input_output_examples[0].output) ? card.input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}</p>
                    
                  </div>
                </div>
                  </div>
                  `
    }

function sortByDate(cards){
  cards.sort((a,b) => new Date(a.published_in) - new Date(b.published_in))
  displayData(cards)
  // displayAllCard(cards)
}

document.getElementById('btn-sort').addEventListener('click', function(){
  sortByDate(array)
})
toggleSpinner(true)
loadData(6)