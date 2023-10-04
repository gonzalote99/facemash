const imgDictMale = {
  'Will': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/TechCrunch_Disrupt_2019_%2848834434641%29_%28cropped%29.jpg/330px-TechCrunch_Disrupt_2019_%2848834434641%29_%28cropped%29.jpg',
  'Leonardo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Leonardo_Dicaprio_Cannes_2019.jpg/330px-Leonardo_Dicaprio_Cannes_2019.jpg',
  'Johnny': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Johnny_Depp-2757_%28cropped%29.jpg/330px-Johnny_Depp-2757_%28cropped%29.jpg',
  'Dwayne': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Dwayne_Johnson_Hercules_2014_%28cropped%29.jpg/330px-Dwayne_Johnson_Hercules_2014_%28cropped%29.jpg',
}

const imgDictFemale = {
  'Scarlett': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Scarlett_Johansson_by_Gage_Skidmore_2_%28cropped%2C_2%29.jpg/330px-Scarlett_Johansson_by_Gage_Skidmore_2_%28cropped%2C_2%29.jpg',
    'Jennifer': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Jennifer_Lawrence_in_2018.png/330px-Jennifer_Lawrence_in_2018.png',
    'Megan': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Megan_Fox_%286133014224%29.jpg/330px-Megan_Fox_%286133014224%29.jpg',
    'Mila': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Mila_Kunis_2018_%28cropped_2%29.jpg/330px-Mila_Kunis_2018_%28cropped_2%29.jpg',
}

const imgDictMixed = {
  ...imgDictMale,
  ...imgDictFemale
};


let rnkLen = [Object.keys(imgDictMixed).length,Object.keys(imgDictMale).length,Object.keys(imgDictFemale).length];
let category = 0;
let rnkList = [];
let pointsDict = {};


function sort(reset, categ) {
  let temp;
  const len = rnkLen[categ];
  if(reset) {
    for(i = 0; i < len - 1; i++) {
      for(let j = i + 1; j < len; j++) {
        if(rnkList[i][categ] > rnkList[j][categ] ) {
          temp = rnkList[i][categ];
          rnkList[i][categ] = rnkList[j][categ];
          rnkList[j][categ] = temp; 
          
        }
      }
    }
  }
  else {
    for(let i = 0; i < len - 1; i++) 
    for(let j = 0; j < len - i - 1; j++)
    if(pointsDict[rnkList[j][categ]][categ] <= pointsDict[rnkList[j + 1][categ]][categ]) {
      if((pointsDict[rnkList[j][categ]][categ] === pointsDict[rnkList[j + 1][categ]][categ]) && (rnkList[j][categ] <= rnkList[j + 1][categ])) 
      continue;

      temp = rnkList[j][categ];
      rnkList[j][categ] = rnkList[j + 1][categ];
      rnkList[j + 1][categ] =  temp 
    }
  }
}


let i = 0;
for (key in imgDictMixed) {
  pointsDict[key] = [0, 0, 0];
  rnkList.push([key]);
  if(i < rnkLen[1]) 
  rnkList[i].push(key);
  else
  rnkList[i].push(key)
  i++;
  if(i === rnkLen[1])
  i = 0
}


sort(true, 0);
sort(true, 1);
sort(true, 2);

function setData() {
  localStorage.setItem('pointsDict', JSON.stringify(pointsDict));
}



function getData() {
  for(key in localStorage['poinstDict']) {
    if(localStorage['pointsDict'][key] !== [0, 0, 0]) {
      pointsDict = JSON.parse(localStorage['pointsDict']);
      return;
    }
  }

  setData();

}

getData();

function clrRnk(categ = -1) {
let rnkListElement = document.querySelector('#rnkList');
while(rnkListElement.firstElementChild !== null)
rnkListElement.firstElementChild.remove();

if(categ !== -1) {
  for(let i = 0; i < rnkLen[categ]; i++) {
    pointsDict[rnkList[i][categ]][categ] = 0;
  }
}
}


