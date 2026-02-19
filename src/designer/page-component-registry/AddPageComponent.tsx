import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  MenuItem,
  Typography,
  CircularProgress,
  Switch,
  FormControlLabel,
  Divider,
} from "@mui/material";
import { Template } from "../../core/state/SchemaTypes";
import { ApiConfig } from "../../core/state/SchemaTypes";
import { PageComponentConfig } from "../../core/state/SchemaTypes";

import TemplateService from "../../services/TemplateService";
const templateService = new TemplateService();

import ApiConfigService from "../../services/ApiConfigService";
const apiConfigService = new ApiConfigService();

import PageComponentService from "../../services/PageComponentService";
const pageComponentService = new PageComponentService();

interface Props {
  open: boolean;
  onClose: () => void;
  pageId: string | null;
  section: string;
}

export const AddPageComponentDialog: React.FC<Props> = ({
  open,
  onClose,
  pageId,
  section,
}) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [apiConfigs, setApiConfigs] = useState<ApiConfig[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null,
  );
  const [selectedApiConfig, setSelectedApiConfig] = useState<ApiConfig | null>(
    null,
  );
  // propState: { [key: string]: { type: 'static'|'dynamic', value: any } }
  const [propState, setPropState] = useState<{
    [key: string]: { type: "static" | "dynamic"; value: any };
  }>({});
  const [templatesLoading, setTemplatesLoading] = useState(true);
  const [apiConfigsLoading, setApiConfigsLoading] = useState(true);

  const fetchAllTemplates = async () => {
    setTemplatesLoading(true);
    try {
      const templates = await templateService.getTemplates();
      setTemplates(templates);
      setTemplatesLoading(false);
    } catch (error) {
      console.error("Error fetching templates: ", error);
      setTemplates([]);
    } finally {
      setTemplatesLoading(false);
    }
  };

  const fetchAllApiConfigs = async () => {
    setApiConfigsLoading(true);
    try {
      const apiConfigs = await apiConfigService.getAllApiConfigs();
      setApiConfigs(apiConfigs);
      setApiConfigsLoading(false);
    } catch (error) {
      console.error("Error fetching API configs: ", error);
      setApiConfigs([]);
    } finally {
      setApiConfigsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTemplates();
    fetchAllApiConfigs();
  }, []);

  useEffect(() => {
    if (!selectedTemplate) return;

    const initialProps: {
      [key: string]: { type: "static" | "dynamic"; value: any };
    } = {};
    const propSchema = selectedTemplate.addtionalUIJson?.props || {};

    Object.keys(propSchema).forEach((key) => {
      initialProps[key] = {
        type: "static",
        value: propSchema[key]?.default ?? "",
      };
    });

    setPropState(initialProps);
  }, [selectedTemplate]);

  const handlePropChange = (key: string, value: any) => {
    setPropState((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        value,
      },
    }));
  };

  const handlePropTypeChange = (key: string, type: "static" | "dynamic") => {
    setPropState((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        type,
      },
    }));
  };

  const onAddComponent = async () => {
    try {
      let payload: PageComponentConfig = {
        pageId: pageId,
        templateId: selectedTemplate?.id || "",
        apiConfigId: selectedApiConfig?.id,
        configJson: {
          props: propState,
        },
        positionJson: {},
        section: section,
        addtionalUIJson: {
        },
      };
      console.log("Payload for creating page component: ", payload);
      let resp = await pageComponentService.createPageComponent(payload);
      onClose();
    } catch (error) {
      console.error("Error adding component: ", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Component</DialogTitle>
      <DialogContent dividers>
        {templatesLoading || apiConfigsLoading ? (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: 120 }}
          >
            <Button disabled>
              <Typography variant="body2" sx={{ mr: 2 }}>
                Loading...
              </Typography>
              <CircularProgress size={24} />
            </Button>
          </Grid>
        ) : (
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                select
                label="Template"
                fullWidth
                value={selectedTemplate ? selectedTemplate.id : ""}
                onChange={(e) => {
                  const tpl = templates.find((t) => t.id == e.target.value);
                  setSelectedTemplate(tpl || null);
                }}
              >
                {templates.map((tpl) => (
                  <MenuItem key={tpl.id} value={tpl.id}>
                    {tpl.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={12}>
              <TextField
                select
                label="API Config"
                fullWidth
                value={selectedApiConfig ? selectedApiConfig.id : ""}
                onChange={(e) => {
                  const api = apiConfigs.find((a) => a.id == e.target.value);
                  setSelectedApiConfig(api || null);
                }}
              >
                {apiConfigs.map((api) => (
                  <MenuItem key={api.id} value={api.id}>
                    {api.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {selectedTemplate &&
              (() => {
                const propSchema =
                  selectedTemplate.addtionalUIJson?.props || {};
                return (
                  <>
                    <Grid size={12}>
                      <Divider />
                      <Typography variant="subtitle1" sx={{ mt: 1 }}>
                        Component Props
                      </Typography>
                    </Grid>

                    {Object.keys(propSchema).map((propKey) => {
                      const propDef = propSchema[propKey];
                      const propValue = propState[propKey]?.value;
                      const propType = propState[propKey]?.type || "static";

                      return (
                        <Grid
                          container
                          spacing={1}
                          alignItems="center"
                          key={propKey}
                          sx={{ mb: 1 }}
                        >
                          <Grid size={7}>
                            {propDef.type === "boolean" ? (
                              <FormControlLabel
                                control={
                                  <Switch
                                    checked={!!propValue}
                                    onChange={(e) =>
                                      handlePropChange(
                                        propKey,
                                        e.target.checked,
                                      )
                                    }
                                  />
                                }
                                label={propKey}
                              />
                            ) : (
                              <TextField
                                type={
                                  propDef.type === "number" ? "number" : "text"
                                }
                                label={propKey}
                                fullWidth
                                value={propValue ?? ""}
                                onChange={(e) =>
                                  handlePropChange(
                                    propKey,
                                    propDef.type === "number"
                                      ? Number(e.target.value)
                                      : e.target.value,
                                  )
                                }
                                helperText={
                                  propType === "dynamic" && selectedApiConfig
                                    ? "You may map this to API response key"
                                    : ""
                                }
                              />
                            )}
                          </Grid>
                          <Grid size={5}>
                            <TextField
                              select
                              label="Value Type"
                              size="small"
                              value={propType}
                              onChange={(e) =>
                                handlePropTypeChange(
                                  propKey,
                                  e.target.value as "static" | "dynamic",
                                )
                              }
                              sx={{ minWidth: 120 }}
                            >
                              <MenuItem value="static">Static</MenuItem>
                              <MenuItem
                                value="dynamic"
                                disabled={!selectedApiConfig}
                              >
                                Dynamic
                              </MenuItem>
                            </TextField>
                          </Grid>
                        </Grid>
                      );
                    })}
                  </>
                );
              })()}
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          disabled={!selectedTemplate}
          onClick={onAddComponent}
        >
          Add Component
        </Button>
      </DialogActions>
    </Dialog>
  );
};
