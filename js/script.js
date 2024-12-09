//FŐOLDAL

//IN-GAME
//A térkép egy 11x11-es négyzetrács, kezdetben üres cellákkal feltöltve
let tableMatrix = []

for (let i = 0; i < 11; i++) {
    let row = []
    for (let j = 0; j < 11; j++) {
        row[j] = ""
    }
    tableMatrix[i] = row
}

//A térképen 5 fix cellában hegymezők találhatóak
const mountains = [[2, 2], [4, 9], [6, 4], [9, 10], [10, 6]]
mountains.forEach(mountain => {
    tableMatrix[mountain[0] - 1][mountain[1] - 1] = "mountain"
})

const tiles = {
    "mountain": 'img/mountain_tile.png',
    "forest": 'img/forest_tile.png',
    "farm": 'img/plains_tile.png',
    "town": 'img/village_tile.png',
    "water": 'img/water_tile.png'
}

const boardContainer = document.getElementById('board')

//A 11x11-es négyzetrács megjelenítése
function printTableMatrix() {
    boardContainer.innerHTML = ""
    for (let i = 0; i < 11; i++) {
        let row = document.createElement('div')
        row.classList.add('row')
        for (let j = 0; j < 11; j++) {
            let cell = document.createElement('div')
            cell.classList.add('cell')
            cell.id = i.toString() + "_" + j.toString()
            row.appendChild(cell)
            switch (tableMatrix[i][j]) {
                // Az 5 fix cellába hegyek helyezése
                case "mountain":
                    cell.style.backgroundImage = `url(${tiles["mountain"]})`
                    break
                case "forest":
                    cell.style.backgroundImage = `url(${tiles["forest"]})`
                    break;
                case "farm":
                    cell.style.backgroundImage = `url(${tiles["farm"]})`
                    break
                case "town":
                    cell.style.backgroundImage = `url(${tiles["town"]})`
                    break
                case "water":
                    cell.style.backgroundImage = `url(${tiles["water"]})`
                    break
            }
        }
        boardContainer.appendChild(row)
    }
}

printTableMatrix()

