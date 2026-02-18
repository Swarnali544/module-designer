import { ApiConfig } from "../core/state/SchemaTypes";
import axios from "axios";
const API_BASE_URL = "http://192.168.33.91:3000";

class ApiConfigService {
  async addApiConfig(config: ApiConfig): Promise<ApiConfig> {
    return axios
      .post(`${API_BASE_URL}/api/apiconfig`, config)
      .then((response: any) => response.data)
      .catch((error: any) => {
        throw error;
      });
  }

  async getAllApiConfigs(): Promise<ApiConfig[]> {
    return axios
      .get(`${API_BASE_URL}/api/apiconfig`)
      .then((response: any) => response.data)
      .catch((error: any) => {
        throw error;
      });
  }

}

export default ApiConfigService;
