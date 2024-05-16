import React, { useEffect } from 'react'

const ButtonPaypal = () => {

  useEffect(() => {
    const paypalButtonContainer = document.getElementById('paypal-button-container');

    if (!paypalButtonContainer) return; // Si el elemento no existe, no hagas nada

    paypal
      .Buttons({
        style: {
          color: 'blue',
          shape: 'pill',
          label: 'pay',
        },
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: 100,
                },
              },
            ],
          });
        },
        onApprove: function (data, actions) {
          actions.order.capture().then(function (details) {
            console.log(details);
          });
        },
        onCancel: function (data) {
          alert('Pago cancelado');
        },
      })
      .render('#paypal-button-container');

    // Limpiar el contenido del contenedor cuando el componente se desmonte
    return () => {
      paypalButtonContainer.innerHTML = '';
    };
  }, []); // Agrega un array vacío como segundo argumento para que el efecto solo se ejecute una vez

  return <div id="paypal-button-container" className="button-pago"></div>;
}

export default ButtonPaypal
