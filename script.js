document.addEventListener('DOMContentLoaded', function () {
    const interstateSelect = document.getElementById('interstate-select');
    const startButton = document.getElementById('start-button');
    const gameArea = document.querySelector('.game-area');
    const directionElement = document.getElementById('direction');
    const optionElements = [document.getElementById('option1'), document.getElementById('option2')];
    
    // Example data structure, replace with actual data processing
    const interstatesData = {
        '90': [{ exit: '4th Ave S', milepost: 1.9 }, { exit: 'I-5', milepost: 2 }, { exit: 'Corwin', milepost: 2.6 }, { exit: 'EB Rainier Ave', milepost: 3.3 }, { exit: 'WB Rainier Ave', milepost: 3.33 }, { exit: '77th Ave', milepost: 6.8 }, { exit: 'Island Crest', milepost: 6.9 }, { exit: '82nd Ave', milepost: 7.3 }, { exit: 'East Mercer Wy', milepost: 8 }, { exit: 'Bellevue Way', milepost: 9 }, { exit: 'I-405', milepost: 9.7 }, { exit: '148th/150th', milepost: 11 }, { exit: '164th', milepost: 13 }, { exit: 'W Lake Samm', milepost: 15 }, { exit: 'SR-900', milepost: 17 }, { exit: 'Front St/E Lake Samm', milepost: 18 }, { exit: 'E Sunset Way', milepost: 20 }, { exit: 'High Point/270th/272nd', milepost: 22 }, { exit: 'Preston/SE 82nd', milepost: 25 }, { exit: 'SR-18', milepost: 27 }],
        '405': [{ exit: '112th Pl SE/Lake WA Blvd', milepost: 9 }, { exit: 'Coal Creek Pkwy', milepost: 10 }, { exit: 'I-90', milepost: 11 }, { exit: 'SE 8th', milepost: 12 }, { exit: 'NE 4th', milepost: 13.5 }, { exit: 'NE 8th', milepost: 13.8 }, { exit: 'NE 12th', milepost: 14.1 }, { exit: 'SR-520', milepost: 14.8 }, { exit: 'NE 70th', milepost: 17 }, { exit: 'NE 85th', milepost: 18 }, { exit: 'NE 116th', milepost: 19.8 }, { exit: 'NE 124th', milepost: 20.3 }, { exit: 'NE 160th', milepost: 22.6 }, { exit: 'SR-522', milepost: 23.5 }, { exit: 'NE 195th', milepost: 24.4 }],
	'5': [{ exit: '54th Ave E', milepost: 137 }, { exit: 'SR-18/S 348th', milepost: 142 }, { exit: 'S 320th', milepost: 143 }, { exit: 'S 272nd', milepost: 147 }, { exit: 'SR 516', milepost: 149 }, { exit: 'S 200th/Military', milepost: 151 }, { exit: 'S 188th/Orillia', milepost: 152 }, { exit: 'Klickitat', milepost: 153 }, { exit: 'SR-518/I-405', milepost: 154 }, { exit: 'Interurban', milepost: 156 }, { exit: 'SR-900/MLK', milepost: 157 }, { exit: 'Boeing Access/E Marginal', milepost: 158 }, { exit: 'Swift/Albro', milepost: 161 }, { exit: 'Corson', milepost: 161.2 }, { exit: 'Michigan', milepost: 161.5 }, { exit: 'Spokane/Columbian', milepost: 162.8 }, { exit: 'I-90/Dearborn', milepost: 164.6 }, { exit: 'James/Columbia/Pike/Cherry/University', milepost: 165.8 }, { exit: 'Seneca/Express Lanes', milepost: 165.9 }, { exit: 'E Olive Wy', milepost: 166.3 }, { exit: 'Mercer/Fairview', milepost: 167 }, { exit: 'Harvard/Roanoke', milepost: 167.5 }, { exit: 'Lakeview/SR-520', milepost: 168 }, { exit: 'NE 50th/NE 45th', milepost: 169.4 }, { exit: 'NE 65th/Ravenna', milepost: 170.3 }, { exit: 'SR-522/Lake City Way/NE 70th', milepost: 170.8 }, { exit: 'NE 85th', milepost: 171.5 }, { exit: 'Northgate Way/1st Ave NE', milepost: 172.7 }, { exit: 'Roosevelt Way', milepost: 173.8 }, { exit: 'NE 145th/SR523', milepost: 174.5 }, { exit: 'NE 175th', milepost: 175.83 }, { exit: 'NE 205th/Ballinger/SR 104', milepost: 177.75 }, { exit: '236th', milepost: 178.3 }, { exit: '220th St SW', milepost: 179.2 }, { exit: '204th/44th Ave W', milepost: 180.1 }, { exit: 'I-405/SR-522', milepost: 182 }],
        // Add more interstates and their data here...
    };

    // Load interstates into the select dropdown
    function loadInterstates() {
        for (const interstate in interstatesData) {
            const option = document.createElement('option');
            option.value = interstate;
            option.textContent = `Interstate ${interstate}`;
            interstateSelect.appendChild(option);
        }
    }

    // Start the game with selected interstate
    startButton.addEventListener('click', function () {
        const selectedInterstate = interstateSelect.value;
        gameArea.style.display = 'block';
        directionElement.textContent = parseInt(selectedInterstate) % 2 === 0 ? 'East' : 'North';
        displayRandomExits(selectedInterstate);
    });

    // Display two random exits
    function displayRandomExits(interstateNumber) {
        const exits = interstatesData[interstateNumber];
        const [exit1, exit2] = getRandomPair(exits);

        optionElements[0].textContent = exit1.exit;
        optionElements[1].textContent = exit2.exit;
        optionElements[0].className = 'option';
        optionElements[1].className = 'option';

        optionElements.forEach((element, index) => {
            element.onclick = () => checkAnswer(exit1, exit2, index);
        });
    }

    // Get two random exits
    function getRandomPair(exits) {
        let index1 = Math.floor(Math.random() * exits.length);
        let index2;
        do {
            index2 = Math.floor(Math.random() * exits.length);
        } while (index1 === index2);
        return [exits[index1], exits[index2]];
    }

    // Check the player's answer
    function checkAnswer(exit1, exit2, selectedIndex) {
        const correctIndex = exit1.milepost > exit2.milepost ? 0 : 1;
        optionElements[selectedIndex].className = selectedIndex === correctIndex ? 'option correct' : 'option incorrect';

        setTimeout(() => {
            displayRandomExits(interstateSelect.value);
        }, 3000);
    }

    loadInterstates();
});
