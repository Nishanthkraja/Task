const express = require("express");
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json()); // Middleware to parse JSON requests

// Simulated user database (for demo purposes)
let users = [];

// Route to register a new user (hash password before storing)
app.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Generate salt and hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Store user with hashed password
        users.push({ username, password: hashedPassword });

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user" });
    }
});

// Route to login (verify hashed password)
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user in database
        const user = users.find((user) => user.username === username);
        if (!user) return res.status(400).json({ message: "User not found" });

        // Compare password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        res.status(200).json({ message: "Login successful!" });
    } catch (error) {
        res.status(500).json({ message: "Error logging in" });
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
