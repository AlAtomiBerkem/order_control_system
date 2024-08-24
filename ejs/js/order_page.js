document.addEventListener("DOMContentLoaded", () => {
  const waiterSelect = document.getElementById("waiter");
  const dishesContainer = document.getElementById("dishesContainer");
  const orderForm = document.getElementById("orderForm");
  const errorMessage = document.getElementById("errorMessage");

  async function loadWaiters() {
    try {
      const response = await fetch("/api/users");
      if (!response.ok) {
        throw new Error("Не удалось получить список официантов");
      }
      const waiters = await response.json();
      waiters.forEach((waiter) => {
        const option = document.createElement("option");
        option.value = waiter.id;
        option.textContent = waiter.name;
        waiterSelect.appendChild(option);
      });
    } catch (error) {
      displayError(error.message);
    }
  }

  async function loadMenu() {
    try {
      const response = await fetch("/api/menu");
      if (!response.ok) {
        throw new Error("Не удалось загрузить меню");
      }
      const menuItems = await response.json();
      const dishSelects = document.querySelectorAll(".dish-select");
      dishSelects.forEach((select) => {
        menuItems.forEach((dish) => {
          const option = document.createElement("option");
          option.value = dish.id;
          option.textContent = dish.title;
          select.appendChild(option);
        });
      });
    } catch (error) {
      displayError(error.message);
    }
  }

  function displayError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
  }

  orderForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(orderForm);
    const data = {
      isActive: true, 
      items: [], 
      userId: formData.get("waiter"),
      itemId: formData.get("dish[]"), 
    };

    formData.forEach((value, key) => {
      if (key.startsWith("dish_")) {
        data.items.push(parseInt(value, 10));
      }
    });

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Не удалось отправить заказ");
      }

      const result = await response.json();
      const orderId = result.id;

      window.location.href = `/orders/${orderId}`;
    } catch (error) {
      displayError(error.message);
    }
  });

  loadWaiters();
  loadMenu();
});

