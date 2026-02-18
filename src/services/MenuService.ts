import { MenuNode } from "../core/state/SchemaTypes";
import axios from "axios";
const API_BASE_URL = "http://192.168.33.91:3000";

let menus: MenuNode[] = [
  {
    id: "1",
    label: "Transparency",
    pageId: "page1",
    children: [
      {
        id: "1-1",
        label: "Scan",
        pageId: "page1-1",
        children: [
          {
            id: "1-1-1",
            label: "Databases",
            pageId: "page1-1-1",
          },
        ],
      },
    ],
  },
];
class MenuService {
  async getMenus(): Promise<MenuNode[]> {
    return axios
      .get(`${API_BASE_URL}/api/menu`)
      .then((response: any) => {
        menus = response.data?.menus || [];
        return menus;
      })
      .catch((error: any) => {
        throw error;
      });
    // return menus;
  }
  async addMenu(newMenu: MenuNode): Promise<MenuNode[]> {
    let payload = {
      ...newMenu,
      icon: "users",
      route: `/${newMenu.label.toLowerCase()}`,
      order: 3,
    };
    return axios
      .post(`${API_BASE_URL}/api/menu`, payload)
      .then((response: any) => {
        menus = response.data?.menus || [];
        return menus;
      })
      .catch((error: any) => {
        throw error;
      });
    // const updatedMenus = [...menus, newMenu];
    // menus = updatedMenus;

    // return updatedMenus;
  }
  async addSubmenu(newMenu: MenuNode, parentId: string): Promise<MenuNode[]> {
    const currentMenus = await this.getMenus();

    const insertRecursively = (nodes: MenuNode[]): MenuNode[] => {
      return nodes.map((node) => {
        if (node.id == parentId) {
          return {
            ...node,
            children: [...(node.children || []), newMenu],
          };
        }
        if (node.children && node.children.length) {
          return {
            ...node,
            children: insertRecursively(node.children),
          };
        }
        return node;
      });
    };
    menus = insertRecursively(currentMenus);
    return menus;
  }
}

export default MenuService;
