//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
//document.addEventListener("DOMContentLoaded", function (e) {

//});
const ORDER_ASC_BY_COST = "cost -> COST";
const ORDER_DESC_BY_COST = "COST <- cost";
const ORDER_DESC_BY_RELEVANCY = "SOLD <- sold";

var categoriesArray = [];
var minCost = undefined;
var maxCost = undefined;

function sortProducts(criterio, array) {
    let result = [];

    if (criterio === ORDER_ASC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return 1; }
            if (a.cost < b.cost) { return -1; }
            return 0;
        });
    } else if (criterio === ORDER_DESC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criterio === ORDER_DESC_BY_RELEVANCY) {
        result = array.sort(function (a, b) {
            if (a.soldCount > b.soldCount) { return -1; }
            if (a.soldCount < b.soldCount) { return 1; }
            return 0;
        });
    }
    return result;
}

function showCategoriesList(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let category = array[i];

        if(((minCost == undefined) || (minCost != undefined && parseInt(category.cost) >= minCost)) &&
        ((maxCost == undefined) || (maxCost != undefined && parseInt(category.cost) <= maxCost))){

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + category.imgSrc + `" alt="` + category.desc + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ category.name + " " + category.cost + category.currency + `</h4>
                        <small class="text-muted">` + category.soldCount + ` vendidos</small>
                    </div>
                    <p>` + category.description + `</p>
                </div>
            </div>
        </div>
        `
        }
        document.getElementById("info").innerHTML = htmlContentToAppend;
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            categoriesArray = resultObj.data;
            //Muestro las categorías ordenadas
            showCategoriesList(categoriesArray);
        }
    });

    document.getElementById("ascendente").addEventListener("click", function () {
        categoriesArray = sortProducts(ORDER_ASC_BY_COST, categoriesArray);
        showCategoriesList(categoriesArray);
    });

    document.getElementById("descendente").addEventListener("click", function () {
        categoriesArray = sortProducts(ORDER_DESC_BY_COST, categoriesArray);
        showCategoriesList(categoriesArray);
    });

    document.getElementById("relevancia").addEventListener("click", function () {
        categoriesArray = sortProducts(ORDER_DESC_BY_RELEVANCY, categoriesArray);
        showCategoriesList(categoriesArray);
    });

    document.getElementById("filtrar").addEventListener("click", function () {
        minCost = document.getElementById("min-cost").value;
        maxCost = document.getElementById("max-cost").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0) {
            minCost = parseInt(minCost);
        } else {
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0) {
            maxCost = parseInt(maxCost);
        } else {
            maxCost = undefined;
        }
        showCategoriesList(categoriesArray);
    });

    document.getElementById("limpiar").addEventListener("click", function(){
        document.getElementById("min-cost").value = "";
        document.getElementById("max-cost").value = "";
        minCost = undefined;
        maxCost = undefined;

        showCategoriesList(categoriesArray);
    });
});