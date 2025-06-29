const { Convention } = require('../models');
const jwt = require('jsonwebtoken');

exports.signConvention = async (req, res) => {
    try {
        const token = req.params.token;


        console.log('SignatureController: Token reçu:', token ? `${token.substring(0, 30)}...` : 'N/A');


        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id_convention, role } = decoded;

        console.log(`SignatureController: Tentative de signature pour Convention ID: ${id_convention}, Rôle: ${role}`);

        const convention = await Convention.findByPk(id_convention);
        if (!convention) {
            console.warn(`SignatureController: Convention introuvable pour ID: ${id_convention}`);
            return res.status(404).json({ error: 'Convention introuvable' });
        }

        let currentSignatures = convention.signatures || {}; 
        const updatedSignatures = { ...currentSignatures };

        if (updatedSignatures[role] && updatedSignatures[role].signe) {
            console.log(`SignatureController: Cette partie (${role}) a déjà signé pour Convention ID: ${id_convention}`);
            return res.status(400).json({ message: `Cette partie (${role}) a déjà signé.` });
        }

        updatedSignatures[role] = {
            signe: true,
            date: new Date().toISOString(),
            ip: req.ip || req.headers['x-forwarded-for'],
            agent: req.headers['user-agent'] || null
        };
        
        convention.signatures = updatedSignatures;
        
        await convention.save();

        console.log(`SignatureController: Signature enregistrée avec succès pour le rôle : ${role}, Convention ID: ${id_convention}`);
        res.status(200).json({ message: `Signature enregistrée pour le rôle : ${role}` });

    } catch (err) {
        console.error('SignatureController: Erreur lors de la signature :', err);

        if (err.name === 'JsonWebTokenError') {
            res.status(400).json({ error: `Token invalide ou expiré: ${err.message}` });
        } else {
            res.status(500).json({ error: 'Erreur serveur interne lors de la signature.' });
        }
    }
};
