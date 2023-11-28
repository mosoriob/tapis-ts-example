// Load e2e environment variables into process.env
require("dotenv").config({ path: ".env" });
import { getToken, checkJsonError } from "./utils";
const fetch = require("node-fetch");

import { Apps, Jobs } from "@tapis/tapis-typescript";
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

(async function () {
  try {
    // Retrieve an access token
    const token = await getToken();

    // Configure the client to use the retrieved JWT as the "X-Tapis-Token" authentication header
    const configurationParameters: Jobs.ConfigurationParameters = {
      basePath: process.env.TEST_TENANT,
      headers: {
        "X-Tapis-Token": token.access_token,
      },
      fetchApi: fetch,
    };
    const configuration: Jobs.Configuration = new Jobs.Configuration(
      configurationParameters
    );

    const api: Jobs.JobsApi = new Jobs.JobsApi(configuration);

    const request: Jobs.SubmitJobRequest = {
      reqSubmitJob: requestSubmitJob,
    };

    await api.submitJob(request);

    const response: Jobs.RespGetJobList = await api.getJobList(request);
    const jobs: Array<Jobs.JobListDTO> = response.result;
    console.log(jobs);
  } catch (error) {
    checkJsonError(error);
  }
})();

export default getToken;
