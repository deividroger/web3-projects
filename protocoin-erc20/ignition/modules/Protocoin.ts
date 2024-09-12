import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ProtocoinModule = buildModule("ProtocoinModule", (m) => {
  
  const protocoin = m.contract("ProtoCoin");

  return { protocoin };
});

export default ProtocoinModule;
