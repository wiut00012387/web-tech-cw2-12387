async function getUsers() {
    let url = 'http://localhost:9000/students';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderUsers() {
    let users = await getUsers();
    let html = '';
    if (users.length === 0) {
        let title = document.querySelector('.title')
        title.classList.add('title-none')
        let container = document.querySelector('.container');
        let table = document.querySelector('.table');
        container.classList.add('block')
        table.remove()
        let htmlSegment = `
        <h2 class="no-student">No Student!!!</h2>
        `
        html += htmlSegment;
    } else {
        users.forEach(user => {
            let htmlSegment = `
            <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.gender}</td>
            <td>${user.status}</td>
            <td>${user.age}</td>   
            <td>
            <button 
            
            onclick="updateName('${encodeURIComponent(JSON.stringify(user))}')" 
            type="button">
            <img src="./images/pencil_icon.png"  alt="">
            </button>
            <button id="${user.id}" onclick="deleteName(this.id)" type="button"><img src="./images/delete_icon.png" alt=""></button>
            </td>
            </tr>
            
            `;

            html += htmlSegment;
        });


    }
    let table = document.querySelector('.tbody');
    table.innerHTML = html;

}

renderUsers();
const deleteName = (id) => {
    fetch('http://localhost:9000/students/delete/' + id, {
            method: 'DELETE',
        }).then(res => res.text())
        .then(res => console.log(res))
        .then(() => {
            location.reload()
        })
}
const updateName = (obj) => {
    obj = JSON.parse(decodeURIComponent(obj))
    form.classList.add('inline')
    document.querySelector('.close').remove()
    document.querySelector('.name').value = obj.name
    document.querySelector('.email').value = obj.email
    document.querySelector('.gender').value = obj.gender
    document.querySelector('.status').value = obj.status
    document.querySelector('.age').value = obj.age
    document.querySelector('.text').textContent = "Edit Student"
    document.querySelector('.btn').textContent = "Edit"
    document.querySelector('.user-id').textContent = `${obj.id}`
}

let form = document.querySelector('#form')
form.addEventListener("submit", formSubmit);
let add = document.querySelector('.add-user');
let close = document.querySelector('.close');
add.addEventListener('click', function() {
    form.classList.toggle('none')
})
close.addEventListener('click', function() {
    form.classList.toggle('none')
})


function formSubmit(e) {

    const btn = document.getElementById('form-btn')
    const id = Number(document.querySelector('.user-id').textContent)


    e.preventDefault()
    const name = document.querySelector('.name').value
    const email = document.querySelector('.email').value
    const gender = document.querySelector('.gender').value
    const status = document.querySelector('.status').value
    const age = document.querySelector('.age').value

    const data = { name, email, gender, status, age };

    if (btn.innerText === "Add") {
        fetch('http://localhost:9000/students/create', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                location.reload()
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    } else {
        fetch(`http://localhost:9000/students/update/${id}`, {
                method: 'PATCH', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, gender, status, age }),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                location.reload()
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


}