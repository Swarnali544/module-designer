import React, { useState } from "react";
import { LayoutType } from "../../core/state/SchemaTypes";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Paper,
  Box,
  Typography,
  TextField,
  InputLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import VerticalSplitOutlinedIcon from "@mui/icons-material/VerticalSplitOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (pageLabel: string, layout: LayoutType) => void;
}

interface LayoutOption {
  type: LayoutType;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const layoutOptions: LayoutOption[] = [
  {
    type: "split",
    label: "Split Layout",
    description: "Divide the page into left and right panels",
    icon: <VerticalSplitOutlinedIcon sx={{ fontSize: 32 }} />,
  },
  {
    type: "empty",
    label: "Empty Page",
    description: "Start with a blank canvas",
    icon: <ArticleOutlinedIcon sx={{ fontSize: 32 }} />,
  },
];

export const LayoutSelectionDialog: React.FC<Props> = ({
  open,
  onClose,
  onSelect,
}) => {
  const [pageLabel, setPageLabel] = useState<string>("");
  const [selectedLayoutType, setSelectedLayoutType] = useState<LayoutType>("empty");

  const onPageLayoutAdd = () => {
    onSelect(pageLabel,selectedLayoutType);

    setPageLabel("");
    setSelectedLayoutType("empty");
  }
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Select Page Layout</DialogTitle>
      <DialogContent>
        <Stack spacing={3} mt={2}>
          <TextField
            label="Page Name"
            value={pageLabel}
            onChange={(e) => setPageLabel(e.target.value)}
            fullWidth
            required
          ></TextField>
          <InputLabel id="page-layout">Select Page Layout</InputLabel>
          <FormControl component="fieldset" fullWidth>
            <RadioGroup
              name="layout-type"
              value={selectedLayoutType}
              onChange={(e) => setSelectedLayoutType(e.target.value as LayoutType)}
            >
              {layoutOptions.map((option) => (
                <Paper
                  key={option.type}
                  variant="outlined"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    px: 2,
                    py: 1.5,
                    cursor: "pointer",
                    borderRadius: 2,
                    transition: "all 0.15s ease",
                    mb: 1,
                    borderColor: selectedLayoutType === option.type ? "primary.main" : undefined,
                    bgcolor: selectedLayoutType === option.type ? "primary.50" : undefined,
                    boxShadow: selectedLayoutType === option.type ? 2 : undefined,
                  }}
                  onClick={() => setSelectedLayoutType(option.type)}
                >
                  <FormControlLabel
                    value={option.type}
                    control={<Radio checked={selectedLayoutType === option.type} />}
                    label={
                      <Box display="flex" alignItems="center" gap={2}>
                        <Box color="primary.main">{option.icon}</Box>
                        <Box>
                          <Typography variant="subtitle2">{option.label}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {option.description}
                          </Typography>
                        </Box>
                      </Box>
                    }
                    sx={{ flex: 1, m: 0 }}
                  />
                </Paper>
              ))}
            </RadioGroup>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="text" color="inherit" size="small" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={!pageLabel.trim()}
          onClick={onPageLayoutAdd}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
