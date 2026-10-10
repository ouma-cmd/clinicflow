const dashboardService = require("./dashboard.service");

const getDashboard = async (req, res) => {
  const dashboard = await dashboardService.getDashboard();

  return res.status(200).json(dashboard);
};

module.exports = {
  getDashboard,
};
