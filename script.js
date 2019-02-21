let alleRetter = [];
let filter = "alle";

document.addEventListener("DOMContentLoaded", start);

function start() {
    console.log("starter");
    let dest = document.querySelector("#liste");
    let temp = document.querySelector("template");

    async function getJson() {
        let jsonData = await fetch("https://mandalskeawebspace.dk/claude_php/clean_up_spreadsheet.php?id=1h8J_KUMMX_texxU-bKC3tNCeTH-ozf47qUHSfinhzJY");
        alleRetter = await jsonData.json();
        visRetter();
    }

    function visRetter() {
        console.log("viser retter");
        dest.innerHTML = "";
        alleRetter.forEach(ret => {
            if (filter == "alle" || filter == ret.kategori) {
                let template = `
                            <div class="ret">
                                <img src="img/${ret.billede}.png">
                                <h2>${ret.navn}</h2>
                                <p>${ret.beskrivelse} <br><br> Pris: ${ret.pris},-</p>
                            </div>`
                dest.insertAdjacentHTML("beforeend", template);
                dest.lastElementChild.addEventListener("click", () => {
                    location.href = "singleView.html?id=" + ret.id;
                });

                function åbn() {
                    console.log("åbner singleview");
                    document.querySelector("#indhold").innerHTML = `
                            <div class="ret">
                                <img src="img/${ret.billede}.png">
                                <h2>${ret.navn}</h2>
                                <p>${ret.beskrivelse} <br><br> Pris: ${ret.pris},-</p>
                            </div>`;
                    document.querySelector("#singleview").style.display = "block";
                }
            }
        })
    }

    document.querySelector("#luk button").addEventListener("click", () => {
        document.querySelector("#singleview").style.display = "none";
    })

    document.querySelectorAll(".filter").forEach(elm => {
        elm.addEventListener("click", filtrering);
    })

    function filtrering() {
        console.log("filtrerer retter");
        filter = this.getAttribute("data-hold");
        document.querySelector("h1").textContent = this.textContent;
        document.querySelectorAll(".filter").forEach(elm => {
            elm.classList.remove("valgt");
        })
        this.classList.add("valgt");
        visRetter();
    }

    getJson();

}
