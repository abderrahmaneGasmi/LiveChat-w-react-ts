const { useContext } = require("react");
const { NotificationContext } = require("../context/NotificationProvider");

export const useNotification = () => useContext(NotificationContext);
