let searchInputEl = document.getElementById("searchInput");
let searchresulsel = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");

function createAndAppend(result) {
    let {
        title,
        link,
        description
    } = result;
    //resultitem
    let resultItemel = document.createElement("div");
    resultItemel.classList.add("result-item");
    searchresulsel.appendChild(resultItemel);
    //title
    let resultTitleEl = document.createElement("a");
    resultTitleEl.classList.add("result-title");
    resultTitleEl.textContent = title;
    resultTitleEl.href = link;
    resultTitleEl.target = "_blank";
    resultItemel.appendChild(resultTitleEl);
    //br
    let br = document.createElement("br");
    resultItemel.appendChild(br);
    //url
    let Url = document.createElement("a");
    Url.classList.add("result-url");
    Url.href = link;
    Url.target = "-blank";
    Url.textContent = link;
    resultItemel.appendChild(Url);
    //br
    let line = document.createElement("br");
    resultItemel.appendChild(line);
    //description
    let para = document.createElement("p");
    para.classList.add("line-description");
    para.textContent = description;
    resultItemel.appendChild(para);

}

function displayResults(search_results) {
    spinner.classList.toggle("d-none");
    for (let result of search_results) {
        createAndAppend(result);
    }
}

function searchWiki(event) {
    if (event.key === "Enter") {
        searchresulsel.textContent = "";
        spinner.classList.toggle("d-none");
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}
searchInputEl.addEventListener("keydown", searchWiki);