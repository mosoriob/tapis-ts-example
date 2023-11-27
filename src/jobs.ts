// Load e2e environment variables into process.env
require("dotenv").config({ path: ".env" });
import { getToken, checkJsonError } from "./utils";
const fetch = require("node-fetch");

import { Jobs } from "@tapis/tapis-typescript";

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
    const request: Jobs.GetJobListRequest = {};
    const response: Jobs.RespGetJobList = await api.getJobList(request);
    const jobs: Array<Jobs.JobListDTO> = response.result;
    for (const job of jobs) {
      const jobDetails = await api.getJobStatus({
        jobUuid: job.uuid,
      });
      console.log(jobDetails);
    }
    // console.log(jobs);
  } catch (error) {
    checkJsonError(error);
  }
})();

export default getToken;
