var app = {
    data: data,
    html: {
        searchbar: document.querySelectorAll(".search input")[0],
        display: document.querySelectorAll(".display")[0],
    },
    init: function () {
        app.render();
        app.html.searchbar.addEventListener("keyup", function () {
            app.search(this.value);
        });
    },
    render: function () {
        app.html.display.innerHTML = "";
        app.data.forEach((item) => {
            app.html.display.innerHTML += `
               <div class="school">
                  <div class="title" style="color:white;">${item.school_name}</div> 
               </div>
            `;
        });
        app.html.items = document.querySelectorAll(".school");
    },
    search: function (term) {
        app.data.forEach(function (item, index) {
            var html = app.html.items[index];
            html.classList.remove("show");
            if (
                item.school_name.toLowerCase().indexOf(term.toLowerCase()) == -1
            ) {
                html.classList.add("hide");
            } else {
                if (html.classList.contains("hide")) {
                    html.classList.remove("hide");
                    html.classList.add("show");
                }
            }
        });
    },
};

app.init();

let q = app.html.display.querySelectorAll(".title");
let dict = {
    7: "seven",
    8: "eight",
    9: "nine",
    10: "ten",
};
q.forEach((e) => {
    e.addEventListener("click", function (event) {
        let school = event.target.innerHTML;
        const item = app.data.find((item) => item.school_name === school);
        const tabWrapper = document.createElement("div");

        const ul = document.createElement("ul");
        ul.className = "nav nav-tabs";
        ul.id = "myTab";
        ul.role = "tablist";

        const tabPaneWrapper = document.createElement("div");
        tabPaneWrapper.className = "tab-content";
        tabPaneWrapper.id = "myTabContent";

        let a = "active";
        item.results.forEach((class_obj) => {
            let li = `<li class="nav-item" role="presentation">
        <button class="nav-link ${a}" id="${
                dict[class_obj.class_name]
            }-tab" data-bs-toggle="tab" data-bs-target="#${
                dict[class_obj.class_name]
            }-tab-pane" type="button" role="tab" aria-controls="${
                dict[class_obj.class_name]
            }-tab-pane" aria-selected="true">${
                String(class_obj.class_name) + "th"
            }</button>
      </li>
    `;

            ul.innerHTML += li;
            const tabPane = document.createElement("div");
            tabPane.className = `tab-pane fade show ${a}`;
            a = "";

            tabPane.id = `${dict[class_obj.class_name]}-tab-pane`;
            tabPane.role = "tabpanel";
            tabPane.setAttribute(
                "aria-labelledby",
                `${dict[class_obj.class_name]}-tab`
            );
            tabPane.setAttribute("tabindex", "0");

            tabPane.innerHTML = `<ul class="winners"></ul>`;
            class_obj.winners.forEach((winner) => {
                tabPane.querySelector(
                    ".winners"
                ).innerHTML += `<li class="winner">${winner}</li>`;
            });

            tabPaneWrapper.innerHTML += tabPane.outerHTML;
        });
        tabWrapper.innerHTML += ul.outerHTML;
        tabWrapper.innerHTML += tabPaneWrapper.outerHTML;

        let modal = document.createElement("div");
        modal.classList.add("modal");
        modal.setAttribute("tabindex", "-1");
        modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fs-2">${school}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            ${tabWrapper.outerHTML}
          </div>
        </div>
      </div>
    `;
        document.body.appendChild(modal);
        modal.style.display = "block";
        modal.style.background = "#260038";
        modal.querySelector(".modal-content").style.background = "#b6b7ff";
        modal
            .querySelector(".btn-close")
            .addEventListener("click", function () {
                document.body.removeChild(modal);
            });
    });
});
