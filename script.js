// script.js

let lintelData = [];

// Global job info object to store and reuse between export/print
let jobInfo = {
    client: 'DearClient',
    job: 'Project XXXX\nNZS3604 Lintel Table',
    jobNo: 'SS111-22',
    calcBy: '',
    date: new Date().toLocaleDateString('en-NZ', { month: 'short', year: '2-digit' }),
    sheetNo: ''
};

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('searchForm');
    const diagramDiv = document.querySelector('.diagram');
    const diagramTitle = document.querySelector('.diagram h2');
    loadCSV((data) => {
        lintelData = data;
        console.log('CSV data loaded:', lintelData.length, 'rows');
    });

    // Object to store information for each input
    const inputInfo = {
        name: { 
            title: "Lintel Name", 
            text: "Input the name of the lintel.",
            hasImage: false
        },
        span: { 
            title: "Lintel Span", 
            text: "Input the clear span of the lintel, which is clear distance between supports meamsured along the lintel.",
            image: "images/span-diagram.png",
            imageTexts: "",
            hasImage: true
        },
        loadDimension: { 
            title: "Load Dimension", 
            text: `Input the load dimension. This is the measure of weight contributing to the lintel. It shall be a integer value between 1 to 6. See the examples in the figures below.<br>
                   Use the greater dimension while the load dimensions of the roof and floor is different. 
                    `,
            images: ["images/load-dim-1.png", "images/load-dim-2.png", "images/load-dim-3.png","images/load-dim-4.png"],
            imageTexts: [
                `<b>For members located at A and B:</b> <br>load dimension = Span/2`,
                `<b>For members located at A and B:</b> <br>load dimension = Span/2`,
                `<b>For members located at A or B:</b> <br>load dimension = 'Span 1'/2 or <br>'Span 3'/2; <br> <b>at C:</b> <br>load dimension = 'Span 1'/2 + 'Span 2'/2`,
                `<b>For members located at A or B:</b> <br>load dimension = 'Span 1'/2 or <br>'Span 2'/2; <br> <b>at C:</b> <br>load dimension = 'Span 1'/2 + 'Span 2'/2 `],
            hasImage: true
        },
        lintelType: { 
            title: "Lintel Type", 
            text: "Select the type of lintel based on the supporting configuration. See the examples in the figures below.",
            images: ["images/lintel-type-1.png","images/lintel-type-2.png","images/lintel-type-3.png","images/lintel-type-4.png","images/lintel-type-5.png"],
            imageTexts: [
                `<b>Type A:</b><br> lintel supporting roof only`,
                `<b>Type B:</b><br> lintel supporting roof and wall`,
                `<b>Type C:</b><br> lintel supporting roof, wall and floor`,
                `<b>Type D:</b><br> lintel supporting wall and floor`,
                `<b>Type E:</b><br> lintel supporting floor only`],
            hasImage: true
        },
        roofType: { 
            title: "Roof Type", 
            text: `Choose the roof type. The roof material includes roof cladding and sarking.<br><br>
            <b>Light roofing:</b> the mass not exceeding 20kg/m<sup>2</sup>, typical examples are steel, metal sheeting of normal thickness, 6 mm thick cenment tiles.<br><br>
            <b>Heavy roofing:</b> exceeding 20kg/m<sup>2</sup>, but not exceeding 60kg/m<sup>2</sup>, typical examples are concrete tiles, slates.
            `,
            hasImage: false
        },
        wallType: { 
            title: "Wall Type", 
            text: `Select the wall type. This affects the load on the lintel.<br><br>
             <b>Light wall cladding:</b> mass not exceeding 30kg/m<sup>2</sup>, like typical weatherboards.<br><br>
             <b>Medium wall cladding:</b> mass exceeding 30kg/m<sup>2</sup>, but not exceeding 80kg/m<sup>2</sup>, like thick weatherboards, stucco cladding.
            `,
            hasImage: false
        },
        searchButton: { 
            title: "Search Result", 
            text: `The searched lintel has been added to the lintel table above.<br>
            You can review the details of your search and the recommended lintel size in the table. Or rename, delete the lintel in the table. <br>
            If you need to perform another search, you can modify the input fields at left and search again. Or export the results to a CSV data file. and print a PDF report sheet.<br>
            `,
            hasImage: false
        },
    };

    // Add event listeners to all input and select elements
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('focus', updateDiagram);
        if (input.tagName === 'SELECT') {
            input.addEventListener('change', updateDiagram);
        }
    });

    // Add event listener for search button
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', function(event) {
        updateDiagram({ target: { id: 'searchButton' } });
    });

    function updateDiagram(event) {
        const inputId = event.target.id;
        if (inputInfo[inputId]) {
            const info = inputInfo[inputId];
            diagramTitle.textContent = info.title;
    
            // Clear existing content
            while (diagramDiv.firstChild) {
                diagramDiv.removeChild(diagramDiv.firstChild);
            }
    
            // Add title back
            const fragment = document.createDocumentFragment();
            fragment.appendChild(diagramTitle);
            //add text
            const text = document.createElement('p');
            text.innerHTML = info.text;
            fragment.appendChild(text);
            diagramDiv.appendChild(fragment);

            if (info.hasImage) {
                const gridContainer = document.createElement('div');
                gridContainer.className = 'image-grid';
    
                if (Array.isArray(info.images)) {
                    // Display multiple images in a grid
                    info.images.forEach((image, index) => {
                        const gridItem = document.createElement('div');
                        gridItem.className = 'grid-item';
    
                        const img = document.createElement('img');
                        img.src = image;
                        img.alt = `${info.title} - Image ${index + 1}`;
    
                        const text = document.createElement('p');
                        text.innerHTML = info.imageTexts[index] || ''; 
    
                        gridItem.appendChild(img);
                        gridItem.appendChild(text);
                        gridContainer.appendChild(gridItem);
                    });
                } else {
                    // Single image
                    const gridItem = document.createElement('div');
                    gridItem.className = 'grid-item';

                    const img = document.createElement('img');
                    img.src = info.image;
                    img.alt = info.title;

                    const text = document.createElement('p');
                    text.textContent = info.imageTexts;

                    gridItem.appendChild(text);    
                    gridItem.appendChild(img);
                    gridContainer.appendChild(gridItem);
                }
    
                diagramDiv.appendChild(gridContainer);
            } 
        }
    }
});