//Lehetséges elemtípusok
const elements = [
    {
        time: 2,
        type: 'water',
        shape: [[1, 1, 1],
        [0, 0, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'town',
        shape: [[1, 1, 1],
        [0, 0, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'forest',
        shape: [[1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1, 1, 1],
        [0, 0, 1],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1, 1, 1],
        [0, 0, 1],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'town',
        shape: [[1, 1, 1],
        [0, 1, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1, 1, 1],
        [0, 1, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'town',
        shape: [[1, 1, 0],
        [1, 0, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'town',
        shape: [[1, 1, 1],
        [1, 1, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'farm',
        shape: [[1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'farm',
        shape: [[0, 1, 0],
        [1, 1, 1],
        [0, 1, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'water',
        shape: [[1, 1, 1],
        [1, 0, 0],
        [1, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'water',
        shape: [[1, 0, 0],
        [1, 1, 1],
        [1, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1, 1, 0],
        [0, 1, 1],
        [0, 0, 1]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'water',
        shape: [[1, 1, 0],
        [1, 1, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
]

// A lehelyezendő elemek véletlenszerű megkeverése
function shuffleElements(array) {
    let currentElementIndex
    let randomElementIndex
    for (currentElementIndex = array.length; currentElementIndex > 0;) {
        randomElementIndex = Math.floor(Math.random() * (currentElementIndex))
        currentElementIndex--
        [array[currentElementIndex], array[randomElementIndex]] = [array[randomElementIndex], array[currentElementIndex]]
    }

    return array
}

let shuffledElementsArray = shuffleElements([...elements])

let currentElementIndex = 0
let currentElement = shuffledElementsArray[currentElementIndex]

let boardCellDivs = document.querySelectorAll('.cell')

function refreshCellDivs() {
    boardCellDivs = document.querySelectorAll('.cell');
}

//Egy elem lehelyezhetőségének ellenőrzése
function isPlaceable(matrix, element, row, col) {
    let offsetX
    let offsetY

    if (element.shape[1][1] === 1) {
        offsetX = -1
        offsetY = -1
    } else if (element.shape[0][0] === 1) {
        offsetX = 0
        offsetY = 0
    } else if (element.shape[0][2] === 1) {
        offsetX = 0
        offsetY = -2
    } else if (element.shape[2][0] === 1) {
        offsetX = -2
        offsetY = 0
    } else {
        offsetX = -2
        offsetY = -2
    }
    const n = matrix.length //mátrixbeli sorok száma (11)
    const m = matrix[0].length //mátrixbeli oszlopok száma (11)
    const shape = element.shape
    //elemünk tényleges kiterjedésének meghatározása
    let verticalMax = 0
    let horizontalMax = 0
    let verticalMin = 2
    let horizontalMin = 2


    for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape[i].length; j++) {
            if (shape[i][j] !== 0) {
                verticalMax = Math.max(verticalMax, i)
                verticalMin = Math.min(verticalMin, i)

                horizontalMax = Math.max(horizontalMax, j)
                horizontalMin = Math.min(horizontalMin, j)
            }
        }
    }

    // Ha az elem a térképen kívülre esik, false értékkel térek vissza
    if (row + verticalMax + offsetX >= n ||
        col + horizontalMax + offsetY >= m ||
        row + verticalMin + offsetX < 0 ||
        col + horizontalMin + offsetY < 0) {
        return false
    }

    let x = 0

    // Ha az elem lefedne már korábban lehelyezett elemet, false értéket kapunk
    for (let i = row + offsetX; i < row + 3 + offsetX; i++) {
        let y = 0
        for (let j = col + offsetY; j < col + 3 + offsetY; j++) {
            if (i >= 0 && j >= 0) {
                if ((shape[x][y] !== 0) && (matrix[i][j] !== "")) {
                    return false
                }
            }
            y++
        }
        x++
    }
    refreshCellDivs()
    return true
}

// Térképelem lehelyezése a megadott helyre
function placeCurrentElement(matrix, element, row, col) {
    let offsetX
    let offsetY

    if (element.shape[1][1] === 1) {
        offsetX = -1
        offsetY = -1
    }
    else if (element.shape[0][0] === 1) {
        offsetX = 0
        offsetY = 0
    }
    else if (element.shape[0][2] === 1) {
        offsetX = 0
        offsetY = -2
    }
    else if (element.shape[2][0] === 1) {
        offsetX = -2
        offsetY = 0
    }
    else {
        offsetX = -2
        offsetY = -2
    }

    if (isPlaceable(matrix, element, row, col)) {
        for (let i = 0; i < element.shape.length; i++) {
            for (let j = 0; j < element.shape[i].length; j++) {
                if (element.shape[i][j] === 1) {
                    matrix[row + i + offsetX][col + j + offsetY] = element.type
                }
            }
        }
        refreshCellDivs()
        return true
    }

    return false
}

let currentElementDiv = document.getElementById('currentElementDiv')

let timeOfCurrentElement = document.querySelector('#timeOfCurrentElementText')

// A lehelyezendő elem kirajzolása egy 3x3-as mátrixba
function drawCurrentShape(element) {
    currentElementDiv.innerHTML = ""
    for (let i = 0; i < element.shape.length; i++) {
        let row = document.createElement('div')
        row.classList.add('row')
        for (let j = 0; j < element.shape[0].length; j++) {
            let cell = document.createElement('div')
            row.appendChild(cell)
            switch (element.shape[i][j]) {
                case 1:
                    cell.classList.add(`${element.type}`)
                    break
                default:
                    cell.classList.add('currentElementCell')
                    break
            }

        }
        currentElementDiv.appendChild(row)
        timeOfCurrentElement.innerHTML = currentElement.time
    }
}

drawCurrentShape(currentElement)

//A jelenlegi elem megjelenítése az egérmozgatáshoz
function displayCurrentElement(element, row, col, l) {
    let offsetX
    let offsetY

    if (element.shape[1][1] === 1) {
        offsetX = -1
        offsetY = -1
    }
    else if (element.shape[0][0] === 1) {
        offsetX = 0
        offsetY = 0
    }
    else if (element.shape[0][2] === 1) {
        offsetX = 0
        offsetY = -2
    }
    else if (element.shape[2][0] === 1) {
        offsetX = -2
        offsetY = 0
    }
    else {
        offsetX = -2
        offsetY = -2
    }

    let indicesOfElement = []
    for (let i = 0; i < element.shape.length; i++) {
        for (let j = 0; j < element.shape[i].length; j++) {
            if (element.shape[i][j] === 1) {
                indicesOfElement.push((row + i + offsetX) + "_" + (col + j + offsetY))
            }
        }
    }

    for (let i = 0; i < boardCellDivs.length; i++) {
        const boardRow = parseInt(boardCellDivs[i].id.split('_')[0])
        const boardCol = parseInt(boardCellDivs[i].id.split('_')[1])
        if (indicesOfElement.includes(boardRow + "_" + boardCol)) {
            if (l) {
                boardCellDivs[i].classList.add('greenHighlighted-cell')
            }
            else {
                boardCellDivs[i].classList.add('redHighlighted-cell')
            }
        }
    }
}

const missions = [
    {
        title: "Az erdő széle",
        description: "A térképed szélével szomszédos erdőmezőidért egy-egy pontot kapsz.",
        image: "Group 69.png",
        id: 1
    },
    {
        title: "Álmos-völgy",
        description: "Minden olyan sorért, amelyben három erdőmező van, négy-négy pontot kapsz.",
        image: "Group 74.png",
        id: 2
    },
    {
        title: "Krumpliöntözés",
        description: "A farmmezőiddel szomszédos vízmezőidért két-két pontot kapsz.",
        image: "Group 70.png",
        id: 3
    },
    {
        title: "Határvidék",
        description: "Minden teli sorért vagy oszlopért 6-6 pontot kapsz.",
        image: "Group 78.png",
        id: 4
    },
    {
        title: "Fasor",
        description: "A leghosszabb, függőlegesen megszakítás nélkül egybefüggő erdőmezők mindegyikéért kettő-kettő pontot kapsz. Két azonos hosszúságú esetén csak az egyikért.",
        image: "Group 68.png",
        id: 5
    },
    {
        title: "Gazdag város",
        description: "A legalább három különböző tereptípussal szomszédos városrégióidért három-három pontot kapsz.",
        image: "Group 71.png",
        id: 6
    },
    {
        title: "Öntözőcsatorna",
        description: "Minden olyan oszlopodért, amelyben a farm illetve a vízmezők száma megegyezik, négy-négy pontot kapsz. Mindkét tereptípusból legalább egy-egy mezőnek lennie kell az oszlopban ahhoz, hogy pontot kaphass érte.",
        image: "Group 75.png",
        id: 7
    },
    {
        title: "Mágusok völgye",
        description: "A hegymezőiddel szomszédos vízmezőidért három-három pontot kapsz.",
        image: "Group 76.png",
        id: 8
    },
    {
        title: "Üres telek",
        description: "A városmezőiddel szomszédos üres mezőkért 2-2 pontot kapsz.",
        image: "Group 77.png",
        id: 9
    },
    {
        title: "Sorház",
        description: "A leghosszabb, vízszintesen megszakítás nélkül egybefüggő városmezők mindegyikéért kettő-kettő pontot kapsz.",
        image: "Group 72.png",
        id: 10
    },
    {
        title: "Páratlan silók",
        description: "Minden páratlan sorszámú teli oszlopodért 10-10 pontot kapsz.",
        image: "Group 73.png",
        id: 11
    },
    {
        title: "Gazdag vidék",
        description: "Minden legalább öt különböző tereptípust tartalmazó sorért négy-négy pontot kapsz.",
        image: "Group 79.png",
        id: 12
    }
]

function calculatePointsForMissionById(id) {
    switch (id) {
        case 1:
            return forestEdgeMission(tableMatrix)
        case 2:
            return sleepyValleyMission(tableMatrix)
        case 3:
            return potatoWateringMission(tableMatrix)
        case 4:
            return borderlandMission(tableMatrix)
        case 5:
            return treeRowMission(tableMatrix)
        case 6:
            return richTownMission(tableMatrix)
        case 7:
            return irrigationCanalMission(tableMatrix)
        case 8:
            return valleyOfTheWizardsMission(tableMatrix)
        case 9:
            return unimprovedParcelMission(tableMatrix)
        case 10:
            return rowHouseMission(tableMatrix)
        case 11:
            return oddSilagesMission(tableMatrix)
        case 12:
            return wealthyLandMission(tableMatrix)
    }
}

//Küldetések megkeverése:
let shuffledMissionsArray = shuffleElements([...missions])

//Minden játék elején ki kell választani 4 véletlenszerű küldetéskártyát (A,B,C,D)
let mission_A = shuffledMissionsArray[0]
let mission_B = shuffledMissionsArray[1]
let mission_C = shuffledMissionsArray[2]
let mission_D = shuffledMissionsArray[3]

let A_div = document.getElementById('A')
let B_div = document.getElementById('B')
let C_div = document.getElementById('C')
let D_div = document.getElementById('D')

A_div.classList.add('selected')
B_div.classList.add('selected')
C_div.classList.add('deselected')
D_div.classList.add('deselected')

//Küldetések képeinek megjelenítése
A_div.innerHTML =
    `<img src="./img/${mission_A.image}" alt="A küldetés">
                <div class="missionPoint">(<span id="Apoint"></span> pont)
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                <div id="missionA" class="active"></div><span class="missionLetter"> A</span></div>`

B_div.innerHTML =
    `<img src="./img/${mission_B.image}" alt="B küldetés">
                <div class="missionPoint">(<span id="Bpoint"></span> pont)
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                <div id="missionB" class="active"></div><span class="missionLetter"> B</span></div>`

C_div.innerHTML =
    `<img src="./img/${mission_C.image}" alt="C küldetés">
                <div class="missionPoint">(<span id="Cpoint"></span> pont)
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                <div id="missionC" class="inactive"></div><span class="missionLetter"> C</span></div>`

D_div.innerHTML =
    `<img src="./img/${mission_D.image}" alt="D küldetés">
                <div class="missionPoint">(<span id="Dpoint"></span> pont)
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                <div id="missionD" class="inactive"></div><span class="missionLetter"> D</span></div>`

let spansOfTheSite = document.querySelectorAll('span')
console.log(spansOfTheSite)

let isActiveOrNot_A = document.getElementById('missionA')
let isActiveOrNot_B = document.getElementById('missionB')
let isActiveOrNot_C = document.getElementById('missionC')
let isActiveOrNot_D = document.getElementById('missionD')

let spring = document.getElementById('spring')
let summer = document.getElementById('summer')
let autumn = document.getElementById('autumn')
let winter = document.getElementById('winter')

let pointsOfSpring = document.querySelectorAll('.td-spring')
console.log(pointsOfSpring)
let pointsOfSummer = document.querySelectorAll('.td-summer')
console.log(pointsOfSummer)
let pointsOfAutumn = document.querySelectorAll('.td-autumn')
console.log(pointsOfAutumn)
let pointsOfWinter = document.querySelectorAll('.td-winter')
console.log(pointsOfWinter)
let totalPointsOfEachMissionAndTheWholeGame = document.querySelectorAll('.total')
console.log(totalPointsOfEachMissionAndTheWholeGame)

//Évszakok eltárolása név és küldetéskártyák mezőkkel, illetve az adott évszakhoz szükséges pontokat tartalmazó "span"-ekkel 
let seasons = [
    {
        name: "Tavasz (AB)",
        missions: [mission_A, mission_B],
        divOfSeason: spring,
        divsOfMissions: [A_div, B_div],
        styleOfMissions: [isActiveOrNot_A, isActiveOrNot_B],
        points: [spansOfTheSite[1], spansOfTheSite[7], spansOfTheSite[9]],
        tableDivs: [pointsOfSpring[0], pointsOfSpring[1], pointsOfSpring[2]]
    },
    {
        name: "Nyár (BC)",
        missions: [mission_B, mission_C],
        divOfSeason: summer,
        divsOfMissions: [B_div, C_div],
        styleOfMissions: [isActiveOrNot_B, isActiveOrNot_C],
        points: [spansOfTheSite[2], spansOfTheSite[9], spansOfTheSite[11]],
        tableDivs: [pointsOfSummer[0], pointsOfSummer[1], pointsOfSummer[2]]
    },
    {
        name: "Ősz (CD)",
        missions: [mission_C, mission_D],
        divOfSeason: autumn,
        divsOfMissions: [C_div, D_div],
        styleOfMissions: [isActiveOrNot_C, isActiveOrNot_D],
        points: [spansOfTheSite[3], spansOfTheSite[11], spansOfTheSite[13]],
        tableDivs: [pointsOfAutumn[0], pointsOfAutumn[1], pointsOfAutumn[2]]
    },
    {
        name: "Tél (DA)",
        missions: [mission_A, mission_D],
        divOfSeason: winter,
        divsOfMissions: [A_div, D_div],
        styleOfMissions: [isActiveOrNot_A, isActiveOrNot_D],
        points: [spansOfTheSite[4], spansOfTheSite[7], spansOfTheSite[13]],
        tableDivs: [pointsOfWinter[0], pointsOfWinter[1], pointsOfWinter[2]]
    }
]

seasons.forEach((season) => {
    season.points.forEach((point) => {
        point.innerHTML = "0"
    })
})

seasons.forEach((season) => {
    season.divOfSeason.classList.add('deselected')
})

let totalPoints = spansOfTheSite[5]
totalPoints.innerHTML = "0"

let sumOfSeasonPoints = 0

let actualTime = 7
let currentSeasonIndex = 0
let season = seasons[currentSeasonIndex]

season.divOfSeason.classList.remove('deselected')
season.divOfSeason.classList.add('selected')
let currentSeasonNameAndMissions = spansOfTheSite[6]
currentSeasonNameAndMissions.innerHTML = season.name

spansOfTheSite[15].innerHTML = "7"

function seasonalChanges() {
    spansOfTheSite[15].innerHTML = "7"
    season.points[0].innerHTML = (calculatePointsForMissionById(season.missions[0].id) + calculatePointsForMissionById(season.missions[1].id) + checkEnclosedMountains(tableMatrix))
    season.tableDivs[2].innerHTML = season.points[0].innerHTML
    sumOfSeasonPoints += parseInt(season.points[0].innerHTML)
    totalPoints.innerHTML = sumOfSeasonPoints
    season.points[1].innerHTML = calculatePointsForMissionById(season.missions[0].id)
    season.tableDivs[0].innerHTML = season.points[1].innerHTML
    season.points[2].innerHTML = calculatePointsForMissionById(season.missions[1].id)
    season.tableDivs[1].innerHTML = season.points[2].innerHTML
    season.divOfSeason.classList.remove('selected')
    season.divOfSeason.classList.add('deselected')
    season.divsOfMissions.forEach((selectedOrDeselected) => {
        selectedOrDeselected.classList.remove('selected')
        selectedOrDeselected.classList.add('deselected')
    })
    season.styleOfMissions.forEach((activeOrNot) => {
        activeOrNot.classList.remove('active')
        activeOrNot.classList.add('inactive')
    })
    currentSeasonIndex++
    season = seasons[currentSeasonIndex]
    if (season === undefined) {
        return
    }
    season.divOfSeason.classList.remove('deselected')
    season.divOfSeason.classList.add('selected')
    currentSeasonNameAndMissions.innerHTML = season.name
    season.divsOfMissions.forEach((selectedOrDeselected) => {
        selectedOrDeselected.classList.remove('deselected')
        selectedOrDeselected.classList.add('selected')
    })
    season.styleOfMissions.forEach((activeOrNot) => {
        activeOrNot.classList.remove('inactive')
        activeOrNot.classList.add('active')
    })
    actualTime = 7
}

let gameOver = false

let popUp = document.getElementsByClassName('popUpBackground')
let reset_btn = document.getElementById('resetButton')

reset_btn.addEventListener('click', () => {
    location.reload()
})

function endOfTheGame() {
    seasons.forEach((season) => {
        season.divOfSeason.classList.remove('deselected')
        if (!season.divOfSeason.classList.contains('selected')) {
            season.divOfSeason.classList.add('selected')
        }
        season.divsOfMissions.forEach((selectedOrDeselected) => {
            selectedOrDeselected.classList.remove('deselected')
            if (!selectedOrDeselected.classList.contains('selected')) {
                selectedOrDeselected.classList.add('selected')
            }
        })
    })
}

function showPopUp() {
    let totalPointsOfEachSeason = parseInt(totalPointsOfEachMissionAndTheWholeGame[6].innerHTML) + parseInt(totalPointsOfEachMissionAndTheWholeGame[7].innerHTML) + parseInt(totalPointsOfEachMissionAndTheWholeGame[8].innerHTML) + parseInt(totalPointsOfEachMissionAndTheWholeGame[9].innerHTML)
    totalPointsOfEachMissionAndTheWholeGame[10].innerHTML = totalPointsOfEachSeason
    let allPointsForA = parseInt(pointsOfSpring[0].innerHTML) + parseInt(pointsOfWinter[0].innerHTML)
    let allPointsForB = parseInt(pointsOfSpring[1].innerHTML) + parseInt(pointsOfSummer[0].innerHTML)
    let allPointsForC = parseInt(pointsOfSummer[1].innerHTML) + parseInt(pointsOfAutumn[0].innerHTML)
    let allPointsForD = parseInt(pointsOfAutumn[1].innerHTML) + parseInt(pointsOfWinter[1].innerHTML)
    totalPointsOfEachMissionAndTheWholeGame[1].innerHTML = allPointsForA
    totalPointsOfEachMissionAndTheWholeGame[2].innerHTML = allPointsForB
    totalPointsOfEachMissionAndTheWholeGame[3].innerHTML = allPointsForC
    totalPointsOfEachMissionAndTheWholeGame[4].innerHTML = allPointsForD
    popUp[0].style.display = 'flex'
}

document.querySelector('.close').addEventListener('click', () => {
    popUp[0].style.display = 'none'
})

//Eseménykezelők a táblázathoz
boardContainer.addEventListener('click', (e) => {
    const cell = e.target
    if (!gameOver) {
        if (cell.classList.contains('cell')) {
            const row = parseInt(cell.id.split('_')[0])
            const col = parseInt(cell.id.split('_')[1])
            if (placeCurrentElement(tableMatrix, currentElement, row, col)) {
                printTableMatrix()
                refreshCellDivs()
                actualTime -= currentElement.time
                spansOfTheSite[15].innerHTML = actualTime
                console.log(actualTime)
                if (currentElementIndex < shuffledElementsArray.length) {
                    currentElementIndex++
                    currentElement = shuffledElementsArray[currentElementIndex]
                }
                /*Boda Bálint-féle értelmezés alapján történő évszakkezelés: "Túlhúzáskor az évszak véget ér, tehát
                pl. ha 6 időegységnél járunk és felhúzunk egy 2 időegységes elemet, akkor az az 1 időegység,
                ami még maradna a tavaszból elveszik és továbblépünk nyárra."*/
                if (((actualTime === 1) && (currentElement.time === 2)) || actualTime === 0) {
                    seasonalChanges()
                    if (season === undefined) {
                        //Játék vége függvény meghívása
                        gameOver = true
                        endOfTheGame()
                        setTimeout(showPopUp, 2000)
                    }
                    currentElementIndex = 0
                    shuffledElementsArray = shuffleElements([...elements])
                    currentElement = shuffledElementsArray[currentElementIndex]
                }
                drawCurrentShape(currentElement)
            }
        }
    }
})

boardContainer.addEventListener('mouseover', (e) => {
    const cell = e.target
    if (!gameOver) {
        if (cell.classList.contains('cell')) {
            const row = parseInt(cell.id.split('_')[0])
            const col = parseInt(cell.id.split('_')[1])
            if (isPlaceable(tableMatrix, currentElement, row, col)) {
                displayCurrentElement(currentElement, row, col, true)
            }
            else {
                displayCurrentElement(currentElement, row, col, false)
            }
        }
    }
})

boardContainer.addEventListener('mouseout', (e) => {
    const cells = boardContainer.getElementsByClassName('cell')
    if (!gameOver) {
        for (let i = 0; i < cells.length; i++) {
            cells[i].classList.remove('greenHighlighted-cell')
            cells[i].classList.remove('redHighlighted-cell')
        }
    }
})

//FORGATÁS
const rotate_btn = document.querySelector('#rotateButton')

function rotate(element) {
    let rotatedShape = []
    for (let i = 0; i < element.shape.length; i++) {
        rotatedShape[i] = []
        for (let j = 0; j < element.shape[i].length; j++) {
            rotatedShape[i][j] = element.shape[element.shape.length - j - 1][i]
        }
    }
    element.shape = rotatedShape
    // Az elforgatás értékének frissítése
    element.rotation = (element.rotation + 90) % 360
    drawCurrentShape(element)
}

//Elforgatás-gomb eseménykezelője
rotate_btn.addEventListener('click', () => {
    if (!gameOver) {
        rotate(currentElement)
    }
})

//TÜKRÖZÉS
const mirror_btn = document.querySelector('#mirrorButton')

function mirror(element) {
    let mirroredShape = []
    for (let i = 0; i < element.shape.length; i++) {
        mirroredShape[i] = []
        for (let j = 0; j < element.shape[i].length; j++) {
            mirroredShape[i][j] = element.shape[i][element.shape[i].length - j - 1]
        }
    }
    element.shape = mirroredShape
    // A tükrözött érték frissítése
    element.mirrored = true
    drawCurrentShape(element)
}

//Tükrözés-gomb eseménykezelője
mirror_btn.addEventListener('click', () => {
    if (!gameOver) {
        mirror(currentElement)
    }
})

//ALAPKÜLDETÉSEK
//Az erdő széle: A térképed szélével szomszédos erdőmezőidért egy-egy pontot kapsz.
function forestEdgeMission(matrix) {
    let points = 0

    const numberOfRows = matrix.length
    const numberOfCols = matrix[0].length

    for (let i = 0; i < numberOfRows; i++) {
        if (matrix[i][0] === "forest") {
            points++
        }
        if (matrix[i][numberOfCols - 1] === "forest") {
            points++
        }
    }

    for (let j = 1; j < numberOfCols - 1; j++) {
        if (matrix[0][j] === "forest") {
            points++
        }
        if (matrix[numberOfRows - 1][j] === "forest") {
            points++
        }
    }

    return points
}

//Álmos-völgy: Minden olyan sorért, amelyben (pontosan) három erdőmező van, négy-négy pontot kapsz.
function sleepyValleyMission(matrix) {
    let points = 0

    for (let i = 0; i < matrix.length; i++) {
        let forestFieldCount = 0;
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === "forest") {
                forestFieldCount++
            }
        }
        if (forestFieldCount === 3) {
            points += 4
        }
    }
    return points
}

//Krumpliöntözés: A farmmezőiddel szomszédos vízmezőidért két-két pontot kapsz.
function potatoWateringMission(matrix) {
    let points = 0

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === "farm") {
                // "baloldali szomszéd" vizsgálata
                if (j > 0 && matrix[i][j - 1] === "water") {
                    points += 2
                }
                // "felső szomszéd" ellenőrzése
                if (i > 0 && matrix[i - 1][j] === "water") {
                    points += 2
                }
                // "jobboldali szomszéd" vizsgálata
                if (j < matrix[i].length - 1 && matrix[i][j + 1] === "water") {
                    points += 2
                }
                // "alsó szomszéd" ellenőrzése
                if (i < matrix.length - 1 && matrix[i + 1][j] === "water") {
                    points += 2
                }
            }
        }
    }
    return points
}

//Határvidék: Minden teli sorért vagy oszlopért 6-6 pontot kapsz.
function borderlandMission(matrix) {
    let points = 0

    const numberOfRows = matrix.length
    const numberOfCols = matrix[0].length

    // sorok ellenőrzése
    for (let i = 0; i < numberOfRows; i++) {
        let isFull = true
        for (let j = 0; j < numberOfCols; j++) {
            if (matrix[i][j] === "") {
                isFull = false
                break
            }
        }
        if (isFull) {
            points += 6
        }
    }

    // oszlopok ellenőrzése
    for (let j = 0; j < numberOfCols; j++) {
        let isFull = true
        for (let i = 0; i < numberOfRows; i++) {
            if (matrix[i][j] === "") {
                isFull = false
                break
            }
        }
        if (isFull) {
            points += 6
        }
    }

    return points
}

//EXTRAKÜLDETÉSEK
/*Fasor: A leghosszabb, függőlegesen megszakítás nélkül egybefüggő erdőmezők mindegyikéért 
kettő-kettő pontot kapsz. Két azonos hosszúságú esetén csak az egyikért.*/
function treeRowMission(matrix) {
    let points = 0
    let maxForestLength = 0
    let currentForestLength = 0
    for (let j = 0; j < matrix[0].length; j++) {
        currentForestLength = 0
        for (let i = 0; i < matrix.length; i++) {
            if (matrix[i][j] === "forest") {
                currentForestLength++
            }
            else {
                if (currentForestLength > maxForestLength) {
                    maxForestLength = currentForestLength
                }
                currentForestLength = 0
            }
        }
        if (currentForestLength > maxForestLength) {
            maxForestLength = currentForestLength
        }
    }

    points = 2 * maxForestLength

    return points
}

/*Gazdag város: A legalább három különböző tereptípussal szomszédos városmezőidért 
három-három pontot kapsz. A város tereptípus is beleszámítható.*/
function richTownMission(matrix) {
    let points = 0

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === "town") {
                let uniqueFieldTypes = new Set()
                let neighbourCoordinates = [
                    [i, j - 1], // baloldali szomszéd
                    [i - 1, j], // felső szomszéd
                    [i, j + 1], // jobboldali szomszéd
                    [i + 1, j]  // alsó szomszéd
                ]

                for (let k = 0; k < neighbourCoordinates.length; k++) {
                    let x = neighbourCoordinates[k][0]
                    let y = neighbourCoordinates[k][1]

                    if (x >= 0 && x < matrix.length && y >= 0 && y < matrix[i].length &&
                        matrix[x][y] !== "" && matrix[x][y] !== undefined) {
                        uniqueFieldTypes.add(matrix[x][y])
                    }
                }

                if (uniqueFieldTypes.size >= 3) {
                    points += 3
                }
            }
        }
    }

    return points
}

/*Öntözőcsatorna: Minden olyan oszlopodért, amelyben a farm illetve a vízmezők száma megegyezik, 
négy-négy pontot kapsz. Mindkét tereptípusból legalább egy-egy mezőnek lennie kell az oszlopban 
ahhoz, hogy pontot kaphass érte.*/
function irrigationCanalMission(matrix) {
    let points = 0

    const numberOfRows = matrix.length
    const numberOfCols = matrix[0].length

    for (let j = 0; j < numberOfCols; j++) {
        let farmFieldCount = 0
        let waterFieldCount = 0
        for (let i = 0; i < numberOfRows; i++) {
            if (matrix[i][j] === "farm") {
                farmFieldCount++
            }
            if (matrix[i][j] === "water") {
                waterFieldCount++
            }
        }

        if (farmFieldCount >= 1 && waterFieldCount >= 1 && farmFieldCount === waterFieldCount) {
            points += 4
        }
    }

    return points
}

//Mágusok völgye: A hegymezőiddel szomszédos vízmezőidért három-három pontot kapsz.
function valleyOfTheWizardsMission(matrix) {
    let points = 0

    const numberOfRows = matrix.length
    const numberOfCols = matrix[0].length

    for (let i = 0; i < numberOfRows; i++) {
        for (let j = 0; j < numberOfCols; j++) {
            if (matrix[i][j] === "mountain") {
                let neighbourCoordinates = [
                    [i, j - 1], // baloldali szomszéd
                    [i - 1, j], // felső szomszéd
                    [i, j + 1], // jobboldali szomszéd
                    [i + 1, j]  // alsó szomszéd
                ]

                for (let k = 0; k < neighbourCoordinates.length; k++) {

                    let x = neighbourCoordinates[k][0]
                    let y = neighbourCoordinates[k][1]

                    if (x >= 0 && x < numberOfRows && y >= 0 && y < numberOfCols &&
                        matrix[x][y] !== undefined && matrix[x][y] === "water") {
                        points += 3
                    }
                }
            }
        }
    }

    return points
}

//Üres telek: A városmezőiddel szomszédos üres mezőkért 2-2 pontot kapsz.
function unimprovedParcelMission(matrix) {
    let points = 0

    const numberOfRows = matrix.length
    const numberOfCols = matrix[0].length
    for (let i = 0; i < numberOfRows; i++) {
        for (let j = 0; j < numberOfCols; j++) {
            if (matrix[i][j] === "town") {
                let neighbourCoordinates = [
                    [i, j - 1], // baloldali szomszéd
                    [i - 1, j], // felső szomszéd
                    [i, j + 1], // jobboldali szomszéd
                    [i + 1, j]  // alsó szomszéd
                ]

                for (let k = 0; k < neighbourCoordinates.length; k++) {
                    let x = neighbourCoordinates[k][0]
                    let y = neighbourCoordinates[k][1]

                    if (x >= 0 && x < numberOfRows && y >= 0 && y < numberOfCols &&
                        matrix[x][y] !== undefined && matrix[x][y] === "") {
                        points += 2
                    }
                }
            }
        }
    }

    return points
}

/*Sorház: A leghosszabb, vízszintesen megszakítás nélkül egybefüggő városmezők 
mindegyikéért kettő-kettő pontot kapsz.*/
function rowHouseMission(matrix) {
    let points = 0
    let maxVillageLength = 0
    let currentVillageLength = 0
    let countOfMaxVillageLength = 0

    for (let i = 0; i < matrix.length; i++) {
        currentVillageLength = 0
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === "town") {
                currentVillageLength++
            } else {
                if (currentVillageLength > maxVillageLength) {
                    maxVillageLength = currentVillageLength
                    countOfMaxVillageLength = 1
                }
                else if (currentVillageLength === maxVillageLength) {
                    countOfMaxVillageLength++
                }
                currentVillageLength = 0
            }
        }
        if (currentVillageLength > maxVillageLength) {
            maxVillageLength = currentVillageLength
            countOfMaxVillageLength = 1
        }
        else if (currentVillageLength === maxVillageLength) {
            countOfMaxVillageLength++
        }
    }

    points = 2 * maxVillageLength * countOfMaxVillageLength
    return points
}

//Páratlan silók: Minden páratlan sorszámú teli oszlopodért 10-10 pontot kapsz.
function oddSilagesMission(matrix) {
    let points = 0
    for (let j = 0; j < matrix[0].length; j++) {
        if ((j + 1) % 2 !== 0) {
            let isFull = true
            for (let i = 0; i < matrix.length; i++) {
                if (matrix[i][j] === "") {
                    isFull = false
                    break
                }
            }
            if (isFull) {
                points += 10
            }
        }
    }
    return points
}

//Gazdag vidék: Minden legalább öt különböző tereptípust tartalmazó sorért négy-négy pontot kapsz.
function wealthyLandMission(matrix) {
    let points = 0

    for (let i = 0; i < matrix.length; i++) {
        let allFieldTypesSet = new Set()
        for (let j = 0; j < matrix[i].length; j++) {
            allFieldTypesSet.add(matrix[i][j])
        }

        if (allFieldTypesSet.size >= 5 && allFieldTypesSet.has("water") &&
            allFieldTypesSet.has("town") && allFieldTypesSet.has("farm") &&
            allFieldTypesSet.has("mountain") && allFieldTypesSet.has("forest")) {
            points += 4
        }
    }

    return points
}

/*A hegyek teljes bekerítésével 1 plusz pont szerezhető, amelyek minden évszak
(vagy a játék) végén hozzáadódnak a pontszámunkhoz (1 pont).*/
function checkEnclosedMountains(matrix) {
    let points = 0

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === "mountain") {
                let neighbourCoordinates = [
                    [i, j - 1], // baloldali szomszéd
                    [i - 1, j], // felső szomszéd
                    [i, j + 1], // jobboldali szomszéd
                    [i + 1, j]  // alsó szomszéd
                ]

                let allNeighboursNonEmpty = true

                for (let k = 0; k < neighbourCoordinates.length; k++) {
                    let x = neighbourCoordinates[k][0]
                    let y = neighbourCoordinates[k][1]

                    if (x >= 0 && x < matrix.length && y >= 0 && y < matrix[i].length &&
                        (matrix[x][y] === "" || matrix[x][y] === undefined)) {
                        allNeighboursNonEmpty = false
                        break
                    }
                }

                if (allNeighboursNonEmpty) {
                    points += 1
                }
            }
        }
    }

    return points
}