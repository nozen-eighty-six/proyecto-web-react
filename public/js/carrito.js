paypal
.Buttons({
  style: {
    color: "blue",
    shape: "pill",
    lable: "pay",
  },
  createOrder: function (data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
           value: 100
            // value: parseInt(totalElement.textContent),
          },
        },
      ],
    });
  },
  //Cuando se realiza el pago
  onApprove: function (data, actions) {
    //Que es data? Es el parámetro que recibe toda la información que
    //se está realizando.
    actions.order.capture().then(function (detalles) {
      //Que representa "detalles"
      //toda la información de nuestro pago
      console.log(detalles);
      //guardarVenta();
      //  window.location.href = "/proyecto-web-ventas/index.html";
    });
  },
  //Se dispara cuando el usuario cancela el pago
  onCancel: function (data) {
    alert("Pago cancelado");
   // console.log(totalElement.textContent);
  },
})
.render("#paypal-button-container");