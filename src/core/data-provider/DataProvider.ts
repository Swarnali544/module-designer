class DataProvider {
  static async execute(apiConfig: any): Promise<any> {
    const url = this.buildUrl(apiConfig);

    const response = await fetch(url, {
      method: apiConfig.method,
      headers: apiConfig.headersJson || {},
      // body:
      //   apiConfig.method !== "GET"
      //     ? JSON.stringify(apiConfig.paramsJson || {})
      //     : undefined,
    });

    return response.json();
  }

  private static buildUrl(apiConfig: any) {
    let url = apiConfig.path;

    if (apiConfig.paramsJson && apiConfig.method == "GET") {
      const params = new URLSearchParams(apiConfig.paramsJson).toString();
      url += `?${params}`;
    }

    return url;
  }
}

export default DataProvider;
