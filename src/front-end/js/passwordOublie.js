
//utils

function createMgs(nomDiv, message, color) {
    if (!nomDiv.querySelector('.mgs')) {
        let div = document.createElement('div')
        div.className = 'mgs'
        div.style.color = color
        div.textContent = message
        nomDiv.append(div)
    }
}

function deleteMgs(nomDiv) {
    if(nomDiv.querySelector('.mgs')){
        nomDiv.querySelector('.mgs').remove()
    }
}





function formValidation(formElement) {
    let email = formElement.querySelector('#email')

    let errColor = 'red'
    let mgs = ''

    if (email.value === '' || email.value == null) {
        mgs = 'Veuillez saisir une adresse e-mail'
        createMgs(emailDiv, mgs, errColor)
        emailDiv.children[1].style.borderColor = 'red'
    }
    else {
        emailDiv.children[1].style.borderColor = 'blue'
        deleteMgs(emailDiv)
    }

    mgs = ''


}

//elements

let formElement = document.querySelector('.js-pssOublie-form')

let emailDiv = formElement.children[0]


//2-form submit validation
//DD - validation
formElement.addEventListener('submit', (e) => {
    e.preventDefault()
    let divMgs = document.createElement('div')
    divMgs.className = 'form-group text-center mt-3'
    formElement.append(divMgs)
    createMgs(divMgs, 'Si cette adresse e-mail correspond à un compte existant, un mail y a été envoyé', 'green')

    //faut ajouter BDD validation
    formValidation(formElement)

})




