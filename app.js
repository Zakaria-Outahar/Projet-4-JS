const affichage = document.querySelector('.affichage');
const btns = document.querySelectorAll('button');
const inputs = document.querySelectorAll('input');
const infoTxt = document.querySelector('.info-txt');
let dejaFait = false;

const today = new Date();
const nextWeek = new Date(today.getTime() + 7*24*60*60*1000);
let day = ('' + nextWeek).slice(8,10);
let month = ('0' + (today.getMonth() + 1));
let year = today.getFullYear();

document.querySelector('input[type=date]').value = `${year}-${month}-${day}`;


btns.forEach(btn => {
    btn.addEventListener('click', btnAction);
})

function btnAction(e){
    let nvObj = {};
    inputs.forEach(input => {
        let attrName = input.getAttribute('name');
        let attrValeur = attrName !== "cookieExpire" ? input.value : input.valueAsDate;
        nvObj[attrName] = attrValeur;
    })

    let description = e.target.getAttribute('data-cookie');

    if(description === "generer"){
        genererCookie(nvObj.cookieName, nvObj.cookieValue, nvObj.cookieExpire);
    } else if(description === "toutAfficher"){
        listeCookies();
    }
}

function genererCookie(name, value, exp){
    infoTxt.innerText = "";

    let cookies = document.cookie.split(';')
    cookies.forEach(cookie => {
        cookie = cookie.trim();
        let formatCookie = cookie.split('=');
        if(formatCookie[0] === encodeURIComponent(name)){
            dejaFait = true;
        }
    })
    
    if(dejaFait){
        infoTxt.innerText = "Erreur : un cookie possède déjà ce nom"
        dejaFait = false;
        return;
    }

    if(name.length === 0){
        infoTxt.innerText = "Impossible de définir un cookie sans nom.";
        return;
    }

    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)};expires=${exp.toUTCString()}`;

    let info = document.createElement('li');
    info.innerText = `Cookie ${name} généré.`;
    affichage.appendChild(info);
    setTimeout(() => info.remove(), 1500)
}