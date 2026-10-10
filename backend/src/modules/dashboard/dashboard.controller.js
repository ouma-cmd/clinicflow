const dashboardService = require("./dashboard.service");

const getDashboard = async (req, res) => {
  try {
    const dashboard = await dashboardService.getDashboard();

    return res.status(200).json(dashboard);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};
