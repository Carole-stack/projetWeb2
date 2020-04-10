
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

    else {
        deleteMgs(passDiv)
        passDiv.children[1].style.borderColor = 'blue'
    }

    mgs = ''


}

//elements

let formElement = document.querySelector('.js-login-form')

// let password = formElement.querySelector('#password')
let emailDiv = formElement.children[0]
let passDiv = formElement.children[1]
let remeberDiv=formElement.children[2]


//remember div
password.addEventListener('input',()=>{
    remeberDiv.style.display='block'
    localStorage.setItem('remember','false')


    remeberDiv.addEventListener("change", function (e) {
        // console.log("Email confirmation request: " + e.target.checked);
        if(e.target.checked){

            localStorage.setItem('remember','true')
            localStorage.setItem('email',email.value)
            localStorage.setItem('password',password.value)
        }

    });
})

//remember me if true
email.addEventListener('focus',(e)=>{
    if(localStorage.remember){
        email.value=localStorage.email
        password.value=localStorage.password
    }
})

//2-form submit validation
//DD - validation
formElement.addEventListener('submit', (e) => {
    e.preventDefault()

    //faut ajouter BDD validation
    formValidation(formElement)

})




