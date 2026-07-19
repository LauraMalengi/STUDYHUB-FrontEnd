require('dotenv').config(); 
const express = require("express");
const bcrypt = require("bcrypt");
const base64 = require("base-64");
const {MongoClient,ObjectId}=require("mongodb");
const app = express();
app.use(express.json());
const uri = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;
let client, db;

async function connectToMongo(){
    client = new MongoClient(uri);
    await client.connect();
    db = client.db("StudyHub");
    console.log("CONNECTED to mongo")
}

async function basicAuthMiddleware(req, res, next) {
  if (req.path === '/signup' || req.path === '/login') return next();
  
  if (!db) {
    return res.status(503).json({ error: 'Database not connected' });
  }

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Basic ')) {
      return res.status(401).json({ error: 'No Authorization' });
    }

    const encoded = authHeader.split(' ')[1];
    const [email, password] = base64.decode(encoded).split(':');
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Invalid credentials format' });
    }

    const user = await db.collection('user').findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    req.user = user;
    next();
  } catch (err) {
    console.error('Auth error:', err);
    res.status(500).json({ error: 'Authentication failed' });
  }
}

app.use(basicAuthMiddleware);

app.post('/signup', async (req, res) => {
  const { email, password, confirmPassword, role = 'user' } = req.body;
  if (!email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'Missing fields' });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const existingUser = await db.collection('user').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const result = await db.collection('user').insertOne({
      email,
      password: hashed,
      role,
      createdAt: new Date()
    });
    res.status(201).json({ message: 'User created', userId: result.insertedId });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Signup failed' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  try {
    const user = await db.collection('user').findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid login' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Wrong password' });

    const token = base64.encode(`${email}:${password}`);
    res.json({ message: 'Login success', token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Login failed' });
  }
});



// ================= USERS ===============

