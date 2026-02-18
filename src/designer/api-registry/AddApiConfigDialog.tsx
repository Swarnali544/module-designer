import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  MenuItem,
  Alert,
} from "@mui/material";
import { ApiConfig } from "../../core/state/SchemaTypes";
import ApiConfigService from "../../services/ApiConfigService";
const apiConfigService = new ApiConfigService();

interface Props {
  open: boolean;
  onClose: () => void;
}

const HTTP_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"];

export const AddApiConfigDialog: React.FC<Props> = ({ open, onClose }) => {
  const [form, setForm] = useState<ApiConfig>({
    label: "",
    description: "",
    path: "",
    method: "GET" as any,
    paramsJson: {},
    headersJson: {},
  });

  const [paramsText, setParamsText] = useState<string | null>(null);
  const [headersText, setHeadersText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange =
    (field: keyof ApiConfig) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async () => {
    try {
      let paramsJson = paramsText ? JSON.parse(paramsText) : {};
      let headersJson = headersText ? JSON.parse(headersText) : {};
      let payload = {
        ...form,
        paramsJson,
        headersJson,
      };
      const resp = await apiConfigService.addApiConfig(payload);
      onClose();
      resetForm();
    } catch (err) {
      setError("Invalid JSON in Params or Headers");
    }
  };

  const resetForm = () => {
    setForm({
      label: "",
      description: "",
      path: "",
      method: "GET" as any,
      paramsJson: {},
      headersJson: {},
    });
    setParamsText(null);
    setHeadersText(null);
    setError(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Add API Configuration</DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2}>
          {error && (
            <Grid size={12}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}

          <Grid size={12}>
            <TextField
              label="Label"
              fullWidth
              value={form.label}
              onChange={handleChange("label")}
            />
          </Grid>

          <Grid size={12}>
            <TextField
              label="Description"
              fullWidth
              multiline
              minRows={2}
              value={form.description}
              onChange={handleChange("description")}
            />
          </Grid>

          <Grid size={12}>
            <TextField
              label="API Path / Endpoint"
              fullWidth
              required
              value={form.path}
              onChange={handleChange("path")}
            />
          </Grid>

          <Grid size={12}>
            <TextField
              select
              label="HTTP Method"
              fullWidth
              value={form.method}
              onChange={handleChange("method")}
            >
              {HTTP_METHODS.map((m) => (
                <MenuItem key={m} value={m}>
                  {m}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={12}>
            <TextField
              label="Params (JSON)"
              fullWidth
              multiline
              minRows={3}
              value={paramsText}
              onChange={(e) => setParamsText(e.target.value)}
            />
          </Grid>

          <Grid size={12}>
            <TextField
              label="Headers (JSON)"
              fullWidth
              multiline
              minRows={3}
              value={headersText}
              onChange={(e) => setHeadersText(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
