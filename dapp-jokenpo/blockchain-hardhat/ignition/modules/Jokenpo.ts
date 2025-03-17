import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const JokenPoModule = buildModule("JokenPoModule", (m) => {
  
  const jokenpo = m.contract("JokenPo");
  

  return { jokenpo };
});

export default JokenPoModule;