//load CSV data
function loadCSV(callback) {
    fetch('linteldata.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n');
            const headers = rows[0].split(',');
            const lintelData = rows.slice(1).map(row => {
                const values = row.split(',');
                return headers.reduce((obj, header, index) => {
                    obj[header.trim()] = values[index] ? values[index].trim() : '';
                    return obj;
                }, {});
            });
            callback(lintelData);
        })
        .catch(error => console.error('Error loading CSV:', error));
}

function processInputAndLookup() {
    // Get user inputs
    const name = document.getElementById('name').value;
    const lintelType = document.getElementById('lintelType').value;
    const roofType = document.getElementById('roofType').value;
    const wallType = document.getElementById('wallType').value;
    const loadDimension = parseFloat(document.getElementById('loadDimension').value);
    const span = parseFloat(document.getElementById('span').value);

    // Construct search key
    let searchKey = lintelType;
    let finalRoofType, finalWallType;

    if (lintelType === 'A') {
        searchKey += roofType + '0';
        finalRoofType = roofType;
        finalWallType = '0';
    } else if (lintelType === 'D') {
        searchKey += '0' + wallType;
        finalRoofType = '0';
        finalWallType = wallType;
    } else if (lintelType === 'E') {
        searchKey += '00';
        finalRoofType = '0';
        finalWallType = '0';
    } else {
        searchKey += roofType + wallType;
        finalRoofType = roofType;
        finalWallType = wallType;
    }

    // Determine which column to look up based on load dimension
    let columnName;
    if (loadDimension < 2) {
        columnName = '2m';
    } else if (loadDimension > 4) {
        columnName = '6m';
    } else {
        columnName = `${Math.ceil(loadDimension)}m`;
    }

    // Filter data and find the appropriate size
    const filteredData = lintelData.filter(row => row.Key.startsWith(searchKey));
    let size = 'Not found';

    for (let i = 0; i < filteredData.length; i++) {
        if (parseFloat(filteredData[i][columnName]) >= span) {
            size = filteredData[i].Size;
            break;
        }
    }
    return { name, span, loadDimension, finalRoofType, finalWallType, size, lintelType };
}

document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    if (lintelData.length === 0) {
        console.error('CSV data not loaded yet');
        return;
    }
    const result = processInputAndLookup();
    updateResultsTable(result)
});

function mapTypeToString(value, isRoof) {
    switch(value) {
        case '0': return 'N/A';
        case '1': return 'Light';
        case '2': return isRoof ? 'Heavy' : 'Medium';
        default: return 'Unknown';
    }
}

let previouslySelectedRow = null;

