let obj = localStorage.getItem('crud');
let data = JSON.parse(obj);
let base64String;
displayEliments(data);
resetSortIcons();
document.getElementById('productIdIcon').classList.remove('fa-sort');
document.getElementById('productIdIcon').classList.add('fa-sort-up');
function displayEliments(data) {
    console.log(data);
    let tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        tableBody.innerHTML += `<tr id="${i}">
        <td>${data[i]['productId']}</td>
        <td>${data[i]['productName']}</td>
        <td><img class="tableImage" src="${data[i]["image"]}" /></td>
        <td>${data[i]['price']}</td>
        <td>${data[i]['description']}</td>
        <td><button class="btn btn-outline-success" data-type="edit" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-val="${i}">  <i class="fa-solid fa-pencil"></i>  </button>  <button class="btn btn-outline-danger" data-type="delete" data-val="${i}">  <i class="fa-solid fa-trash"></i>  </button> </td></tr>`
    }
}
function resetSortIcons() {
    document.querySelectorAll('.sort').forEach(button => {
        button.classList.add("fa-sort");
        button.classList.remove("fa-sort-up");
        button.classList.remove("fa-sort-down");
        button.addEventListener('click', () => {
        })
    })

}
const fileInput = document.querySelector('#addImage');
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
        base64String = reader.result;
        console.log(base64String);
    };
    reader.readAsDataURL(file);
});
function sortAndDisplay(button) {
    let value = button.dataset.value;
    let sort = button.dataset.sort;
    let type = button.dataset.content;
    console.log(button.lastChild);
    resetSortIcons()
    button.lastChild.classList.remove("fa-sort");
    if (sort == "dsc") {
        button.lastChild.classList.add("fa-sort-up");
        button.dataset.sort = "asc";
        data = data.sort((a, b) => (type == 'number') ? a[value] - b[value] : String(a[value]).localeCompare(String(b[value])))
        acsDcs = 0;
    }
    else {
        button.lastChild.classList.add("fa-sort-down");
        button.dataset.sort = "dsc";
        button.setAttribute('data-sort', 'dsc');
        data = data.sort((a, b) => (type == 'number') ? b[value] - a[value] : String(b[value]).localeCompare(String(a[value])))
        acsDcs = 1;
    }
    displayEliments(data);
}
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        switch (button.dataset.type) {
            case 'delete':
                let id = button.dataset.val;
                data.splice(id, 1);
                console.log(data);
                let obj = JSON.stringify(data);
                localStorage.setItem('crud', obj)
                location.reload();
                break;

            case 'add-submit':
                let obj23 = localStorage.getItem('crud');
                data = JSON.parse(obj23)
                let pName = document.getElementById('addProductName').value;
                let pPrice = document.getElementById('addPrice').value;
                let pDescription = document.getElementById('addDescription').value;
                let productId = (data.length > 0) ? data[data.length - 1].productId + 1 : 1
                let newData = {
                    productId: productId,
                    productName: pName,
                    price: Number(pPrice),
                    description: pDescription,
                    image: base64String,
                }
                data.push(newData);
                console.log(data);
                let obj2 = JSON.stringify(data);
                localStorage.setItem('crud', obj2);
                break;

            case 'add-submit':
                
                break;
            case 'sorting':
                sortAndDisplay(button);
                break;
            default:
                break;
        }
    })
})