const select = document.getElementById("megye");
const countyName = document.getElementById("county-name");
const hiddenElements = document.querySelector(".hidden");
const addCityBtn = document.querySelector(".varos-button");
const citiesDiv = document.querySelector(".county-cities");

let reults;

const getApiResults = (async() => {

  const apiResult = await fetch("https://probafeladat-api.zengo.eu/api/all_states", 
  { headers: { 'token' : '99dbf50e04ee0d561bdcb58ceb9311a8'} });
  const counties = await apiResult.json();
  if(counties && counties.data) {    
    counties.data.forEach(el => {
      const option = document.createElement("option");
      option.value = el.id;
      option.text = el.name;
      select.appendChild(option);
    });
  }
})();

// https://probafeladat-api.zengo.eu/api/state_city/

const handleSelectChange = async () => {
  const value = select.options[select.selectedIndex].text;
  const city_id = select.options[select.selectedIndex].value;
  if(value === "Válasszon") {
    hiddenElements.style.display = "none";
  } else {
    countyName.innerHTML = value;
    hiddenElements.style.display = "block";

    const citiesList = document.querySelector(".cities-list");
    if(citiesList) {
      citiesList.remove();

    }
    const ul = document.createElement("ul")
    ul.className= "cities-list";

    const formData = new FormData();
    formData.append('state_id',city_id);
    const apiResult = await fetch("https://probafeladat-api.zengo.eu/api/state_city", 
    { method:"POST", headers: { 'token' : '99dbf50e04ee0d561bdcb58ceb9311a8'}, body : formData});
    cities = await apiResult.json();
    if(cities && cities.data) {
      cities.data.forEach(el => {
        const li = document.createElement("li");
        li.innerHTML = el.name;
        ul.appendChild(li);
         
      })
      
      citiesDiv.appendChild(ul); 
    }
  }
}
select.addEventListener("change",handleSelectChange);


const handleAddCity = async () => {
  const urlencoded = new encodeURI();
  urlencoded.append()
  const apiResult = await fetch("https://probafeladat-api.zengo.eu/api/state_city", 
    { method:"PUT", headers: { 'token' : '99dbf50e04ee0d561bdcb58ceb9311a8'}, body : urlencoded});
  
};

addCityBtn.addEventListener("click", handleAddCity);


// if(apiResult)
//   .then(function(response) {
//       return response.json();
//     }).then(function(data) {
//       console.log(data);
//       let text = "";
//       const megye = document.getElementById("megye");
//       data.forEach(el => {
//         const option = document.createElement("option");
//         option.value = el.name;
//         option.text = el.name;
//         selectInputs.appendChild(option);
//       });

//     }).catch(function(err) {
//       console.log(err);
//     });


const varosInput = document.querySelector(".varos-input");
const varosButton = document.querySelector(".varos-button");
const varosList = document.querySelector(".varos-list");

varosButton.addEventListener("click", addVaros);
varosList.addEventListener('click', deleteCheck);

function addVaros(event){
  event.preventDefault();
  const varosDiv = document.createElement("div");
  varosDiv.classList.add("varos");

  const newVaros = document.createElement("li");
  newVaros.innerText = varosInput.value;
  newVaros.classList.add("varos-item");
  varosDiv.appendChild(newVaros);
  //töröl
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="far fa-trash-alt"></i>';
  deleteButton.classList.add("delete-btn");
  varosDiv.appendChild(deleteButton);
  //módosít
  const modButton = document.createElement("button");
  modButton.innerHTML = '<i class="fas fa-check"></i>';
  modButton.classList.add("mod-btn");
  varosDiv.appendChild(modButton);
  //mégse
  const exitButton = document.createElement("button");
  exitButton.innerHTML = '<i class="fas fa-times"t></i>';
  exitButton.classList.add("exit-btn");
  varosDiv.appendChild(exitButton);

  varosList.appendChild(varosDiv);

  varosInput.value = "";
}

function deleteCheck(event){
  const item = event.target;
  if(item.classList[0] === "delete-btn"){
    const varos = item.parentElement; 
    varos.remove();
  }
}

