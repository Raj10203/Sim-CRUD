let obj = localStorage.getItem('crud');
let data = JSON.parse(obj);
let acsDcs = 0;
let productId = 1;
displayEliments(data);
function displayEliments(data) {
    console.log(data);
    let body = document.getElementById('tableBody');
    body.innerHTML = ""
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        body.innerHTML += `<tr id="${i}">
        <td>${data[i]['productId']}</td>
        <td>${data[i]['productName']}</td>
        <td><img class="tableImage" src="${data[i]["image"]}" /></td>
        <td>${data[i]['price']}</td>
        <td>${data[i]['description']}</td>
        <td><button class="btn btn-outline-success" data-type="edit" data-val="${i}">  <i class="fa-solid fa-pencil"></i>  </button>  <button class="btn btn-outline-danger" data-type="delete" data-val="${i}">  <i class="fa-solid fa-trash"></i>  </button> </td></tr>`
    }
}
document.querySelectorAll('.sort').forEach(button=>{
    button.classList.add("fa-sort");
    button.addEventListener('click',()=>{
    })
})
const fileInput = document.querySelector('#addImage');
let base64String;
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
        base64String = reader.result;
        console.log(base64String);
    };
    reader.readAsDataURL(file);
});
function sortAndDisplay(type) {
    if (acsDcs) {
        data = data.sort((a,b) => (type=='productId' || type == 'price')?a[type] - b[type] : String(a[type]).localeCompare(String(b[type])))
        acsDcs = 0;
    }
    else {
        data = data.sort((a,b) => (type=='productId' || type == 'price')?b[type] - a[type] : String(b[type]).localeCompare(String(a[type])))
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
                productId = (data.length > 0) ? data[data.length - 1].productId +1 : 1
                

                
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

            case 'sorting':
                sortAndDisplay(button.dataset.value);
                break;
            default:
                break;
        }
    })
})