var items = new autoComplete({
    data: {                              // Data src [Array, Function, Async] | (REQUIRED)
      src: async () => {
        const input = document.getElementById('autoComplete').value;
        const source = await fetch(`/test?key=${input}`);
        // Format data into JSON
        const data = await source.json();
        // Return Fetched data
        return data;
      },
      key: ['jp_name', 'en_name', 'hiragana', 'katakana'],
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
    maxResults: 10,                         // Max. number of rendered results | (Optional)
    highlight: true,                       // Highlight matching results      | (Optional)
    resultItem: {                          // Rendered result item            | (Optional)
        content: (data, source) => {
            source.innerHTML = data.value.jp_name;
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
        const selection = feedback.selection.value.jp_name;
        // Render selected choice to selection div
        document.querySelector(".autoComplete_result").innerHTML = selection;
        // Clear Input
        document.querySelector("#autoComplete").value = "";
        // Change input value with the selected value
        document.querySelector("#autoComplete").value = selection;
    }
});
