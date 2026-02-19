// Defines the structure of one menu item in the sidebar menu tree
export interface MenuNode {
  id?: string;
  label: string;
  description?: string;
  pageId?: string;
  children?: MenuNode[];
  route?: string;
  order?: number;
}

// Defines the possible layout types for a page schema
export type LayoutType = "empty" | "split";

// Defines the structure of a page schema, which includes layout and sections
export interface PageSchema {
  id?: string;
  label: string;
  layoutJson: any;
}

// Defines the structure of a section within a page, which can contain components
export interface SectionSchema {
  id: string;
  label: string;
  components?: Array<any>;
}

export interface Template {
  id?: string;
  label: string;
  category?: string;
  addtionalUIJson: any;
}

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiConfig {
  id?: string;
  label?: string;
  description?: string;
  path: string;
  method: HttpMethod;

  paramsJson?: any;
  headersJson?: any;
  // payload ?: any;

  // reponseKey ?: string;
}

export interface PageComponentConfig {
  pageId: string | null;
  templateId: string;
  apiConfigId?: string;
  configJson: any;
  positionJson: any;
  section : string;
  addtionalUIJson : any;
}
