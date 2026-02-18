import { PageSchema, LayoutType } from "../core/state/SchemaTypes";
import axios from "axios";
const API_BASE_URL = "http://192.168.33.91:3000";

class SchemaService {
  private schemas: Record<string, PageSchema> = {};

  //   async createSchema(menuId: string, template: LayoutType) {
  //     if (this.schemas[menuId]) return this.schemas[menuId];

  //     const schema: PageSchema =
  //       template === "split"
  //         ? {
  //             id: menuId,
  //             label: menuId,
  //             template: template,
  //             sections: {
  //               left: {
  //                 id: "left",
  //                 label: "Left Section",
  //                 components: [],
  //               },
  //               right: {
  //                 id: "right",
  //                 label: "Right Section",
  //                 components: [],
  //               },
  //             },
  //           }
  //         : {
  //             id: menuId,
  //             label: menuId,
  //             template: template,
  //             sections: {
  //               main: {
  //                 id: "main",
  //                 label: "Main Section",
  //                 components: [],
  //               },
  //             },
  //           };

  //     this.schemas[menuId] = schema;
  //     return schema;
  //   }

  async createSchema(pageSchema: PageSchema) {
    return axios
      .post(`${API_BASE_URL}/api/page`, pageSchema)
      .then((response: any) => {
        return response.data;
      })
      .catch((error: any) => {
        throw error;
      });
  }

  getAllSchemas() {
    return axios
      .get(`${API_BASE_URL}/api/page`)
      .then((response: any) => {
        return response.data;
      })
      .catch((error: any) => {
        throw error;
      });
  }

  getSchema(pageId: string) {
    return axios
      .get(`${API_BASE_URL}/api/page/${pageId}`)
      .then((response: any) => {
        return response.data;
      })
      .catch((error: any) => {
        throw error;
      });
  }
}

export default SchemaService;
