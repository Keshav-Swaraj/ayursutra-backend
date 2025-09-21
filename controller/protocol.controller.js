import Protocol from '../model/protocol.model.js';

// @desc    Create a new protocol
// @route   POST /api/protocols
// @access  Private/Doctor
export const createProtocol = async (req, res) => {
  const { name, description, dosha, phases } = req.body;
  try {
    const protocol = await Protocol.create({
      user: req.user._id,
      name,
      description,
      dosha,
      phases,
    });
    res.status(201).json(protocol);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all protocols for a doctor
// @route   GET /api/protocols
// @access  Private/Doctor
export const getProtocols = async (req, res) => {
  try {
    const protocols = await Protocol.find({ user: req.user._id });
    res.json(protocols);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a protocol
// @route   PUT /api/protocols/:id
// @access  Private/Doctor
export const updateProtocol = async (req, res) => {
    const { name, description, dosha, status, phases } = req.body;
  
    try {
      const protocol = await Protocol.findById(req.params.id);
  
      if (protocol && protocol.user.toString() === req.user._id.toString()) {
        protocol.name = name || protocol.name;
        protocol.description = description || protocol.description;
        protocol.dosha = dosha || protocol.dosha;
        protocol.status = status || protocol.status;
        protocol.phases = phases || protocol.phases;
  
        const updatedProtocol = await protocol.save();
        res.json(updatedProtocol);
      } else {
        res.status(404).json({ message: 'Protocol not found or unauthorized' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

// @desc    Delete a protocol
// @route   DELETE /api/protocols/:id
// @access  Private/Doctor
export const deleteProtocol = async (req, res) => {
  try {
    const protocol = await Protocol.findById(req.params.id);

    if (protocol && protocol.user.toString() === req.user._id.toString()) {
      await protocol.deleteOne();
      res.json({ message: 'Protocol removed' });
    } else {
      res.status(404).json({ message: 'Protocol not found or unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};