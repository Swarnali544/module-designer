import React from "react";
import { MenuNode } from "../state/SchemaTypes";

interface Props {
    menu: MenuNode[];
    onPageSelect: (node: MenuNode) => void;
}

export const MenuRenderer: React.FC<Props> = ({menu,onPageSelect}) => {
    const handleMenuSelection = (node : MenuNode) => {
        if(node.children && node.children.length) return;
        else onPageSelect(node);   
    }
    const renderNode = (node : MenuNode) => {
        return (
            <div key={node.id} style={{paddingLeft: 20}}>
                <div style={{cursor : 'pointer'}} onClick={() => handleMenuSelection(node)}>
                    {node.label}
                </div>
                {node.children && node.children.map(child => renderNode(child))}
            </div>
        )
    }
    return <div>{menu.map(node => renderNode(node))}</div>
}
