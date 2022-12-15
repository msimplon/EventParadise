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

const form = document.querySelector("form"); //récupèration de l'ensemble par le form

handleValidation(form);
handleSubmit(form);

function handleValidation(form) {
    for (const element of form.elements) {
        const elHelpText = document.getElementById(`${element.name}Help`);
        const type = element.type;
        if (type != "submit") {
            invalid(element, elHelpText)
            onChange(element, elHelpText);
        }
    }
}

function invalid(element, elHelpText) {
    element.addEventListener("invalid", (event) => {
        event.preventDefault();
        element.classList.add("is-invalid");
        elHelpText.classList.add("text-danger"); //couleur du helpText
        const firstInvalidField = form.querySelector('.is-invalid');
        const tooltip = tooltipInitialize(element);
        element.setAttribute("data-bs-toggle", "tooltip");
        firstInvalidField.focus();
        tooltip.enable();
    });
}

function tooltipInitialize(element) {  //object avec clefs et valeurs 
    const opt = {

        title: "Ce champ est obligatoire.",
        placement: "top",
        trigger: "focus hover",
    };
    return tooltip = bootstrap.Tooltip.getOrCreateInstance(element, opt);
}

//personnalisation des messages en cas d'erreur de validation


// Ajout du message "error validation"
function tooltipMessage(element) {
    let message = "Ce champ est obligatoire.";
    const tooltip = bootstrap.Tooltip.getInstance(element);
    if (element.name == "rate" && element.validity.rangeUnderflow) {
        message = 'Doit être positif';
    } else if (element.name == "date" && element.validity.rangeUnderflow) {
        message = 'Doit être égale ou supérieure à aujourd’hui';
    } else {
        message;
    }

    tooltip.setContent({ '.tooltip-inner': message }); //appeler cette mthode avec objet car il attends un object ! :tooltip-inner est une classe css 
}



function onChange(element, elHelpText) {
    element.addEventListener("change", (event) => {
        event.preventDefault();
        const tooltip = bootstrap.Tooltip.getInstance(element);
        if (element.validity.valid) {
            if (tooltip) {
                tooltip.dispose();
            }
            element.classList.remove("is-invalid");
            element.classList.add("is-valid");
            elHelpText.classList.remove("text-danger");
            elHelpText.classList.add("text-success");
        } else {
            element.classList.add("is-invalid");
            elHelpText.classList.add("text-danger");
            const tooltip = tooltipInitialize(element);
            tooltipMessage(element);
            tooltip.enable();
        }
    });

}

//Réinitialiser complètement le formulaire et afficher le toaster 
function handleSubmit(form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        toast();

        event.target.reset();
        for (let element of form.elements) {
            const type = element.type;
            if (type != "submit") {
                element.classList.remove("is-valid");
                const idHelpText = `${element.name}Help`;
                const elHelpText = document.getElementById(idHelpText);
                elHelpText.classList.remove("text-success");
            }
        }
    });
}


function toast() {
    const toastEl = document.getElementById('toast'); //récuperation de l'id et initialisation
    const toast = new bootstrap.Toast(toastEl); //creation du toast (dernière étape)
    toast.show();
}



// crtl + F = pour rechercher un mot clé
//rangeOverflow = valeur inout modififié par l'utilisateur non valid par l'utilisateur définit par la contrainte max
//rangeUnverflow = valeur inout modififié par l'utilisateur non valid par l'utilisateur définit par la contrainte min
//Toolong = dépasse la longueur maximale de l’unité de code établie par l’attribut
// TooShort = inférieure à la longueur minimale
//TypeMismatch = valeur n’est pas conforme aux contraintes définies par le type,
