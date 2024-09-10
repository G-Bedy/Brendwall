document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('productForm');
    const tableBody = document.getElementById('productTable').querySelector('tbody');
    const errorDiv = document.createElement('div');
    errorDiv.style.color = 'red';
    form.prepend(errorDiv);

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    const csrftoken = getCookie('csrftoken');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const description = document.getElementById('description').value.trim();
        const price = parseFloat(document.getElementById('price').value);

        errorDiv.innerHTML = '';



        fetch('/api/v1/products/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({ name, description, price })
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    displayErrors(errorData);
                });
            }
            return response.json();
        })
        .then(product => {
            if (product) {
                fetchProducts();
                form.reset();
            }
        });
    });

    function displayErrors(errors) {
        let errorMessage = '';

        if (errors.name) {
            errorMessage += `Ошибка в названии: ${errors.name.join(', ')}<br>`;
        }
        if (errors.description) {
            errorMessage += `Ошибка в описании: ${errors.description.join(', ')}<br>`;
        }
        if (errors.price) {
            errorMessage += `Ошибка в цене: ${errors.price.join(', ')}<br>`;
        }

        if (errorMessage) {
            errorDiv.innerHTML = errorMessage;
        }
    }

    function fetchProducts() {
        fetch('/api/v1/products/')
            .then(response => response.json())
            .then(products => {
                tableBody.innerHTML = '';
                products.forEach(product => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${product.name}</td>
                        <td>${product.description}</td>
                        <td>${product.price}</td>
                    `;
                    tableBody.appendChild(row);
                });
            });
    }

    fetchProducts();
});
