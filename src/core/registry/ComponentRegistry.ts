import CardWrapper from "../../components/CardWrapper";
import ListWrapper from "../../components/ListWrapper";

/**
 * Each component must describe:
 * - label (display name)
 * - component (actual React component)
 * - props schema (for auto form generation)
 */
type ComponentMeta = {
  label: string;
  component: React.ComponentType<any>;
  props: Record<string, any>;
};

class ComponentRegistry {
    // TODO : NEED TO IMPLEMENT TWO METHODS TO DYNAMICALLY GET THE COMPONENT NAMES AND ITS PROPS 
  private components: Record<string, ComponentMeta> = {
    CardWrapper: {
      label: "CardWrapper",
      component: CardWrapper,
      props: {
        title: "",
        subtitle: "",
        content: "",
      },
    },

    ListWrapper: {
      label: "ListWrapper",
      component: ListWrapper,
      props: {
        header: "",
        items: [],
      },
    },
  };

  getComponentList() {
    return Object.keys(this.components).map((key) => ({
      name: key,
      label: this.components[key].label,
    }));
  }

  getComponentProps(name: string) {
    return this.components[name]?.props || {};
  }

  getComponent(name: string) {
    return this.components[name]?.component || null;
  }
}

export default new ComponentRegistry();
