var d = 0;
var index;
var dataArray = {};

function formSave(e) {
    var table = document.getElementById("tableData");
    var rows = table.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        rows[i].style.backgroundColor = "";
    }
    if(e == 1) {
        if(document.getElementById("name").value!='') {
            dataArray['key'+d] = 
            {"name": document.getElementById("name").value, 
             "age": document.getElementById("age").value,
             "dateofbirth": document.getElementById("dateofbirth").value
            };
        }
        else{
            alert("Name is Missing....")
        }
    }
    if(document.getElementById("name").value!='') {
        const rowCreate = document.createElement("tr");
        rowCreate.setAttribute("id", d)
        let nameCell = document.createElement("td");
        nameCell.setAttribute("class", d);
        nameCell.setAttribute("id",'name'+ d);
        nameCell.innerHTML = dataArray['key'+ d].name;
        rowCreate.appendChild(nameCell);

        let ageCell = document.createElement("td");
        ageCell.setAttribute("class", d);
        ageCell.setAttribute("id", 'age'+d);
        let ageInput = document.createElement("input");
        ageInput.type = 'number';
        ageCell.appendChild(ageInput);
        ageCell.innerHTML = dataArray['key'+ d].age;
        rowCreate.appendChild(ageCell);

        let dateofbirthCell = document.createElement("td");
        dateofbirthCell.setAttribute("class", d);
        dateofbirthCell.setAttribute("id", 'dateofbirth'+d);
        let dateInput = document.createElement("input");
        dateInput.setAttribute("type", "date");
        dateofbirthCell.appendChild(dateInput);
        dateInput.value = dataArray['key'+ d].dateofbirth;
        rowCreate.appendChild(dateofbirthCell);
        // let dateofbirthCell = document.createElement("td");
        // dateofbirthCell.setAttribute("class", d);
        // dateofbirthCell.setAttribute("id", 'dateofbirth'+d);
        // dateofbirthCell.innerHTML = dataArray['key'+ d].dateofbirth;
        // rowCreate.appendChild(dateofbirthCell);


        const deleteButton = document.createElement("td");
        deleteButton.setAttribute("id", 'delete'+d);
        const deleteAction = document.createElement("input");
        deleteAction.setAttribute("type", "button");
        deleteAction.setAttribute("value", "Delete");
        deleteAction.setAttribute("onclick", 'deleteData('+d+')');
        deleteButton.appendChild(deleteAction)
        const editAndSave = document.createElement("input");
        editAndSave.setAttribute("type", "button");
        editAndSave.setAttribute("value", "Edit");
        editAndSave.setAttribute("id", "edit" + d);
        editAndSave.setAttribute("onclick", 'editData('+d+')');
        deleteButton.appendChild(editAndSave)
        rowCreate.appendChild(deleteButton);

        document.getElementById("tableData").appendChild(rowCreate)
        d++;

        document.getElementById("name").value = '';
        document.getElementById("age").value = '';
        document.getElementById("dateofbirth").value = '';
    }   

}

function deleteData(e) {
    delete dataArray['key'+e]; 
    console.log(dataArray);
    let row = document.getElementById(e);
    row.parentNode.removeChild(row);
}

