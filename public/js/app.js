console.log("Client side js")
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')

// msg1.textContent = 'dsads'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    msg2.textContent = ''
    msg1.textContent = 'Have Patience ....'
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error
                msg2.textContent = ''
                return
            }
            msg1.textContent = data.location
            msg2.textContent = data.fdata
        })
    })

})