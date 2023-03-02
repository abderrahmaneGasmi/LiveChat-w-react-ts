const { useContext } = require("react");
const { AuthProviderContext } = require("../context/AuthProvider");

export const useAuth = () => useContext(AuthProviderContext);
