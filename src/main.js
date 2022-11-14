import "./css/index.css"
import IMask from "imask"

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccLogoType = document.querySelector(".cc-logo span:nth-child(2) img")

//imput number <
const imputNumber = document.querySelector("#card-number")
const numberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardtype: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardtype: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "default",
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })
    return foundMask
  },
}
const numberMasked = IMask(imputNumber, numberPattern)

numberMasked.on("accept", () => {
  const cardtype = numberMasked.masked.currentMask.cardtype
  setCardType(cardtype)
  updateNumber(numberMasked.value)
})

function updateNumber(number) {
  const ccNumberCard = document.querySelector(".cc-number")
  ccNumberCard.innerText = number.length === 0 ? "1234 5678 9123 4567" : number
}

//imput number />

//imput expirationDate <
const imputExpirationDate = document.querySelector("#expiration-date")
const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 6).slice(2),
    },
  },
}
const expirationDateMasked = IMask(imputExpirationDate, expirationDatePattern)

expirationDateMasked.on("accept", () => {
  updateExpirationDate(expirationDateMasked.value)
})

function updateExpirationDate(expiration) {
  const ccExpirationDate = document.querySelector(".cc-expiration .value")
  ccExpirationDate.innerText = expiration.length === 0 ? "02/32" : expiration
}
//imput expirationdate />

//imput cvc <
const imputSecurityCode = document.querySelector("#security-code")
const securityCodePattern = {
  mask: "0000",
}
const securityCodeMasked = IMask(imputSecurityCode, securityCodePattern)

securityCodeMasked.on("accept", () => {
  updateSecurityCode(securityCodeMasked.value)
})

function updateSecurityCode(code) {
  const ccSecurity = document.querySelector(".cc-security .value")
  ccSecurity.innerText = code.length === 0 ? "123" : code
}

//imput cvc />

//card type <
function setCardType(type) {
  const colors = {
    visa: ["#436D99", "#2D57F2"],
    mastercard: ["#DF6F29", "#C69347"],
    default: ["black", "gray"],
  }

  ccBgColor01.setAttribute("fill", colors[type][0])
  ccBgColor02.setAttribute("fill", colors[type][2])
  ccLogoType.setAttribute("src", `cc-${type}.svg`)
}

globalThis.setCardType = setCardType

//card type />

//button event <

const addButton = document.querySelector("#addCard")

addButton.addEventListener("click", () => {
  console.log("clicked")
  alert("clicked")
})

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault()
})

//button event />

//input name <

const cardHolder = document.querySelector("#card-holder")
cardHolder.addEventListener("input", () => {
  const ccHolder = document.querySelector(".cc-holder .value")
  ccHolder.innerText =
    cardHolder.value.length === 0 ? "FULANO DA SILVA" : cardHolder.value
})

//input name />
