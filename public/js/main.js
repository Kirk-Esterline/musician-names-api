const updateButton = document.querySelector('#update-button')
let likeOne = document.getElementsByClassName('like')
let dislikeOne = document.getElementsByClassName('dislike')
const deleteOne = document.getElementsByClassName('delete')
let sortAscend = document.querySelector('#sortA').addEventListener('click', sortA)
let sortDescend = document.querySelector('#sortD').addEventListener('click', sortD)

let currentStageName = document.querySelector('#currentStageName').value
let updatedStageName = document.querySelector('#updatedStageName').value
let updatedBirthName = document.querySelector('#updatedBirthName').value
let updatedAge = document.querySelector('#updatedAge').value

Array.from(likeOne).forEach((element) =>{
    element.addEventListener('click', addOneLike)
})

Array.from(dislikeOne).forEach(element => {
    element.addEventListener('click', removeOneLike)
})

Array.from(deleteOne).forEach(element => {
    element.addEventListener('click', deleteMusician)
})

async function sortA() {
    try {
        const response = await fetch('sortA', {
            method: 'get',
        })
        const data = await response.json
        console.log(data)
        // location.reload()
        alert('reload A')
    }
    catch(error){console.error(error)}
}

async function sortD() {
    try {
        const response = await fetch('sortD', {
            method: 'get',
        })
        const data = await response.json
        console.log(data)
        // location.reload()
        alert('reload D')
    }
    catch(error){console.error(error)}
}

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

async function removeOneLike() {
    const sName = this.parentNode.childNodes[1].innerText
    try {
        const response = await fetch('removeOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'stageName': sName})
        })
        const data = await response.json
        console.log(data)
        location.reload()
    }
    catch(err){console.error(err)}
}

async function deleteMusician() {
    const sName = this.parentNode.childNodes[1].innerText
    try {
        const response = await fetch('deleteMusician', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'stageName': sName})
        })
        const data = await response.json
        alert('Musician was deleted!')
        location.reload()
    }
    catch(err){console.error(err)}
}