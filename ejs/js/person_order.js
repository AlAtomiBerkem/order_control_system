     const urlParams = new URLSearchParams(window.location.search);
     const waiterId = urlParams.get("waiterId");
     let dishIds = urlParams.get("dishIds");

     if (dishIds) {
       dishIds = dishIds.split(",");
     } else {
       dishIds = [];
     }

     document.getElementById("orderDetails").innerHTML = `
       <p>Официант: ${waiterId}</p>
       <p>Блюда:</p>
       <ul>
         ${dishIds.map((dishId) => `<li>${dishId}</li>`).join("")}
       </ul>
     `