import React from "react";
import { LayoutRenderer } from "./LayoutRenderer";
import { PageSchema } from "../state/SchemaTypes";

interface Props {
    schema : PageSchema;
    editMode : boolean;
    pageId : string | null;
}

export const PageRenderer = ({ schema, editMode, pageId }: Props) => {
    return <LayoutRenderer schema={schema} editMode={editMode} pageId={pageId}/>;
}