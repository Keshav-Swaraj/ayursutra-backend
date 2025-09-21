export const isDoctor = (req, res, next) => {
    if (req.user && req.user.role === 'doctor') {
      next(); // User is a doctor, proceed
    } else {
      res.status(403).json({ message: 'Not authorized as a doctor' });
    }
  };