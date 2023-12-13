import { Jobs } from "@tapis/tapis-typescript";

const requestSubmitJob: Jobs.ReqSubmitJob = {
  name: process.env.TEST_JOB_NAME,
  appId: process.env.TEST_APP_ID,
  appVersion: process.env.TEST_APP_VERSION,
  execSystemId: process.env.TEST_SYSTEM_ID,
  parameterSet: {
    schedulerOptions: [
      {
        name: "chargeProject",
        description: "Project to charge",
        include: true,
        arg: `-A ${process.env.TEST_PROJECT_ID}`,
      },
    ],
    appArgs: [
      {
        arg: "--image_file",
        name: "arg1",
      },
      {
        arg: "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/12231410/Labrador-Retriever-On-White-01.jpg",
        name: "arg2",
      },
    ],
  },
};

export default requestSubmitJob;
