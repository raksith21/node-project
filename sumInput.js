var inputField1;
var inputField2;
var searchField;
var concatResult;
var inputList = [];
var searchList = [];
let searchValue = '';

function inputChange() {
    inputField1 = document.getElementById("input1").value;
    inputField2 = document.getElementById("input2").value;
    searchField = document.getElementById('input3').value;
}
 
function search() {
    document.getElementById("tableArea").classList.remove('highlight');
    document.getElementById("result").value = '';
    searchList = [];
    concatResult = inputField1 + inputField2;
    document.getElementById("input3").value = '';
    let c = 0;
    for(let i=0; i<inputList.length; i++) {
        let k = 0;
        searchValue = ''
        while(k<inputList[i].length) {
            if(inputList[i].substring(k, k + searchField.length) == searchField) {
                searchValue = searchValue + "<span class='highlight'>" + inputList[i].substring(k, k + searchField.length) + "</span>" ;
                c++;
                k = k + searchField.length;
            }
            else {
                searchValue = searchValue + inputList[i][k];
                k++;
            }
        }
        searchList.push(searchValue);

    }
    if(c > 0) {
        document.getElementById("result").innerHTML = ''
        for(var i=0; i<searchList.length; i++) {
            const element = document.createElement("h2");
            element.innerHTML = searchList[i];
            document.getElementById("result").appendChild(element);
        }
    }
    else {
        document.getElementById("result").innerHTML = 'No Search Result Found';
    }

    }

function result() {
    if(Number.isInteger(Number(inputField1)) && Number.isInteger(Number(inputField2))) {
        document.getElementById("total").innerHTML = ''
        concatResult = Number(inputField1) + Number(inputField2);
        const element = document.createElement("h2");
        element.innerHTML = concatResult;
        document.getElementById("total").appendChild(element);
    }

    else {
        document.getElementById("total").innerHTML = ''
        concatResult = inputField1 + inputField2;
        inputList.push(concatResult);
        for(var i=0; i<inputList.length; i++) {
            const element = document.createElement("h2");
            element.innerHTML = inputList[i];
            document.getElementById("total").appendChild(element);
        }
        document.getElementById("input1").value = '';
        document.getElementById("input2").value = '';
    }
}

function cancel() {
        document.getElementById("input1").value = '';
        document.getElementById("input2").value = '';
}
