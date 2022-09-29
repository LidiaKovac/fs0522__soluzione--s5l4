//! variabili che ci servono per tutto il progetto

let OPTIONS = {
  classi: [],
  inline: "",
  icon: "",
}
let list = document.querySelector("ul.task-list__wrap")
let input = document.querySelector("input[type='text']")
let checkboxes = document.querySelectorAll("input[type='checkbox']")
let colorInput = document.querySelector("input[type='color']")
let selectInput = document.querySelector("select")
let counter = 0

//! aggiunta dell'evento alle checkbox
window.onload = () => {
  for (const check of checkboxes) {
    check.addEventListener("change", handleOptions)
    // check.addEventListener("change", function(event) {handleOptions(event)})
    // le seconda versione e' equivalente, solo piu' esplicita
  }
  setInterval(clearTasks, 300000)
}

//! elimina task ogni tot sec

function clearTasks() {
  let checkedTasks = document.querySelectorAll(".text--strike")
  for (const task of checkedTasks) {
    task.parentElement.remove()
  }
}

//! gestione eventi

//* checkbox
function handleOptions(eventoChange) {
  //in questo caso stiamo aggiungendo un evento "change"
  //verra' triggherato quando il valore della checkbox cambia
  //(quindi, quando selezioniamo o deselozioniamo qualcosa)
  const valoreInput = eventoChange.target.value
  //se l'opzione e' gia' presente nell'array delle opzioni, andiamo a rimuoverla
  if (OPTIONS.classi.includes(valoreInput)) {
    //avete visto questo metodo?
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes?retiredLocale=it
    //codice per eliminare l'elemento
    for (let i = 0; i <= OPTIONS.classi.length; i++) {
      //controlliamo tutti gli elementi presenti nell'array
      const opt = OPTIONS.classi[i]
      if (opt === valoreInput) {
        OPTIONS.classi.splice(i, 1) //rimuove un elemento alla posizione i
        //avete visto questo metodo?
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
      }
    }
  } else {
    OPTIONS.classi.push(valoreInput)
  }
  console.log(OPTIONS)
}

//* colore
function handleColor(eventoChange) {
  OPTIONS.inline = eventoChange.target.value
}

//* testo
function handleText(eventoKeyUp) {
  console.log(eventoKeyUp.target.value)
  // event => l'utente ha triggherato un evento "onkeyup", quindi ha premuto (e rilasciato)
  // un pulsante della tastiera
  //Nell'oggetto "event" sono racchiusi tutti i dati inerenti a questa opeazione, inclusi:
  //- Quale bottone e' stato premuto
  //- Con quale elemento l'utente ha interagito

  //eventoKeyUp.target => e' la proprieta' che rappresenta l'elemento con cui l'utente ha interagito
  // in questo caso, si tratta dell'elemento <input/>
  //eventoKeyUp.target.value => target e' a sua volta un oggetto che racchiude moltissime proprieta', inclusi:
  // - id
  // - classi
  // - il valore che l'utente ha scritto nell'input

  //eventoKeyUp.targe.value e' quindi il valore che l'utente ha digitato nell'input
  if (eventoKeyUp.key === "Enter") {
    //nell'oggetto evento abbiamo anche la proprieta' "key", cioe' il pulsante su cui l'utente ha premuto
    //Se l'utente preme "Invio", aggiungiamo all'ul un nuovo <li>
    creaNuovoLI(eventoKeyUp.target.value)
    svuotaInput()
  }
}

//* bottone
function addTask() {
  // let input = document.querySelector("input")
  // let input = document.querySelector("input")
  // let input = document.querySelector("input.task__input")
  let valoreInput = input.value

  creaNuovoLI(valoreInput)
  svuotaInput()
}

// * select

function handleIcon(eventoChange) {
  OPTIONS.icon = eventoChange.target.value
}

//* task item

function strikeTask(eventoChange) {
  let labelCorrispondente = document.querySelector(
    "label[for='" + eventoChange.target.id + "']"
  )
  if (eventoChange.target.checked) {
    //se il checkbox e' segnato
    labelCorrispondente.classList.add("text--strike")
  } else {
    labelCorrispondente.classList.remove("text--strike")
  }
}

//! utils
function elaboraOpzioniComeStringa() {
  return OPTIONS.classi.join(" ")
}

function creaNuovoLI(valore) {
  if (valore !== "") {
    const stringaOpzioni = elaboraOpzioniComeStringa()
    list.innerHTML += `<li class='task-list__item ${stringaOpzioni}' style='color: ${OPTIONS.inline}'> <input type='checkbox' onchange="strikeTask(event)" class='task-list__inner' id='task_${counter}' /> <label for='task_${counter}'> ${OPTIONS.icon} ${valore} <label>  </li>`
    counter++
  }
}

function svuotaInput() {
  //svuota input
  input.value = ""
  for (const check of checkboxes) {
    check.checked = false
  }
  colorInput.value = "#000000"
  selectInput.value = "def"
  //resetta l'oggetto
  OPTIONS = {
    classi: [],
    inline: "",
    icon: "",
  }
}
