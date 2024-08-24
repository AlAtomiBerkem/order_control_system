const { Router } = require("express");
const controller = require("./controller/controller.js");
const router = Router();

// Маршруты для API
router.get("/api/menu", controller.getMenu);

router.get("/api/menu/:id", controller.getMenuById);

router.post("/api/orders", controller.postOrders);

router.put("/api/orders/:id", controller.uppDateOrderId);

router.delete("/api/orders/:id", controller.closeOrder);

router.get("/api/orders", controller.getOrder);

router.post("/api/waiters", controller.createWaiter);

router.get("/api/user/orders/:id", controller.getUserById);

router.get("/api/users", controller.getAllUsers);

router.get("/api/lastorder", controller.getLastOrder);

// Маршруты для страниц
router.get("/", (req, res) => {
  res.render("index", { title: "general page", active: "main" });
});

router.get("/menu", (req, res) => {
  res.render("menu_page", { title: "menu page", active: "menu" });
});

router.get("/orders", (req, res) => {
  res.render("orders_page", { title: "orders page", active: "orders" });
});

router.get("/orders/:id", (req, res) => {
  res.render("order_id_page", { title: "orders_id page", active: "orders_id" });
});

router.get("/admin", (req, res) => {
  res.render("admin_page", {title: "admin_page", active: "admin_page" })
})

module.exports = router;
