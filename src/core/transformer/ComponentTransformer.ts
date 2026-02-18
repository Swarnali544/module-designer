import DataProvider from "../data-provider/DataProvider";
import ApiConfigService from "../../services/ApiConfigService";
const apiConfigService = new ApiConfigService();

import TemplateService from "../../services/TemplateService";
const templateService = new TemplateService();

class ComponentTransformer {
  static async buildComponentProps(componentSchema: any): Promise<any> {
    const apiConfig = componentSchema.apiConfig
      ? componentSchema.apiConfig
      : null;

    let apiData: any = null;

    if (apiConfig) {
      apiData = await DataProvider.execute(apiConfig);
    }

    const realProps: Record<string, any> = {};

    const propConfig = componentSchema.template?.addtionalUIJson?.props || {};

    Object.entries(propConfig).forEach(([propName, mapping]: [string, any]) => {
      if (mapping.type === "static") {
        realProps[propName] = mapping.value;
      } else if (mapping.type === "dynamic" && apiData) {
        realProps[propName] = this.resolveDynamic(mapping.value, apiData);
      }
    });

    console.log("Built props for component:", realProps);
    return realProps;
  }

  private static resolveDynamic(path: string, data: any) {
    if (!data || !path) return null;

    const keys = path.split(".");

    const resolve = (current: any, index: number): any => {
      if (current == null) return undefined;
      if (index >= keys.length) return current;

      const key = keys[index];

      if (Array.isArray(current)) {
        return current.map((item) => resolve(item, index));
      }

      return resolve(current[key], index + 1);
    };

    const result = resolve(data, 0);

    console.log("Resolved:", result);
    return result;
  }
}

export default ComponentTransformer;
