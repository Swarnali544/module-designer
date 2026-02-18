import { Template } from "../core/state/SchemaTypes";
import axios from "axios";
const API_BASE_URL = "http://192.168.33.91:3000";

class TemplateService {
  async getTemplates(): Promise<Template[]> {
    return axios
      .get(`${API_BASE_URL}/template`)
      .then((response: any) => response.data)
      .catch((error: any) => {
        throw error;
      });
  }

  async addTemplate(template: Template): Promise<Template[]> {
    return axios
      .post(`${API_BASE_URL}/api/template`, template)
      .then((response: any) => response.data)
      .catch((error: any) => {
        throw error;
      });
  }

//   async getTemplateById(templateId: string): Promise<Template | null> {
//     const template = this.templates.find((t) => t.id === templateId);
//     return template || null;
//   }
}

export default TemplateService;
