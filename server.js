const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

// Configuración de CORS más específica
app.use(cors({
    origin: '*', // En producción, especifica los orígenes permitidos
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Domu-API-Key']
}));

// Middleware para procesar JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname)));

// Middleware para manejar preflight requests
app.options('*', cors());

// Ruta para proxy de la API
app.post('/api/calls', async (req, res) => {
    try {
        const response = await fetch('https://api.domu.ai/calls', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Domu-API-Key': req.headers['domu-api-key']
            },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});