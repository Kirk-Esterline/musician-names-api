const updateButton = document.querySelector('#update-button')
let likeOne = document.getElementsByClassName('like')
const dislikeOne = document.querySelector('.dislike')
const deletOne = document.querySelector('delete')

Array.from(likeOne).forEach((element) =>{
    element.addEventListener('click', addOneLike)
})

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

async function addOneLike() {
    const sName = this.parentNode.childNodes[1].innerText
    try {
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify({
                'stageName': sName
            })
        })
        const data = await response.json
        console.log(data)
        location.reload()
    }
    catch(err){
        console.error(err)
    }
}