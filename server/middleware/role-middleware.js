

function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !req.user.roles) {
      return res.status(403).json({ success: false, message: 'Forbidden: No user roles found' });
    }
    // user.roles is an array of numbers (e.g., [1,2,3]) or strings (e.g., ["2","3"])
    const userRoles = Array.isArray(req.user.roles) ? req.user.roles : [req.user.roles];
    // Convert both userRoles and allowedRoles to strings for comparison
    const userRolesStr = userRoles.map(r => String(r));
    const allowedRolesStr = allowedRoles.map(r => String(r));
    const hasRole = allowedRolesStr.some(role => userRolesStr.includes(role));
    if (!hasRole) {
      return res.status(403).json({ success: false, message: 'Forbidden: Insufficient role' });
    }
    next();
  };
}

module.exports = authorizeRoles;
