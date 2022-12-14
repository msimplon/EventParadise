let today = new Date();
let day = today.getDate();
let month = today.getMonth() + 1;
const year = today.getFullYear();

if (day < 11) {
    day = "0" + day;
}

if (month < 10) {
    month = "0" + month;
}

today = year + "-" + month + "-" + day;

console.log(today);


const date = document.getElementById("date");
date.setAttribute("min", today); // modification de la valeur de l'attribut date en today


//---------------------------------------------------------------------------------------------------------------//



const inputsForm = document.querySelectorAll('input, select, textarea');
const form = document.querySelector('form'); //récupèration de l'ensemble par le form



const toastSucces = document.getElementById('liveToast'); //récuperation de l'id et initialisation
const toast = new bootstrap.Toast(toastSucces); //creation du toast (dernière étape)

//voir méthode create tooltip or get 
//voir le fonctionnement set contente

function createTooltip(element, message) {

    return new bootstrap.Tooltip(element, { //object avec clefs et valeurs 
        title: message,
        placement: "top", //ou bottom 
        trigger: "focus"
    });
}


//

for (let i = 0; i < inputsForm.length; i++) {
    const element = inputsForm[i]; //renommer 
    const helpText = document.getElementById(`${element.id}Help`);
    let tooltip = null;
    let message = "";


    element.addEventListener('invalid', event => {
        event.preventDefault();
        helpText.classList.add("text-danger");
        element.classList.add("is-invalid");
        const message = tooltipMessage(element);
        const tooltip = createTooltip(element, message);
        const firstInvalidField = form.querySelector('invalid');
        if (element === firstInvalidField) {
            element.focus();
            // tooltip.show();
            // firstInvalidField.focus()
        }
        // onChangeSuccess(state, helpText);

    });


    //Evenement change 

    element.addEventListener('change', event => {
        const validity = element.checkValidity();
        if (validity) {
            helpText.classList.remove("text-danger"); //couleur du helpText
            helpText.classList.add("text-success");
            element.classList.add("is-valid"); //changement couleur des inputs
            element.classList.remove("is-invalid");

            //disable = Supprime la possibilité d’afficher l’info-bulle d’un élément. L’info-bulle ne pourra être affichée que si elle est réactivée.



        } if (tooltip != null) {
            tooltip.enable(); //Donne à l’info-bulle d’un élément la possibilité d’être affichée.
            message = tooltipMessage(element);
            tooltip.setContent() //Permet de modifier le contenu de l’info-bulle après son initialisation.
            tooltip.show(); //Affiche l’info-bulle d’un élément. Retourne à l’appelant avant que l’info-bulle ne soit réellement affiché
        }
        element.focus();
    })
}



//personnalisation des messages en cas d'erreur de validation

function tooltipMessage(element) {
    if (element.validity.valueMissing) {
        console.log("champ obligatoire", element.name)
        return "Le champ obligatoire";
    } else if (element.type === "number" && element.validity.rangeUnderflow) { //element.validity.rangeUnderflow 
        console.log("doit etre positif", element.name)
        return "Doit être positif"; //ne fonctionne pas 
    } else if (element.type === "date" && element.validity.rangeUnderflow) {
        console.log("Doit être égale ou supérieure à aujourd'hui", element.name)
        return "Doit être égale ou supérieure à aujourd'hui";   //ne fonctionne pas 
    }
}



//Réinitialiser complètement le formulaire et afficher le toaster 
form.addEventListener('submit', event => {
    event.preventDefault();
    form.reset();
    toast.show()

    const elements = form.elements;
    const type = elements.type;

    for (const element of elements) {
        if (type != 'submit') {
            // helpText.classList.add("text-success"); //censer etre enlever car reset 
            element.classList.remove("text-danger");


        }
    }
})






//rangeOverflow = valeur inout modififié par l'utilisateur non valid par l'utilisateur définit par la contrainte max
//rangeUnverflow = valeur inout modififié par l'utilisateur non valid par l'utilisateur définit par la contrainte min
//Toolong = dépasse la longueur maximale de l’unité de code établie par l’attribut
// TooShort = inférieure à la longueur minimale
//TypeMismatch = valeur n’est pas conforme aux contraintes définies par le type,







