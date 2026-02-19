import React from "react";
import { MenuNode } from "../state/SchemaTypes";
import { Button, Box,Divider } from "@mui/material";

interface Props {
  menu: MenuNode[];
  onPageSelect: (node: MenuNode) => void;
  handleAddMenuButtonClick: () => void;
}

export const MenuRenderer: React.FC<Props> = ({
  menu,
  onPageSelect,
  handleAddMenuButtonClick,
}) => {
  const handleMenuSelection = (node: MenuNode) => {
    if (node.children && node.children.length) return;
    else onPageSelect(node);
  };
  const renderNode = (node: MenuNode) => {
    return (
      <div key={node.id} style={{ paddingLeft: 20 }}>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => handleMenuSelection(node)}
        >
          {node.label}
        </div>
        {node.children && node.children.map((child) => renderNode(child))}
      </div>
    );
  };
  return (
    <div>
      <div>{menu.map((node) => renderNode(node))}</div>
      <Divider />
      <Box p={1.5}>
        <Button variant="outlined" fullWidth onClick={handleAddMenuButtonClick}>
          + Add Menu
        </Button>
      </Box>
    </div>
  );
};
