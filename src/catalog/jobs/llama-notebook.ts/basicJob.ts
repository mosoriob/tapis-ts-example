import { Jobs } from "@tapis/tapis-typescript";
import llamaNotebookApp from "../../apps/llama-notebook";
const llamaJob: Jobs.ReqSubmitJob = {
  name: `tap_${llamaNotebookApp.id}`,
  appId: llamaNotebookApp.id,
  appVersion: llamaNotebookApp.version,
  execSystemId: process.env.TEST_SYSTEM_ID,
  execSystemLogicalQueue: "gpu-a100",
  parameterSet: {
    schedulerOptions: [
      {
        name: "chargeProject",
        description: "Project to charge",
        include: true,
        arg: `-A ${process.env.TEST_PROJECT_ID}`,
      },
    ],
    envVariables: [
      {
        key: "email",
        value: "mosorio@isi.edu",
      },
    ],
  },
};

export default llamaJob;
