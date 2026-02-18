import React, { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";
import { Button, Paper, Box, Menu, MenuItem, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { MenuRenderer } from "../core/renderer/MenuRenderer";
import { LayoutType, MenuNode } from "../core/state/SchemaTypes";
import { AddMenuDialog } from "./menu-designer/AddMenuDialog";
import MenuService from "../services/MenuService";
const menuService = new MenuService();

import { LayoutSelectionDialog } from "./layout-selector/LayoutSelectionDialog";
import SchemaService from "../services/SchemaService";
import { PageRenderer } from "../core/renderer/PageRenderer";
const schemaService = new SchemaService();

import { AddTemplateDialog } from "./template-registry/AddTemplateDialog";
import { AddApiConfigDialog } from "./api-registry/AddApiConfigDialog";

import masterJson from "../master.json";

export const DesignerContainer: React.FC = () => {
  // Menu related states
  const [menu, setMenu] = useState<MenuNode[]>([]);
  const [addMenuDialogOpen, setAddMenuDialogOpen] = useState(false);
  const [pages, setPages] = useState<any[]>([]);

  /*
   ** ==========================================================================================================================
   */

  // Page related states
  const [pendingPageId, setPendingPageId] = useState<string | null>(null);
  const [activeSchema, setActiveSchema] = useState<any>(null);
  const [layoutSelectionDialogState, setLayoutSelectionDialogState] =
    useState(false);

  /*
   ** ==========================================================================================================================
   */

  // Action Menu related states
  const actionList = [
    {
      id: "1",
      label: "Add Template",
    },
    {
      id: "2",
      label: "Add API Configuration",
    },
    {
      id: "3",
      label: "Add New Page",
    },
  ];
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isAddTemplateDialogOpen, setAddTemplateDialogOpen] = useState(false);
  const [isApiConfigDialogOpen, setApiConfigDialogOpen] = useState(false);

  const isActionMenuOpened = Boolean(anchorEl);
  const handleActionIconClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleActionMenuClose = () => {
    setAnchorEl(null);
  };

  const handleActionItemClick = (action: any) => {
    handleActionMenuClose();

    let actionId = action.id;
    if (actionId === "1") {
      setAddTemplateDialogOpen(true);
    } else if (actionId === "2") {
      setApiConfigDialogOpen(true);
    } else if (actionId === "3") {
      setLayoutSelectionDialogState(true);
    }
  };

  /*
   ** ==========================================================================================================================
   */

   const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  useEffect(() => {
    fetchMenus();
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const pagesResp = await schemaService.getAllSchemas();
      const pages = pagesResp?.pages || [];
      setPages(pages);
    } catch (err) {
      setPages([]);
    }
  };
  const fetchMenus = async () => {
    try {
      const menus = await menuService.getMenus();
      setMenu(menus);
    } catch (err) {
      setMenu([]);
    }
  };

  const handleAddMenuButtonClick = () => {
    setAddMenuDialogOpen(true);
  };

  const handleAddMenuSubmit = async (newMenu: MenuNode, parentId: string) => {
    let updatedMenus: MenuNode[];
    if (parentId) {
      updatedMenus = await menuService.addSubmenu(newMenu, parentId);
    } else {
      updatedMenus = await menuService.addMenu(newMenu);
    }
    fetchMenus();
    setAddMenuDialogOpen(false);
  };
  const handlePageSelect = async(node: MenuNode) => {
    let pageId: string = node.pageId as string;

    setSelectedPageId(pageId);

    let existingPageSchema = await schemaService.getSchema(pageId);
    //TODO : Add the logic to render the already create page in the right panel
    if (existingPageSchema !== null) {
      // setActiveSchema(existingPageSchema);
      setActiveSchema(masterJson.page);
    } else {
      setPendingPageId(pageId);
      setLayoutSelectionDialogState(true);
    }
  };

  const handleLayoutSelection = async (
    pageLabel: string,
    layout: LayoutType,
  ) => {
    const newPageSchemaResp = await schemaService.createSchema({
      label: pageLabel,
      layoutJson: {
        type: layout,
      },
    });
    const newPageSchema = newPageSchemaResp?.data;

    setLayoutSelectionDialogState(false);
    // setActiveSchema(newPageSchema);
    setActiveSchema(masterJson.page);
    setPendingPageId(null);
  };

  return (
    <>
      {/* Action Menu */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton
          id="demo-positioned-button"
          aria-controls={
            isActionMenuOpened ? "demo-positioned-menu" : undefined
          }
          aria-expanded={isActionMenuOpened ? "true" : undefined}
          onClick={handleActionIconClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={isActionMenuOpened}
          onClose={handleActionMenuClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          {actionList.map((action) => (
            <MenuItem
              key={action.id}
              onClick={() => handleActionItemClick(action)}
            >
              {action.label}
            </MenuItem>
          ))}
        </Menu>
      </div>
      <div style={{ display: "flex", height: "95vh" }}>
        <Paper
          elevation={1}
          sx={{
            width: 400,
            display: "flex",
            flexDirection: "column",
            bgcolor: "#fafafa",
            borderRight: 1,
            borderColor: "divider",
          }}
        >
          <Box p={1.5}>
            <MenuRenderer menu={menu} onPageSelect={handlePageSelect} />
          </Box>
          <Divider />
          <Box p={1.5}>
            <Button
              variant="outlined"
              fullWidth
              onClick={handleAddMenuButtonClick}
            >
              + Add Menu
            </Button>
          </Box>
        </Paper>
        <Box bgcolor="#fff">
          {!activeSchema ? (
            <div>Select a page</div>
          ) : (
            <PageRenderer schema={activeSchema} editMode={true} pageId={selectedPageId}/>
          )}
        </Box>
      </div>
      <AddMenuDialog
        open={addMenuDialogOpen}
        menus={menu}
        pages={pages}
        onClose={() => setAddMenuDialogOpen(false)}
        onSubmit={handleAddMenuSubmit}
      />
      <LayoutSelectionDialog
        open={layoutSelectionDialogState}
        onClose={() => setLayoutSelectionDialogState(false)}
        onSelect={handleLayoutSelection}
      ></LayoutSelectionDialog>
      <AddTemplateDialog
        open={isAddTemplateDialogOpen}
        onClose={() => setAddTemplateDialogOpen(false)}
      ></AddTemplateDialog>
      <AddApiConfigDialog
        open={isApiConfigDialogOpen}
        onClose={() => setApiConfigDialogOpen(false)}
      ></AddApiConfigDialog>
    </>
  );
};
