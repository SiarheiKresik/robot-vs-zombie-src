export default class RecordsTable {
    constructor(state) {
        this.state = state;
        this.recordsTableField = document.getElementById('records-table-field');
        this.showButton = document.getElementById('records-button');
        this.hideButton = document.getElementById('hide-records-button');
        this.recordsTable = document.getElementById('records-table');
        this.init();
    }

    init() {
        this.showButton.addEventListener('click', () => {
            this.fillRecords();
            this.showRecords();
        })

        this.hideButton.addEventListener('click', () => {
            this.hideRecords();
        })
    }

    fillRecords() {
        this.recordsTable.innerHTML = '';
        const records = JSON.parse(localStorage.getItem('records')) ? JSON.parse(localStorage.getItem('records')) : [];  
        const headerRow = document.createElement('tr');
        const nameHeadCell = document.createElement('th');
        const scoreHeadCell = document.createElement('th');
        nameHeadCell.textContent = 'Name';
        scoreHeadCell.textContent = 'Score';
        headerRow.appendChild(nameHeadCell);
        headerRow.appendChild(scoreHeadCell);
        this.recordsTable.appendChild(headerRow);
        records.forEach((element, i) => {
            const row = document.createElement('tr');
            const nameCell = document.createElement('td');
            const scoreCell = document.createElement('td');
            nameCell.textContent = records[i].name;
            scoreCell.textContent = records[i].score;
            row.appendChild(nameCell);
            row.appendChild(scoreCell);
            this.recordsTable.appendChild(row);
        });        
    }

    showRecords() {        
        this.recordsTableField.classList.remove('hidden');
    }

    hideRecords() {
        this.recordsTableField.classList.add('hidden');
    }
    
    setRecords() {
        let user = {
            name: this.state.robot.name,
            score: this.state.robot.score
        };
        let records = JSON.parse(localStorage.getItem('records')) ? JSON.parse(localStorage.getItem('records')) : [];
        if (records.length < 10) {
            records.push(user);
            records.sort((a,b) => {
                return b.score - a.score;
            });                 
        } else if (records[9].score < user.score) {
            records.push(user);
            records.sort((a,b) => {
                return b.score - a.score;
            })
            records.pop();
        }
        localStorage.setItem('records', JSON.stringify(records));
    }
}