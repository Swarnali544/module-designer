import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Typography,
  Divider,
  Box,
  Collapse,
  SelectChangeEvent,
} from "@mui/material";

import ComponentRegistry from "../../core/registry/ComponentRegistry";

import TemplateService from "../../services/TemplateService";
const templateService = new TemplateService();

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AddTemplateDialog: React.FC<Props> = ({ open, onClose }) => {
  const [componentType, setComponentType] = useState("");
  const [propsState, setPropsState] = useState<Record<string, any>>({});

  const componentList = ComponentRegistry.getComponentList();

  const handleComponentChange = (event: SelectChangeEvent<string>) => {
    const type = event.target.value;
    setComponentType(type);
    const propsObj = ComponentRegistry.getComponentProps(type);
    setPropsState({ ...propsObj });
  };

  const handleSubmit = async () => {
    try {
      let payload = {
        label: componentType,
        category: componentType,
        addtionalUIJson: {
          props: propsState,
        },
      };
      await templateService.addTemplate(payload);
      handleClose();
    } catch (error) {
      console.error("Error adding template:", error);
    }
  };

  const handleClose = () => {
    setComponentType("");
    setPropsState({});
    onClose();
  };

  const propsObj = ComponentRegistry.getComponentProps(componentType);
  const propKeys = Object.keys(propsObj || {});
  const isSubmitDisabled = !componentType;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: {
          elevation: 4,
          sx: { borderRadius: 2 },
        },
      }}
    >
      <DialogTitle>
        <Typography component="span" variant="h6" fontWeight={600}>
          Add Template
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={0.5}>
          Configure a reusable component template
        </Typography>
      </DialogTitle>

      <Divider />

      <DialogContent>
        <Stack spacing={3} mt={1}>
          <FormControl fullWidth required>
            <InputLabel id="component-type-label">Component Type</InputLabel>
            <Select
              labelId="component-type-label"
              value={componentType}
              label="Component Type"
              onChange={handleComponentChange}
              displayEmpty
            >
              {componentList.map((c) => (
                <MenuItem key={c.label} value={c.label}>
                  {c.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Collapse in={propKeys.length > 0} unmountOnExit>
            <Box>
              <Typography
                variant="caption"
                fontWeight={600}
                color="text.secondary"
                textTransform="uppercase"
                letterSpacing={0.8}
              >
                Component Props
              </Typography>
              <Stack spacing={2} mt={1.5}>
                {propKeys.map((propKey) => (
                  <TextField
                    key={propKey}
                    label={propKey}
                    value={propsState[propKey] ?? ""}
                    onChange={(e) =>
                      setPropsState((prev) => ({
                        ...prev,
                        [propKey]: e.target.value,
                      }))
                    }
                    fullWidth
                    size="small"
                  />
                ))}
              </Stack>
            </Box>
          </Collapse>
        </Stack>
      </DialogContent>

      <Divider />

      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        <Button onClick={handleClose} color="inherit" variant="text">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isSubmitDisabled}
          disableElevation
        >
          Save Template
        </Button>
      </DialogActions>
    </Dialog>
  );
};
