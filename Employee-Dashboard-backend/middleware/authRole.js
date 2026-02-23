function checkRole(requiredRole) {
  return (req, res, next) => {
    const { role } = req.query;
    console.log(role  )

    if (!role) {
      return res.status(401).json({ message: "Role missing" });
    }

    if (role !== requiredRole) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
}

module.exports = { checkRole };