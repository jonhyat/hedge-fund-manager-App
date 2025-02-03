const express = require('express');
const path = require('path');
const app = express();
const port = 3001;  // Changed to a specific port

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));  // Changed to use 'public' directory

// API Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date() });
});

app.get('/api/portfolio', (req, res) => {
    // Mock portfolio data
    res.json({
        totalValue: 1000000,
        holdings: [
            { symbol: 'AAPL', shares: 100, value: 150000 },
            { symbol: 'GOOGL', shares: 50, value: 120000 },
            { symbol: 'MSFT', shares: 200, value: 180000 }
        ],
        performance: {
            daily: 2.5,
            weekly: 5.0,
            monthly: 12.0,
            yearly: 25.0
        }
    });
});

app.get('/api/trades', (req, res) => {
    // Mock trades data
    res.json({
        trades: [
            { id: 1, symbol: 'AAPL', type: 'BUY', shares: 50, price: 150.00, timestamp: new Date() },
            { id: 2, symbol: 'GOOGL', type: 'SELL', shares: 25, price: 2800.00, timestamp: new Date() }
        ]
    });
});

// New endpoints
app.get('/api/analytics', (req, res) => {
    res.json({
        riskMetrics: {
            sharpeRatio: 1.8,
            beta: 0.85,
            alpha: 0.12,
            volatility: 0.15
        },
        topPerformers: [
            { symbol: 'AAPL', return: 25.5 },
            { symbol: 'MSFT', return: 20.1 },
            { symbol: 'GOOGL', return: 18.7 }
        ],
        sectorAllocation: [
            { sector: 'Technology', allocation: 45 },
            { sector: 'Healthcare', allocation: 25 },
            { sector: 'Finance', allocation: 20 },
            { sector: 'Consumer', allocation: 10 }
        ]
    });
});

app.get('/api/investors', (req, res) => {
    res.json({
        totalInvestors: 150,
        totalAUM: 250000000,
        investors: [
            { id: 1, type: 'Institutional', aum: 50000000 },
            { id: 2, type: 'High Net Worth', aum: 25000000 },
            { id: 3, type: 'Retail', aum: 10000000 }
        ]
    });
});

app.post('/api/trades/new', (req, res) => {
    // Mock trade execution
    const { symbol, type, shares, price } = req.body;
    res.json({
        success: true,
        trade: {
            id: Math.floor(Math.random() * 1000),
            symbol,
            type,
            shares,
            price,
            timestamp: new Date()
        }
    });
});

// Basic route to test server
app.get('/', (req, res) => {
    res.send('Hello! Server is working on port 3001');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Visit http://localhost:${port} to view the app`);
    console.log(`API endpoints available at:`);
    console.log(`  - http://localhost:${port}/api/health`);
    console.log(`  - http://localhost:${port}/api/portfolio`);
    console.log(`  - http://localhost:${port}/api/trades`);
    console.log(`  - http://localhost:${port}/api/analytics`);
    console.log(`  - http://localhost:${port}/api/investors`);
}).on('error', (err) => {
    console.error('Error starting server:', err.message);
}); 