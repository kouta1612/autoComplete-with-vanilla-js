var items = new autoComplete({
    data: {                              // Data src [Array, Function, Async] | (REQUIRED)
      src: async () => {
        const source = await fetch('https://tarekraafat.github.io/autoComplete.js/demo/db/generic.json');
        // Format data into JSON
        const data = await source.json();
        // Return Fetched data
        return data;
      },
      key: ["food", 'cities', 'animals'],
      cache: false
    },
    sort: (a, b) => {                    // Sort rendered results ascendingly | (Optional)
        if (a.match < b.match) return -1;
        if (a.match > b.match) return 1;
        return 0;
    },
    placeHolder: "Food & Drinks...",     // Place Holder text                 | (Optional)
    selector: "#autoComplete",           // Input field selector              | (Optional)
    searchEngine: "strict",              // Search Engine type/mode           | (Optional)
    
    resultsList: {                       // Rendered results list object      | (Optional)
        render: true,
        container: source => {
            const resultsListID = "food_List";
            return resultsListID;
        },
        destination: document.querySelector("#autoComplete"),
        position: "afterend",
        element: "ul"
    },
    maxResults: 5,                         // Max. number of rendered results | (Optional)
    highlight: true,                       // Highlight matching results      | (Optional)
    resultItem: {                          // Rendered result item            | (Optional)
        content: (data, source) => {
            source.innerHTML = data.match;
        },
        element: "li"
    },
    noResults: () => {                     // Action script on noResults      | (Optional)
        const result = document.createElement("li");
        result.setAttribute("class", "no_result");
        result.setAttribute("tabindex", "1");
        result.innerHTML = "No Results";
        document.querySelector("#autoComplete_results_list").appendChild(result);
    },
    onSelection: feedback => {             // Action script onSelection event | (Optional) リストアイテムを選択した時の処理
        const selection = feedback.selection.value.food;
        // Render selected choice to selection div
        document.querySelector(".autoComplete_result").innerHTML = selection;
        // Clear Input
        document.querySelector("#autoComplete").value = "";
        // Change input value with the selected value
        document.querySelector("#autoComplete").value = selection;
        // Concole log autoComplete data feedback
        console.log(feedback);
    }
});