function displayRnk() {
  let rnkListElement = document.querySelector('#rnkList');
  let newElement;

  clrRnk();
  for(let i = 0; i < rnkLen[category]; i++) {
    newElement = document.createElement('li');
    newElement.innerText = `${rnkList[i][category]}\n(${pointsDict[rnkList[i][category]][category]})`;
    rnkListElement.appendChild(newElement)
  }
}

let img1 = document.querySelector('#img1');
let img2 = document.querySelector('#img2');

function getIndex(rnkList, item, categ) {
  for(let i = 0; i < rnkLen[categ]; i++) {
    if(rnkList[i][categ] === item) 
      return i;
    
  }
    return -1;
  


}

function loadNxt(clicked = img1, other = img2) {
  let img1Index = -1;
  let img2Index = -1;
  let clickedIndex = getIndex(rnkList, img1.lastElementChild.innerText, category);
  let otherIndex = getIndex(rnkList, img2.lastElementChild.innerText, category);

  do {
    img1Index = Math.floor(Math.random() * rnkLen[category]);
    img2Index = Math.floor(Math.random() * rnkLen[category]);
  } while(img1Index === img2Index || img1Index === clickedIndex || img1Index === otherIndex || img2Index === clickedIndex || img2Index === otherIndex)

  img1.innerHTML = `<img src="${imgDictMixed[rnkList[img1Index][category]]}" alt=""><div>${rnkList[img1Index][category]}</div>`;
  img2.innerHTML = `<img src="${imgDictMixed[rnkList[img2Index][category]]}" alt=""><div>${rnkList[img2Index][category]}</div>`;
}

loadNxt();

img1.addEventListener('click', function() {
  pointsDict[`${img1.lastElementChild.innerText}`][category] += 10;
  pointsDict[`${img2.lastElementChild.innerText}`][category] -= 5;
  sort(false, category);
  displayRnk();
  setData();
  loadNxt(img1 ,img2)
})

img2.addEventListener('click', function() {
  pointsDict[`${img2.lastElementChild.innerText}`][category] += 10;
  pointsDict[`${img1.lastElementChild.innerText}`][category] -= 5;
  sort(false, category);
  displayRnk();
  setData();
  loadNxt(img2 ,img1)
})

let mixedBtn = document.querySelector('#mixed');
let maleBtn = document.querySelector('#male');
let femaleBtn = document.querySelector('#female');


function setBtns(btn1, btn2, btn3) {
  btn1.style.color = 'darked';
  btn2.style.color = 'darkblue';
  btn3.style.color = 'darkblue';
}

setBtns(mixedBtn, maleBtn, femaleBtn);

mixedBtn.addEventListener('click', function() {
  category = 0;
  sort(false, category);
  displayRnk();
  loadNxt();
  setBtns(mixedBtn ,maleBtn, femaleBtn );
})

maleBtn.addEventListener('click', function() {
  category = 1;
  sort(false, category);
  displayRnk();
  loadNxt();
  setBtns(maleBtn, mixedBtn, femaleBtn );
})

femaleBtn.addEventListener('click', function() {
  category = 2;
  sort(false, category);
  displayRnk();
  loadNxt();
  setBtns(femaleBtn ,mixedBtn ,maleBtn );
})


let rnkBtn = document.querySelector('#rnkBtn');
let rnkBox = document.querySelector('#rnkBox');
let categoryBtn = document.querySelector('#categoryBtn');
let categoryBox = document.querySelector('#categoryBox');
let rnkVisBool = false;
let categoryVisBool = false;



rnkBtn.addEventListener('click', function() {
  if(rnkVisBool) {
    rnkBox.style.display = 'none';
    rnkVisBool = false;
  }

  else {
    rnkBox.style.display = 'initial';
    rnkVisBool = true;
  }
} )


categoryBtn.addEventListener('click', function() {
  if(categoryVisBool) {
    categoryBox.style.display = 'none';
    categoryVisBool = false;
  }
  else {
    categoryBox.style.display = 'initial';
    categoryVisBool = true;
  }
});

let clrBtn = document.querySelector('#clrBtn');
clrBtn.addEventListener('click', function() {
  clrRnk(category);
  sort(true, category);
  displayRnk();
  setData();
})

