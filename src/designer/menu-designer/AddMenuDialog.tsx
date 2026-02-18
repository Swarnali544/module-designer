import React, { useState, useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Select,
  MenuItem,
  InputLabel 
} from "@mui/material";
import { MenuNode } from "../../core/state/SchemaTypes";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (menu: MenuNode, parentId: string) => void;
  menus?: MenuNode[]; // Optional prop to pass existing menus for parent selection;
  pages ?: any[]; // Optional prop to pass existing pages for page selection;
}

interface FlatMenu {
  id ?: string;
  label: string;
  depth: number;
}

export const AddMenuDialog: React.FC<Props> = ({
  open,
  onClose,
  onSubmit,
  menus,
  pages
}) => {
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [parentId, setParentId] = useState<string>("");
    const [pageId, setPageId] = useState<string>("");
  const handleSubmit = () => {
      const newMenuNode: MenuNode = {
        label,
        description,
        pageId: pageId || undefined,
        children: [],
      };
      onSubmit(newMenuNode, parentId);
      resetDialog();
  };

  const resetDialog = () => {
    onClose();
    setLabel("");
    setDescription("");
    setParentId("");
      setPageId("");
  };

  const flatMenuList = useMemo(() => {
    const result: FlatMenu[] = [];

    const traverse = (nodes: MenuNode[], depth = 0) => {
      nodes.forEach((node) => {
        result.push({
          id: node.id,
          label: node.label,
          depth,
        });
        if (node.children) {
          traverse(node.children, depth + 1);
        }
      });
    };
    traverse(menus || []);
    return result;
  }, [menus]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Menu</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Menu Label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            fullWidth
            required
          ></TextField>
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={2}
          />
          <InputLabel id="parent-menu-label">Select Parent Menu</InputLabel>
          <Select
            labelId="parent-menu-label"
            label="Select Parent Menu"
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            {flatMenuList.map((menu) => (
                <MenuItem key={menu.id} value={menu.id}>
                    {"— ".repeat(menu.depth) + menu.label}
                </MenuItem>
            ))}
          </Select>
            {/* Page selection dropdown */}
            <InputLabel id="page-select-label">Select Page</InputLabel>
            <Select
              labelId="page-select-label"
              label="Select Page"
              value={pageId}
              onChange={(e) => setPageId(e.target.value)}
              fullWidth
            >
              <MenuItem value="">None</MenuItem>
              {pages && pages.map((page) => (
                <MenuItem key={page.id} value={page.id}>
                  {page.label}
                </MenuItem>
              ))}
            </Select>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          disabled={!label.trim()}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
