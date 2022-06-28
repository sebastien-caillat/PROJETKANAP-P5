const getOrderId = () => {
    const orderId = document.getElementById("orderId");
    orderId.textContent = localStorage.getItem("orderId");
    console.log(orderId.textContent);
    localStorage.clear();
}

getOrderId();