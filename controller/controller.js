const {
  MenuItem,
  Order,
  User,
  Users,
} = require("../sequelize//models/index.js");

//GET запрос на получение menu
const getMenu = async (req, res) => {
  try {
    const menuItems = await MenuItem.findAll();
    console.log(menuItems);
    res.status(201).json(menuItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при получении данных меню" });
  }
};

//GET запрос на получение одного блюда по его id
const getMenuById = async (req, res) => {
  try {
    const { id } = req.params;
    const menuItem = await MenuItem.findByPk(id);

    if (!menuItem) {
      return res
        .status(404)
        .json({ error: "Не удалось найти блюдо по такому ID" });
    }

    res.status(200).json(menuItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при получении блюда по ID" });
  }
};

//GET запрос на получение заказов оффицианта по username
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await Users.findByPk(id);

    if (!users) {
      return res.status(404).json({ error: "Error User not found" });
    }
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};

//GET запрос на получение всех пользователей
const getAllUsers = async (req, res) => {
  try {
    const usersAll = await Users.findAll();
    res.status(200).json(usersAll);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Ошибка при получении списка пользователей" });
  }
};

// GET запрос на получение списоков всех заказов
const getOrder = async (req, res) => {
  try {
    const orders = await Order.findAll();
    console.log(orders);
    res.status(201).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Не удалось получить список заказов" });
  }
};

//GET запрос для получения полседнего созданного заказа
const getLastOrder = async (req, res) => {
  try {
    const lastOrder = await Order.findOne({
      order: [['createdAt', 'DESC']]
    });
    if (lastOrder) {
      res.status(200).json(lastOrder);
    } else {
      res.status(404).json({ error: "no orders" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Не удалось получить последний заказ" });
  }
};

// POST запрос нас создания заказа
const postOrders = async (req, res) => {
  try {
    const { items, userId, isActive, itemId } = req.body;
    const createOrder = await Order.create({
      items,
      userId,
      isActive,
      itemId,
    });
    console.log(createOrder);
    res.status(201).json(createOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при создании нового заказа" });
  }
};

// PUT запрос на изменинение  заказа.
const uppDateOrderId = async (req, res) => {
  try {
    const { items, isActive } = req.body;
    const { id } = req.params;
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ error: "Заказ не найден" });
    }

    if (isActive === false) {
      return res
        .status(400)
        .json({ error: "Заказ завершен и не может быть изменен" });
    }

    await order.update({ items, isActive });
    console.log(order);
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Не удалось изменить заказ" });
  }
};
// PUT запрос позволяющий закрыть заказ
const closeOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ error: "Заказ не найден" });
    }

    if (order.isActive === false) {
      return res.status(400).json({ error: "Заказ уже закрыт" });
    }

    order.isActive = false;
    await order.save();
    console.log(order);
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Не удалось закрыть заказ" });
  }
};

// POST /waiters —  возможность добавить нового сотрудника
const createWaiter = async (req, res) => {
  try {
    const { name, orders, role } = req.body;
    const waiter = await User.create({ name, orders, role });

    console.log(waiter);
    res.status(201).json(waiter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Не получилось добавить нового сотрудника" });
  }
};

module.exports = {
  getMenu,
  getOrder,
  postOrders,
  uppDateOrderId,
  closeOrder,
  createWaiter,
  getUserById,
  getAllUsers,
  getMenuById,
  getLastOrder
};
