const updateButton = document.querySelector('#update-button')
let currentStageName = document.querySelector('#currentStageName').value
let updatedStageName = document.querySelector('#updatedStageName').value
let updatedBirthName = document.querySelector('#updatedBirthName').value
let updatedAge = document.querySelector('#updatedAge').value

updateButton.addEventListener('click', _ => {
    fetch('/musicians', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            currentStageName: currentStageName,
            updatedStageName: updatedStageName ? updatedStageName : null,
            updatedBirthName: updatedBirthName ? updatedBirthName : null,
            updatedAge: updatedAge ? updatedAge : null
        })
    })
})