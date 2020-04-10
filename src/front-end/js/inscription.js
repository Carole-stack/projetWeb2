
//utils

function createMgs(nomDiv, message, color) {
    deleteMgs(nomDiv)
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

function createProgressBar() {
    let progressBar = document.createElement('progress')
    progressBar.className = 'progressBar mt-2'//style.css responsive -à faire
    progressBar.max = 100
    progressBar.value = 0
    progressBar.id = 'progressBar'//???
    progressBar.style.width = '350px'
    // progressBar.style.marginTop = '10px'//===mt-2 //boostrap
    progressBar.style.height = '10px'
    // progressBar.style.backgroundColor = 'red'//??
    progressBar.style.display = 'none'

    return progressBar
}

function showProgressBar(progressBar) {
    progressBar.style.display = 'block'
}

function deleteProgressBar(progressBar) {
    progressBar.remove()
}

function hideProgressBar(progressBar) {
    // formElement.querySelector('#progressBar').style.display = 'none'
    progressBar.style.display = 'none'
}

function checkPasswordStrength(e) {
    e.preventDefault()

    let passwordValue = passDiv.querySelector('#password').value
    let strength = 0

    if (passwordValue.match(/[a-z0-9][a-z0-9]+/)) {
        strength += 1
    }
    if (passwordValue.match(/[A-Z0-9][A-Z0-9]+/)) {
        strength += 1
    }
    if (passwordValue.match(/[~<>?]+/)) {
        strength += 1
    }
    if (passwordValue.match(/[!@£$%^&*()]+/)) {
        strength += 1
    }
    if (passwordValue.length > 5) {
        strength += 1
    }

    switch (strength) {

        case 0:
            progressBar.value = 0
            break
        case 1:
            progressBar.value = 20
            break;
        case 2:
            progressBar.value = 40
            break;
        case 3:
            progressBar.value = 60
            break;
        case 4:
            progressBar.value = 80
            break;
        case 5:
            progressBar.value = 100
            break;

    }

}

function formValidation(formElement) {
    let email = formElement.querySelector('#email')
    let password = formElement.querySelector('#password')
    let r_pass = formElement.querySelector('#r_pwd')

    let errColor = 'red'
    let mgs = ''


    if (email.value === '' || email.value == null) {
        mgs = 'Veuillez renseigner une adresse e-mail'
        createMgs(emailDiv, mgs, errColor)
        emailDiv.children[1].style.borderColor = 'red'
    }
    else {
        emailDiv.children[1].style.borderColor = 'blue'
        deleteMgs(emailDiv)
    }

    if (password.value === '' || password.value == null) {
        mgs = 'Veuillez renseignez un mot de passe'
        createMgs(passDiv, mgs, errColor)
        passDiv.children[1].style.borderColor = 'red'
    }

    else if (password.value.length <= 7) {
        // deleteMgs(passDiv)
        mgs = 'Utilisez 8 caractères ou plus pour votre pot de passe.'
        createMgs(passDiv, mgs, errColor)
        passDiv.children[1].style.borderColor = 'red'
    }
    else {
        deleteMgs(passDiv)
        passDiv.children[1].style.borderColor = 'blue'



        if (r_pass.value.length === 0||r_pass.value === '' || r_pass.value == null) {
            // deleteMgs(r_passDiv)
            mgs = 'Re-Entrez votre mot de passe'
            createMgs(r_passDiv, mgs, errColor)
            r_passDiv.children[1].style.borderColor = 'red'
        }
        else if (password.value !== r_pass.value) {
            // deleteMgs(r_passDiv)
            mgs = 'Les mots de passe ne correspondaent pas. Veuillez réessayer.'
            createMgs(r_passDiv, mgs, errColor)
            r_passDiv.children[1].style.borderColor = 'red'
        }
        else {
            deleteMgs(r_passDiv)
            r_passDiv.children[1].style.borderColor = 'blue'
        }
    }
    mgs = ''

    // formElement.addEventListener('blur', (e) => {
    //     // funKction checkError() {
    //         createMgs(emailDiv, 'lsigoeijgosjeo see', 'red')
    // })//pour changer la couleur de DIV avec blur
}

//elements

let formElement = document.querySelector('.js-signup-form')

// let password = formElement.querySelector('#password')
let emailDiv = formElement.children[0]
let passDiv = formElement.children[1]
let r_passDiv = formElement.children[2]

//event listeners
//1-password stregnth
password.addEventListener('focus', () => {

    let progressBar = createProgressBar()
    passDiv.append(progressBar)
    checkPasswordStrength(event)

    password.addEventListener('keyup', checkPasswordStrength)
    showProgressBar(progressBar)

})

password.addEventListener('blur', () => {
    deleteProgressBar(progressBar)
})

//2-form submit validation
//DD - validation
formElement.addEventListener('submit', (e) => {
    e.preventDefault()
    let divMgs = document.createElement('div')
    divMgs.className = 'form-group text-center mt-3'
    formElement.append(divMgs)
    createMgs(divMgs, 'Un mail de confirmation vous a été envoyé', 'green')

    //faut ajouter BDD validation
    formValidation(formElement)

})




