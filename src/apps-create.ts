// Load e2e environment variables into process.env
require("dotenv").config({ path: ".env" });
import { getToken, checkJsonError } from "./utils";
const fetch = require("node-fetch");

import { Apps } from "@tapis/tapis-typescript";

const appDef: Apps.ReqPostApp = {
  id: "img-classify-mosorio",
  version: process.env.TEST_APP_VERSION,
  description: "Image classifier run using Singularity in batch mode",
  jobType: Apps.JobTypeEnum.Batch,
  runtime: Apps.RuntimeEnum.Singularity,
  runtimeOptions: [Apps.RuntimeOptionEnum.SingularityRun],
  containerImage: "docker://tapis/img-classify-sing:0.1",
  jobAttributes: {
    parameterSet: {
      appArgs: [
        {
          arg: "--image_file",
          name: "arg1",
        },
      ],
      archiveFilter: { includeLaunchFiles: false },
    },
    nodeCount: 1,
    coresPerNode: 1,
    memoryMB: 1,
    maxMinutes: 10,
  },
};

(async function () {
  // Retrieve an access token
  const token = await getToken();

  // Configure the client to use the retrieved JWT as the "X-Tapis-Token" authentication header
  const configurationParameters: Apps.ConfigurationParameters = {
    basePath: process.env.TEST_TENANT,
    headers: {
      "X-Tapis-Token": token.access_token,
    },
    fetchApi: fetch,
  };
  const configuration: Apps.Configuration = new Apps.Configuration(
    configurationParameters
  );

  try {
    const api: Apps.ApplicationsApi = new Apps.ApplicationsApi(configuration);
    const createAppRequest: Apps.CreateAppVersionRequest = {
      reqPostApp: appDef,
    };
    const response: Apps.RespResourceUrl = await api.createAppVersion(
      createAppRequest
    );
    console.log(response);
  } catch (error) {
    checkJsonError(error);
  }
})();

export default getToken;
