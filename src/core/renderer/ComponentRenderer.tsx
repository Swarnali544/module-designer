import React, { useState, useEffect, Suspense } from "react";
import ComponentTransformer from "../transformer/ComponentTransformer";

import TemplateService from "../../services/TemplateService";
const templateService = new TemplateService();

interface Props {
  componentSchema: any;
}

export const ComponentRenderer: React.FC<Props> = ({ componentSchema }) => {
  const [Component, setComponent] = useState<any>(null);
  const [props, setProps] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
        console.log("Loading component for schema:", componentSchema);
        if(!componentSchema) return;
      try {
        const template = componentSchema.template;

        if (!template) return;

        let componentName = template.label;
        console.log("Fetching template for component:", componentName);

        const componentModule = await import(
          `../../components/${componentName}`
        );

        console.log("Component module loaded:", componentModule);
        const LoadedComponent =
          componentModule.default || componentModule[componentName];

        setComponent(() => LoadedComponent);

        const builtProps =
          await ComponentTransformer.buildComponentProps(componentSchema);

        console.log("Built props for component:", builtProps);

        setProps(builtProps);
      } catch (err) {
        console.error("Error loading component:", err);
      }
    };
    load();
  }, [componentSchema]);

  if (!Component) return null;

  return (
    <Suspense fallback={<div>Loading component...</div>}>
      <Component {...props} />
    </Suspense>
  );
};
