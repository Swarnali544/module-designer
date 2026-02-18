import React from "react";
import { LayoutRenderer } from "./LayoutRenderer";
import { PageSchema } from "../state/SchemaTypes";

interface Props {
    schema : PageSchema;
    editMode : boolean;
}

export const PageRenderer = ({ schema, editMode }: Props) => {
    console.log(schema)
    return <LayoutRenderer schema={schema} editMode={editMode} />;
}