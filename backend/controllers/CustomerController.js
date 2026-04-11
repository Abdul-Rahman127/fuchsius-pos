const Customer = require('../models/CustomerModel');

// GET all customers (with optional search)
const getCustomers = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { firstName: { $regex: search, $options: 'i' } },
          { lastName:  { $regex: search, $options: 'i' } },
          { email:     { $regex: search, $options: 'i' } },
          { phone:     { $regex: search, $options: 'i' } },
        ],
      };
    }

    const customers = await Customer.find(query).sort({ createdAt: -1 });

    const total      = await Customer.countDocuments();
    const active     = await Customer.countDocuments({ status: 'Active' });
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const addedThisMonth = await Customer.countDocuments({ createdAt: { $gte: startOfMonth } });

    res.json({
      success: true,
      stats: { total, active, addedThisMonth },
      customers,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET single customer by customerId
const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findOne({ customerId: req.params.id });
    if (!customer) return res.status(404).json({ success: false, message: 'Customer not found' });

    const totalSpent   = customer.purchases.reduce((sum, p) => sum + p.amount, 0);
    const lastPurchase = customer.purchases.length
      ? customer.purchases[customer.purchases.length - 1].date
      : null;

    res.json({
      success: true,
      customer,
      summary: {
        totalPurchases: customer.purchases.length,
        totalSpent,
        lastPurchase,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST create new customer
const createCustomer = async (req, res) => {
  try {
    const { firstName, lastName, phone, email, status, city, address } = req.body;

    if (!firstName || !lastName || !phone) {
      return res.status(400).json({ success: false, message: 'firstName, lastName, phone are required' });
    }

    const customer = new Customer({ firstName, lastName, phone, email, status, city, address });
    await customer.save();

    res.status(201).json({ success: true, customer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT update customer
const updateCustomer = async (req, res) => {
  try {
    const { firstName, lastName, phone, email, status, city, address } = req.body;

    const customer = await Customer.findOneAndUpdate(
      { customerId: req.params.id },
      { firstName, lastName, phone, email, status, city, address },
      { new: true, runValidators: true }
    );

    if (!customer) return res.status(404).json({ success: false, message: 'Customer not found' });

    res.json({ success: true, customer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE customer
const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOneAndDelete({ customerId: req.params.id });
    if (!customer) return res.status(404).json({ success: false, message: 'Customer not found' });

    res.json({ success: true, message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST send promotion
const sendPromotion = async (req, res) => {
  try {
    const { customerIds, title, message, discountCode, method } = req.body;

    if (!customerIds || customerIds.length === 0) {
      return res.status(400).json({ success: false, message: 'No recipients selected' });
    }

    const customers = await Customer.find({ customerId: { $in: customerIds } });

    // TODO: Connect Nodemailer / SMS gateway here
    const recipients = customers.map(c => ({
      id: c.customerId,
      name: `${c.firstName} ${c.lastName}`,
      email: c.email,
      phone: c.phone,
    }));

    res.json({
      success: true,
      message: `Promotion sent to ${recipients.length} customer(s)`,
      recipients,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  sendPromotion,
};