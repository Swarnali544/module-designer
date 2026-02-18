import React from "react";
import { SplitLayout } from "../../layouts/SplitLayout";
import { EmptyLayout } from "../../layouts/EmptyLayout";
import { PageSchema } from "../state/SchemaTypes";

import {
  Button,
} from "@mui/material";

interface Props {
    schema : PageSchema;
    editMode : boolean;
}

export const LayoutRenderer = ({ schema, editMode }: Props) => {
  if (!schema) return null;

  const renderAddComponentBox = (sectionName: string) => {
    return editMode ? (
      <div
        style={{
          border: "1px dashed #bbb",
          padding: "20px",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}      
      >
        <Button variant="outlined" onClick={() => console.log("Add component to", sectionName)}>+ Add Component</Button>
      </div>
    ) : null;
  };

  if(schema.layoutJson.type == "split") {
    return (
        <SplitLayout left={renderAddComponentBox("left")} right={renderAddComponentBox("right")} />
    )
  }
  else if(schema.layoutJson.type == "empty") {
    return (
      <EmptyLayout>
        {renderAddComponentBox("main")}
      </EmptyLayout>
    )
  }
};
