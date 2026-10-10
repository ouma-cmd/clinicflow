const dashboardRepository = require("./dashboard.repository");

const getDashboard = async () => {
  const totalPatients = await dashboardRepository.getTotalPatients();

  const todayAppointments = await dashboardRepository.getTodayAppointments();

  const appointmentStats = await dashboardRepository.getAppointmentStats();

  const stats = {
    confirmed: 0,

    pending: 0,

    cancelled: 0,
  };

  appointmentStats.forEach((item) => {
    stats[item.status] = Number(item.count);
  });

  return {
    patients: {
      total: totalPatients,
    },

    appointments: {
      today: todayAppointments,

      ...stats,
    },
  };
};

module.exports = {
  getDashboard,
};