function updateResultsTable(result) {
    const tbody = document.querySelector('#resultsTable tbody');
    const newRow = tbody.insertRow();
    const uniqueId = `row_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    newRow.innerHTML = `
        <td contenteditable="true" class="editable-name">${result.name}</td>
        <td class="lintel-type-cell" style="display:none;">${mapLintelTypeToString(result.lintelType)}</td>
        <td>${result.span}</td>
        <td>${result.loadDimension}</td>
        <td>${mapTypeToString(result.finalRoofType, true)}</td>
        <td>${mapTypeToString(result.finalWallType, false)}</td>
        <td>${result.size}</td>
    `;
    newRow.dataset.rowId = uniqueId;
    newRow.addEventListener('click', function() {
        if (previouslySelectedRow) {
            previouslySelectedRow.classList.remove('selected');
        }
        newRow.classList.add('selected');
        previouslySelectedRow = newRow;
        document.getElementById('deleteButton').disabled = false;
    });
    newRow.cells[0].addEventListener('focus', function() {
        newRow.classList.add('editing');
    });
    newRow.cells[0].addEventListener('blur', function() {
        newRow.classList.remove('editing');
    });
}

function mapLintelTypeToString(lintelType) {
    switch(lintelType) {
        case 'A': return 'A - roof only';
        case 'B': return 'B - roof and wall';
        case 'C': return 'C - roof, wall and floor';
        case 'D': return 'D - wall and floor';
        case 'E': return 'E - floor only';
        default: return '';
    }
}

document.getElementById('deleteButton').addEventListener('click', function() {
    if (previouslySelectedRow) {
        previouslySelectedRow.remove();
        previouslySelectedRow = null;
        document.getElementById('deleteButton').disabled = true;
    }
});

document.getElementById('exportButton').addEventListener('click', function() {
    const table = document.getElementById('resultsTable');
    const rows = table.querySelectorAll('tbody tr');
    if (rows.length === 0) {
        alert('No data to export!');
        return;
    }
    // Use jobInfo as default, update after prompt
    jobInfo.job = prompt('Project address/name:', jobInfo.job) || jobInfo.job;
    jobInfo.jobNo = prompt('Job number:', jobInfo.jobNo) || jobInfo.jobNo;
    jobInfo.client = prompt('Client:', jobInfo.client) || jobInfo.client;

    let csv = 'LintelDataCSVfile\n';
    csv += `address,${jobInfo.job}\n`;
    csv += `job_number,${jobInfo.jobNo}\n`;
    csv += `client,${jobInfo.client}\n`;
    csv += 'data_start\n';
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        let name = cells[0].textContent.trim();
        let lintelType = cells[1].textContent.trim().replace(/: /g, ' - ').replace(/\s*:\s*/g, ' - ');
        let span = cells[2].textContent.trim();
        let loadDim = cells[3].textContent.trim();
        let roofType = cells[4].textContent.trim();
        let floorType = cells[5].textContent.trim();
        // Replace 'N/A' with '' for export
        if (roofType === 'N/A') roofType = '';
        if (floorType === 'N/A') floorType = '';
        csv += `${name},${lintelType},${span},${loadDim},${roofType},${floorType},SG8\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lintel_results.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

document.getElementById('printButton').addEventListener('click', function() {
    // Use jobInfo as default, update after prompt
    jobInfo.client = prompt('Client name:', jobInfo.client) || jobInfo.client;
    jobInfo.job = prompt('Project name/address:', jobInfo.job) || jobInfo.job;
    jobInfo.jobNo = prompt('Job No.:', jobInfo.jobNo) || jobInfo.jobNo;
    jobInfo.calcBy = prompt('Calc. by:', jobInfo.calcBy) || jobInfo.calcBy;
    jobInfo.date = prompt('Date:', jobInfo.date) || jobInfo.date;
    jobInfo.sheetNo = prompt('Sheet No.:', jobInfo.sheetNo) || jobInfo.sheetNo;

    // Save to HTML elements if present
    if (document.getElementById('phClient')) document.getElementById('phClient').textContent = jobInfo.client;
    if (document.getElementById('phJob')) document.getElementById('phJob').innerHTML = jobInfo.job.replace(/\n/g, '<br>');
    if (document.getElementById('phJobNo')) document.getElementById('phJobNo').textContent = jobInfo.jobNo;
    if (document.getElementById('phCalcBy')) document.getElementById('phCalcBy').textContent = jobInfo.calcBy;
    if (document.getElementById('phDate')) document.getElementById('phDate').textContent = jobInfo.date;
    if (document.getElementById('phSheetNo')) document.getElementById('phSheetNo').textContent = jobInfo.sheetNo;

    const printHeader = document.getElementById('printHeader');
    if (printHeader) printHeader.style.display = '';
    window.print();
    setTimeout(() => {
        if (printHeader) printHeader.style.display = 'none';
    }, 1000);
});