// Load e2e environment variables into process.env
require("dotenv").config({ path: ".env" });
import { getToken, checkJsonError } from "./utils";
const fetch = require("node-fetch");

import { Files } from "@tapis/tapis-typescript";

(async function () {
  try {
    // Retrieve an access token
    const token = await getToken();

    // Configure the client to use the retrieved JWT as the "X-Tapis-Token" authentication header
    const configurationParameters: Files.ConfigurationParameters = {
      basePath: process.env.TEST_TENANT,
      headers: {
        "X-Tapis-Token": token.access_token,
      },
      fetchApi: fetch,
    };
    const configuration: Files.Configuration = new Files.Configuration(
      configurationParameters
    );

    const api: Files.FileOperationsApi = new Files.FileOperationsApi(
      configuration
    );
    const listFilesRequest: Files.ListFilesRequest = {
      systemId: process.env.TEST_SYSTEM_S3_ID,
      path: "/mint/",
    };
    const response: Files.FileListingResponse = await api.listFiles(
      listFilesRequest
    );
    const files: Array<Files.FileInfo> = response.result;
    console.log(files);
  } catch (error) {
    checkJsonError(error);
  }
})();

export default getToken;
