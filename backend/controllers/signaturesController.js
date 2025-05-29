const { Convention } = require('../models');
const jwt = require('jsonwebtoken');

exports.signConvention = async (req, res) => {
  try {
    const token = req.params.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id_convention, role } = decoded;

    const convention = await Convention.findByPk(id_convention);
    if (!convention) return res.status(404).json({ error: 'Convention introuvable' });

    if (!convention.signatures) convention.signatures = {};

    convention.signatures[role] = {
      signe: true,
      date: new Date().toISOString(),
      ip: req.ip || req.headers['x-forwarded-for'],
      agent: req.headers['user-agent'] || null
    };
  console.log('🎯 decoded:', decoded);
  console.log('📄 current signatures:', convention.signatures);
  console.log('🖊️ ajout de la signature pour :', role);


    await Convention.update(
      { signatures: convention.signatures },
      { where: { id: convention.id } }
    );


    await convention.save();
    res.status(200).json({ message: `Signature enregistrée pour ${role}` });
  console.log('✅ updated signatures:', convention.signatures);

  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Token invalide ou expiré' });
  }
};
