import React, { useState } from "react";
import { SplitLayout } from "../../layouts/SplitLayout";
import { EmptyLayout } from "../../layouts/EmptyLayout";
import { PageSchema } from "../state/SchemaTypes";

import { AddPageComponentDialog } from "../../designer/page-component-registry/AddPageComponent";
import { ComponentRenderer } from "./ComponentRenderer";

import { Button } from "@mui/material";

interface Props {
  schema: PageSchema;
  editMode: boolean;
  pageId: string | null;
}

export const LayoutRenderer = ({ schema, editMode, pageId }: Props) => {
  if (!schema) return null;

  const [addPageComponentDialogOpened, setAddPageComponentDialogOpen] =
    useState(false);

  const [section, setSelectedSection] = useState("");

  const onAddComponent = (sectionName: string) => {
    setSelectedSection(sectionName);
    setAddPageComponentDialogOpen(true);
  };

  const renderAddComponentBox = (sectionName: string) => {
    return editMode ? (
      <div>
        {schema.layoutJson[sectionName] &&
          schema.layoutJson[sectionName].length > 0 &&
          schema.layoutJson[sectionName].map(
            (section: string, index: number) => (
              <ComponentRenderer
                key={index}
                componentSchema={
                  schema.layoutJson[sectionName]
                    ? schema.layoutJson[sectionName][index]
                    : null
                }
              />
            ),
          )}
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
          <Button
            variant="outlined"
            onClick={() => onAddComponent(sectionName)}
          >
            + Add Component
          </Button>
        </div>
      </div>
    ) : null;
  };

  return (
    <>
      {schema.layoutJson.type === "split" ? (
        <SplitLayout
          left={renderAddComponentBox("left")}
          right={renderAddComponentBox("right")}
        />
      ) : (
        <EmptyLayout>{renderAddComponentBox("main")}</EmptyLayout>
      )}
      {addPageComponentDialogOpened && (
        <AddPageComponentDialog
          open={addPageComponentDialogOpened}
          onClose={() => setAddPageComponentDialogOpen(false)}
          pageId={pageId}
          section={section}
        />
      )}
    </>
  );
};
