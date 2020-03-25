
export interface BaseTableRowAction {
    text?: string;
    tooltip?: string;
    icon?: string;
    type: string;
}

export interface TableRowAction extends BaseTableRowAction {
    display: 'icon' | 'primary' | 'basic';
}

export interface TableRowMenu extends TableRowAction {
    items: BaseTableRowAction[];
}

export interface TableRowCounter {
    initialValue: number;
    min: number;
    max: number;
}
