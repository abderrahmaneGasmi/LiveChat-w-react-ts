const { useContext } = require("react");
const { GlobalVariableContext } = require("../context/GlobalVariable");

export const useGlobalVariable = () => useContext(GlobalVariableContext);
