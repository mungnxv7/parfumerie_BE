const uploadImages = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).josnn({ message: "Lỗi không thể upload image" });
    }
    const { path, filename } = req.file;
    res.status(200).json({ path, filename });
  } catch (error) {
    return res.status(400).json({
      name: error.name,
      message: error.message,
    });
  }
};

export default uploadImages;
