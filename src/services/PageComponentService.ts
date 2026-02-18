import { PageComponentConfig } from "../core/state/SchemaTypes";

import axios from "axios";
const API_BASE_URL = "http://192.168.33.91:3000";

class PageComponentService {
    async createPageComponent(component : PageComponentConfig) : Promise<any> {
        return axios
        .post(`${API_BASE_URL}/api/page-component`, component)
        .then((response: any) => response.data)
        .catch((error: any) => {
          throw error;
        });
    }
}

export default PageComponentService;