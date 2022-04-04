var tables = []

function start(){

    libreria = document.querySelector("#libreria")
    wishlist = document.querySelector("#wish")

    tables = [libreria, wishlist]

    tables.forEach((tabla) => {
        getUniqueValuesColumn(tabla)
        
    })
}

function getUniqueValuesColumn(tabla){
    var col_values= {}

    //allFilters = document.querySelectorAll(".table-filter")
    allFilters = tabla.querySelectorAll(".table-filter")
    //console.log(allFilters)

    allFilters.forEach((filter_i) => {
        col_index = filter_i.parentElement.getAttribute("col-index");
        const rows = tabla.querySelectorAll("tbody > tr")
        
        rows.forEach((row) =>{
            //console.log(row)
            cell_value = row.querySelector("td:nth-child("+col_index+")").textContent;
            
            if(col_index in col_values){

                if(col_values[col_index].includes(cell_value)){
                    // alert(cell_value + "is already present in array: " + col_values[col_index])
                }
                else{
                    col_values[col_index].push(cell_value)
                    // alert("Array after adding cell value: " + col_values[col_index])
                }

            }else{
                col_values[col_index] = new Array(cell_value)
            }

        });
        

    });

    SelectOptions(col_values, tabla)
};


//Add option tags to the column based on values

function SelectOptions(col_values, tabla){
    allFilters = tabla.querySelectorAll(".table-filter")

    allFilters.forEach((filter_i) =>{
        col_index = filter_i.parentElement.getAttribute('col-index')

        col_values[col_index].forEach((i) => {
            filter_i.innerHTML = filter_i.innerHTML + `\n<option value="${i}">${i}</option>`
        });
    });
};

//create filter

function filter(event){
    var e = event.target.getAttribute("class")
    
    var clase = e.split(" ")

    var tabla = clase[1] == "lib" ? tables[0]:tables[1]

    allFilters = tabla.querySelectorAll(".table-filter")
    var filter_value = {}

    allFilters.forEach((filter_i) =>{
        col_index = filter_i.parentElement.getAttribute('col-index')

        value = filter_i.value
        if (value != "all"){
            filter_value[col_index] = value;
        }
    });

    var col_cell_value = {};

    const rows = tabla.querySelectorAll("tbody > tr");
    rows.forEach((row) => {
        var display_row = true;

        allFilters.forEach((filter_i) => {
            col_index = filter_i.parentElement.getAttribute('col-index')
            col_cell_value[col_index] = row.querySelector("td:nth-child("+col_index+")").textContent
        })

        for(var col_i in filter_value){
            //col_i index of column selected
            filter_val = filter_value[col_i]
            row_cell_v = col_cell_value[col_i]

            console.log(filter_val)
           // console.log(row_cell_v)

            if(row_cell_v.indexOf(filter_val) == -1 && filter_val != "all"){
                display_row = false;
                break;
            }
        }

        if(display_row == true){
            row.style.display = "table-row"

        } else {
            row.style.display = "none"

        }
    })

}