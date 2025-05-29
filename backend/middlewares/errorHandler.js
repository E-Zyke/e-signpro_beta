const errorHandler = (err, req, res, next) => {
  console.error('🚨 Erreur:', err.stack);
  
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ message: 'Token invalide' });
  }
  
  if (err.code === '23505') { // Contrainte unique PostgreSQL
    return res.status(409).json({ message: 'Données déjà existantes' });
  }
  
  res.status(500).json({ 
    message: 'Erreur serveur',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;
