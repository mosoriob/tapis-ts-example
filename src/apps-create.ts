// Load e2e environment variables into process.env
require("dotenv").config({ path: ".env" });
import imgClassifyApp from "./catalog/apps/img-classify-mosorio";
import llamaNotebookApp from "./catalog/apps/llama-notebook";
import { getToken, checkJsonError } from "./utils";
const fetch = require("node-fetch");

import { Apps } from "@tapis/tapis-typescript";

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
      reqPostApp: llamaNotebookApp,
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