function editData(e) {
    console.log('edit e...', e)
    if (document.getElementById('edit'+e).value =='Edit') {
        var dataCell = document.getElementsByClassName(e);
        for(var i=0; i<dataCell.length; i++) {
            dataCell[i].contentEditable = true;
        }
        document.getElementById('edit'+e).value ='Save';
    }

    // if (document.getElementById('edit'+e).value =='Edit') {
    //     let tdValue = document.getElementById("name"+e);
    //     console.log("tst val...", tdValue)
    //     let createTextInput = document.createElement("input");
    //     createTextInput.setAttribute("type", "text");
    //     createTextInput.setAttribute("id", "tableName"+ d);
    //     createTextInput.setAttribute("value", tdValue.innerHTML);
    //     tdValue.innerHTML = '';
    //     tdValue.appendChild(createTextInput);
    //     let td1Value = document.getElementById("age"+e);
    //     let createNumberInput = document.createElement("input");
    //     createNumberInput.setAttribute("type", "number");
    //     createNumberInput.setAttribute("id", "tableAge"+ d);
    //     createNumberInput.setAttribute("value", td1Value.innerHTML);
    //     console.log("tst val...", td1Value)
    //     td1Value.innerHTML = '';
    //     td1Value.appendChild(createNumberInput);
    //     document.getElementById('edit'+e).value ='Save';
    // }


    else {
        document.getElementById('edit'+e).value ='Edit';
        dataArray['key'+ e].name = document.getElementById('name'+e).innerHTML;
        dataArray['key'+ e].age = document.getElementById('age'+e).innerHTML;
        dataArray['key'+ e].dateofbirth = document.getElementById('dateofbirth'+e).innerHTML;
        console.log('after edit....', dataArray);
        var dataCell = document.getElementsByClassName(e);
        for(var i=0; i<dataCell.length; i++) {
            dataCell[i].contentEditable = false;
        }
        // console.log(document.getElementById('tableName'+e))
        // dataArray['key'+ e].name = document.getElementById('tableName'+e).value;
        // dataArray['key'+ e].age = document.getElementById('tableAge'+e).value;
        // dataArray['key'+ e].dateofbirth = document.getElementById('dateofbirth'+e).value;
        // console.log('after edit....', dataArray);
        // var dataCell = document.getElementsByClassName(e);
        // for(var i=0; i<dataCell.length; i++) {
        //     dataCell[i].contentEditable = false;
        // }
    }
    
}

function formCancel() {
    document.getElementById("name").value = '';
    document.getElementById("age").value = '';
    document.getElementById("dateofbirth").value = '';
}

function searchMatch() {
    var spanElements = document.getElementsByTagName("span");
    for (var i = 0; i < spanElements.length; i++) {
        spanElements[i].classList.remove("highlight");
    }
    document.getElementById("noResult").innerHTML = ''
    var idValue;
    let c = 0;
    let nameSearch = document.getElementById("searchName")
    let ageSearch = document.getElementById("searchAge")
    for (let key in dataArray) {
        idValue = key[key.length-1];

        let k=0;
        if(document.getElementById('searchName').value != '') {
            let searchField = document.getElementById('searchName').value;
            console.log('search name val...', searchField)
            let nameSearchValue = ''
            while(k < dataArray[key].name.length) {
                if(dataArray[key].name.substring(k, k + searchField.length) == searchField) {
                    nameSearchValue = nameSearchValue + "<span class='highlight'>" + dataArray[key].name.substring(k, k + searchField.length) + "</span>" ;
                    c++;
                    k = k + searchField.length;
                }
                else {
                    nameSearchValue = nameSearchValue + dataArray[key].name[k];
                    k++;
                }
            }
            document.getElementById("name"+idValue).innerHTML = nameSearchValue;
        }
        let a=0;
        if(document.getElementById('searchAge').value != '') {
            let searchField = document.getElementById('searchAge').value;
            let ageSearchValue = ''
            console.log('search age val...', searchField)
            while(a < dataArray[key].age.length) {
                if(dataArray[key].age.substring(a, a + searchField.length) == searchField) {
                    console.log('In search age if.....')
                    ageSearchValue = ageSearchValue + "<span class='highlight'>" + dataArray[key].age.substring(a, a + searchField.length) + "</span>" ;
                    c++;
                    a = a + searchField.length;
                }
                else {
                    ageSearchValue = ageSearchValue +dataArray[key].age[a] ;
                    a++;
                }
            }
            document.getElementById("age"+idValue).innerHTML = ageSearchValue;
        }
    }
    if(c==0) {
        document.getElementById("noResult").innerHTML = 'No Record Matches Found'
    }
    nameSearch.value = '';
    ageSearch.value = '';
}