import * as dotenv from "dotenv";
dotenv.config();
import axios, { AxiosInstance } from "axios";
import {
  AxiosClientConfig,
  CONTENT_TYPE,
  UNITGROUP,
} from "../HttpClient/HttpClientTypes";
import { configSchema } from "./ConfigSchema";

interface IAxiosClient {
  createAxiosInstance(): AxiosInstance;
}

export class AxiosClient implements IAxiosClient {
  constructor(private readonly config?: AxiosClientConfig) {}
  createAxiosInstance(): AxiosInstance {
    if (this.config) configSchema.parse(this.config);
    return axios.create({
      baseURL: this.config?.baseURL || process.env.EXTERNAL_API,
      params: {
        unitGroup: this.config?.unitGroup || UNITGROUP.METRIC,
        key: this.config?.APIURL || process.env.API_KEY,
        contentType: this.config?.contentType || CONTENT_TYPE.JSON,
      },
    });
  }
}
