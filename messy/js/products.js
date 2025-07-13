fetch('https://nadstarr.com/wp-json/wc/store/products')
  .then(response => response.json())
  .then(products => {
    const list = document.getElementById('product-list');
    products.forEach(product => {
      const item = document.createElement('div');
      item.className = 'product';
      item.innerHTML = `
        <h2>${product.name}</h2>
        <img src="${product.images[0]?.src || ''}" alt="${product.name}">
        <p>Price: ${product.prices.price} ${product.prices.currency_code}</p>
      `;
      list.appendChild(item);
    });
  })
  .catch(error => {
    console.error('Error fetching products:', error);
  });
