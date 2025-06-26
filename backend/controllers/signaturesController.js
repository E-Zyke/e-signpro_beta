const { Convention } = require('../models'); // Assurez-vous que Convention est correctement exporté
const jwt = require('jsonwebtoken');

exports.signConvention = async (req, res) => {
    try {
        const token = req.params.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id_convention, role } = decoded;

        const convention = await Convention.findByPk(id_convention);
        if (!convention) {
            return res.status(404).json({ error: 'Convention introuvable' });
        }


        if (!convention.signatures) {
            convention.signatures = {};
        }

        // Vérifie si ce rôle a déjà signé pour éviter des signatures multiples
        if (convention.signatures[role] && convention.signatures[role].signe) {
            return res.status(400).json({ message: `Cette partie (${role}) a déjà signé.` });
        }

        // Met à jour l'instance en mémoire
        convention.signatures[role] = {
            signe: true,
            date: new Date().toISOString(),
            ip: req.ip || req.headers['x-forwarded-for'],
            agent: req.headers['user-agent'] || null
        };

        await convention.save();

        res.status(200).json({ message: `Signature enregistrée pour le rôle : ${role}` });

    } catch (err) {
        console.error('Erreur lors de la signature de la convention :', err);
        res.status(400).json({ error: 'Token invalide ou expiré.' });
    }
};
