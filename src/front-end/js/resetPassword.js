
//utils

function createMgs(nomDiv, message, color) {
    deleteMgs(nomDiv)
    if (!nomDiv.querySelector('.mgs')) {
        let div = document.createElement('div')
        div.className = 'mgs'
        div.style.color = color
        div.innerHTML = message
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
    let password = formElement.querySelector('#password')
    let c_pwd = formElement.querySelector('#confirmPwd')

    let errColor = 'red'
    let mgs = ''


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



        if (c_pwd.value.length === 0||c_pwd.value === '' || c_pwd.value == null) {
            // deleteMgs(c_passDiv)
            mgs = 'Re-Entrez votre mot de passe'
            createMgs(c_passDiv, mgs, errColor)
            c_passDiv.children[1].style.borderColor = 'red'
        }
        else if (password.value !== c_pwd.value) {
            // deleteMgs(c_passDiv)
            mgs = 'Les mots de passe ne correspondaent pas. Veuillez réessayer.'
            createMgs(c_passDiv, mgs, errColor)
            c_passDiv.children[1].style.borderColor = 'red'
        }
        else {
            deleteMgs(c_passDiv)
            c_passDiv.children[1].style.borderColor = 'blue'
        }
    }
    mgs = ''


}

//elements

let formElement = document.querySelector('.js-resetPass-form')

// let password = formElement.querySelector('#password')
let passDiv = formElement.children[0]
let c_passDiv = formElement.children[1]

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
    let ici='<a href="connexion.html" class="text-success">ici</a>'
    createMgs(divMgs, `Le mot de pass a été modifié avec succès. Cliquez ${ici} pour vous connecter`, 'green')

    //faut ajouter BDD validation
    formValidation(formElement)

})




