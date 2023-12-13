// Load e2e environment variables into process.env
require("dotenv").config({ path: ".env" });
import { getToken, checkJsonError } from "./utils";
const fetch = require("node-fetch");

import { Systems } from "@tapis/tapis-typescript";

(async function () {
  try {
    // Retrieve an access token
    const token = await getToken();
    const systemDefRequest: Systems.ReqCreateSystem = {
      id: process.env.TEST_SYSTEM_S3_ID,
      host: process.env.TEST_SYSTEM_S3_HOST,
      systemType: Systems.SystemTypeEnum.S3,
      description: process.env.TEST_SYSTEM_S3_DESCRIPTION,
      bucketName: process.env.TEST_SYSTEM_S3_BUCKET_NAME,
      defaultAuthnMethod: Systems.AuthnEnum.AccessKey,
      canExec: false,
    };

    const systemDef: Systems.CreateSystemRequest = {
      reqCreateSystem: systemDefRequest,
    };
    // Configure the client to use the retrieved JWT as the "X-Tapis-Token" authentication header
    const configurationParameters: Systems.ConfigurationParameters = {
      basePath: process.env.TEST_TENANT,
      headers: {
        "X-Tapis-Token": token.access_token,
      },
      fetchApi: fetch,
    };
    const configuration: Systems.Configuration = new Systems.Configuration(
      configurationParameters
    );
    const api = new Systems.SystemsApi(configuration);

    // Send the request
    const systemsResponse: Systems.RespResourceUrl = await api.createSystem(
      systemDef
    );
    console.log(systemsResponse);

    const credentialDefRequest: Systems.CreateUserCredentialRequest = {
      systemId: process.env.TEST_SYSTEM_S3_ID,
      userName: process.env.TEST_USER,
      reqCreateCredential: {
        accessKey: process.env.TEST_SYSTEM_S3_ACCESS_KEY,
        accessSecret: process.env.TEST_SYSTEM_S3_ACCESS_SECRET,
      },
    };

    const apiCredentials = new Systems.CredentialsApi(configuration);
    const credentialsResponse: Systems.RespBasic =
      await apiCredentials.createUserCredential(credentialDefRequest);

    console.log(credentialsResponse);
  } catch (error) {
    checkJsonError(error);
  }
})();

export default getToken;