// GET ALL USERS
app.get("/user", async (req, res) => {
    try {
        const users = await db.collection("user").find().toArray();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET ONE USER
app.get("/user/:id", async (req, res) => {
    try {
        const user = await db.collection("user").findOne({
            _id: new ObjectId(req.params.id)
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// CREATE USER
app.post("/user", async (req, res) => {
    try {
        const result = await db.collection("user").insertOne(req.body);

        res.status(201).json({
            message: "User created",
            insertedId: result.insertedId
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// UPDATE USER
app.put("/user/:id", async (req, res) => {
    try {

        const result = await db.collection("user").updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body }
        );

        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// DELETE USER
app.delete("/user/:id", async (req, res) => {
    try {

        const result = await db.collection("user").deleteOne({
            _id: new ObjectId(req.params.id)
        });

        res.status(200).json({
            message: "User deleted",
            deletedCount: result.deletedCount
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


// ================= PRODUCTS =================

// GET ALL Product
app.get("/product", async (req, res) => {
    try {
        const users = await db.collection("product").find().toArray();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET ONE Product
app.get("/product/:id", async (req, res) => {
    try {
        const user = await db.collection("product").findOne({
            _id: new ObjectId(req.params.id)
        });

        if (!user) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// CREATE PRODUCT
app.post("/product", async (req, res) => {
    try {
        const result = await db.collection("product").insertOne(req.body);

        res.status(201).json({
            message: "Product created",
            insertedId: result.insertedId
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// UPDATE PRODUCT
app.put("/product/:id", async (req, res) => {
    try {

        const result = await db.collection("product").updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body }
        );

        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// DELETE PRODUCT
app.delete("/product/:id", async (req, res) => {
    try {

        const result = await db.collection("product").deleteOne({
            _id: new ObjectId(req.params.id)
        });

        res.status(200).json({
            message: "Product deleted",
            deletedCount: result.deletedCount
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


// ================= ORDERS =================
// GET ALL ORDERS
app.get("/order", async (req, res) => {
    try {
        const users = await db.collection("order").find().toArray();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET ORDER
app.get("/order/:id", async (req, res) => {
    try {
        const user = await db.collection("order").findOne({
            _id: new ObjectId(req.params.id)
        });

        if (!user) {
            return res.status(404).json({
                message: "order not found"
            });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// CREATE ORDER
app.post("/order", async (req, res) => {
    try {
        const result = await db.collection("order").insertOne(req.body);

        res.status(201).json({
            message: "Order created",
            insertedId: result.insertedId
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// UPDATE ORDER
app.put("/order/:id", async (req, res) => {
    try {

        const result = await db.collection("order").updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body }
        );

        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// DELETE ORDER
app.delete("/order/:id", async (req, res) => {
    try {

        const result = await db.collection("order").deleteOne({
            _id: new ObjectId(req.params.id)
        });

        res.status(200).json({
            message: "order deleted",
            deletedCount: result.deletedCount
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


// =============== CART ===============
// GET ALL CART
app.get("/cart", async (req, res) => {
    try {
        const users = await db.collection("cart").find().toArray();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET ONE CART
app.get("/cart/:id", async (req, res) => {
    try {
        const user = await db.collection("cart").findOne({
            _id: new ObjectId(req.params.id)
        });

        if (!user) {
            return res.status(404).json({
                message: "cart not found"
            });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// CREATE CART
app.post("/cart", async (req, res) => {
    try {
        const result = await db.collection("cart").insertOne(req.body);

        res.status(201).json({
            message: "cart created",
            insertedId: result.insertedId
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// UPDATE CART
app.put("/cart/:id", async (req, res) => {
    try {

        const result = await db.collection("cart").updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body }
        );

        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// DELETE CART
app.delete("/cart/:id", async (req, res) => {
    try {

        const result = await db.collection("cart").deleteOne({
            _id: new ObjectId(req.params.id)
        });

        res.status(200).json({
            message: "cart deleted",
            deletedCount: result.deletedCount
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


// =============== PAYMENTS ===============

// GET ALL PAYMENT
app.get("/payment", async (req, res) => {
    try {
        const users = await db.collection("payment").find().toArray();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET ONE PAYMENT
app.get("/payment/:id", async (req, res) => {
    try {
        const user = await db.collection("payment").findOne({
            _id: new ObjectId(req.params.id)
        });

        if (!user) {
            return res.status(404).json({
                message: "Payment not found"
            });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// CREATE PAYMENT
app.post("/payment", async (req, res) => {
    try {
        const result = await db.collection("payment").insertOne(req.body);

        res.status(201).json({
            message: "Payment created",
            insertedId: result.insertedId
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// UPDATE PAYMENT
app.put("/payment/:id", async (req, res) => {
    try {

        const result = await db.collection("payment").updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body }
        );

        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// DELETE PAYMENT
app.delete("/payment/:id", async (req, res) => {
    try {

        const result = await db.collection("payment").deleteOne({
            _id: new ObjectId(req.params.id)
        });

        res.status(200).json({
            message: "Payment deleted",
            deletedCount: result.deletedCount
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


// ================ REVIEWS ================

// GET ALL REVIEWS
app.get("/review", async (req, res) => {
    try {
        const users = await db.collection("review").find().toArray();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET ONE REVIEW
app.get("/review/:id", async (req, res) => {
    try {
        const user = await db.collection("review").findOne({
            _id: new ObjectId(req.params.id)
        });

        if (!user) {
            return res.status(404).json({
                message: "Review not found"
            });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// CREATE REVIEW
app.post("/review", async (req, res) => {
    try {
        const result = await db.collection("review").insertOne(req.body);

        res.status(201).json({
            message: "Review created",
            insertedId: result.insertedId
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// UPDATE REVIEW
app.put("/review/:id", async (req, res) => {
    try {

        const result = await db.collection("review").updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body }
        );

        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// DELETE REVIEW
app.delete("/review/:id", async (req, res) => {
    try {

        const result = await db.collection("review").deleteOne({
            _id: new ObjectId(req.params.id)
        });

        res.status(200).json({
            message: "Review deleted",
            deletedCount: result.deletedCount
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// =============== DELIVERY ===============

// GET ALL DELIVERY
app.get("/delivery", async (req, res) => {
    try {
        const users = await db.collection("delivery").find().toArray();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET ONE DELIVERY
app.get("/delivery/:id", async (req, res) => {
    try {
        const user = await db.collection("delivery").findOne({
            _id: new ObjectId(req.params.id)
        });

        if (!user) {
            return res.status(404).json({
                message: "Delivery not found"
            });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// CREATE DELIVERY
app.post("/delivery", async (req, res) => {
    try {
        const result = await db.collection("delivery").insertOne(req.body);

        res.status(201).json({
            message: "Delivery created",
            insertedId: result.insertedId
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// UPDATE DELIVERY
app.put("/delivery/:id", async (req, res) => {
    try {

        const result = await db.collection("delivery").updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body }
        );

        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// DELETE DELIVERY
app.delete("/delivery/:id", async (req, res) => {
    try {

        const result = await db.collection("delivery").deleteOne({
            _id: new ObjectId(req.params.id)
        });

        res.status(200).json({
            message: "delivery deleted",
            deletedCount: result.deletedCount
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// =============== WISHLIST ===============

// GET ALL WISHLIST
app.get("/wishlist", async (req, res) => {
    try {
        const users = await db.collection("wishlist").find().toArray();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET ONE WISHLIST
app.get("/wishlist/:id", async (req, res) => {
    try {
        const user = await db.collection("wishlist").findOne({
            _id: new ObjectId(req.params.id)
        });

        if (!user) {
            return res.status(404).json({
                message: "Wishlist not found"
            });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// CREATE WISHLIST
app.post("/wishlist", async (req, res) => {
    try {
        const result = await db.collection("wishlist").insertOne(req.body);

        res.status(201).json({
            message: "Wishlist created",
            insertedId: result.insertedId
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// UPDATE WISHLIST
app.put("/wishlist/:id", async (req, res) => {
    try {

        const result = await db.collection("wishlist").updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body }
        );

        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// DELETE WISHLIST
app.delete("/wishlist/:id", async (req, res) => {
    try {

        const result = await db.collection("wishlist").deleteOne({
            _id: new ObjectId(req.params.id)
        });

        res.status(200).json({
            message: "Wishlist deleted",
            deletedCount: result.deletedCount
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


// SERVER
app.listen(PORT, async() => {
    await connectToMongo();
    console.log(`Server running on port ${PORT}`);
});
