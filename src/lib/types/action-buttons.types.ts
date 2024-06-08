export interface ActionButton {
	iconClass: string;
	activeIconClass: string;
	activeIconColorClass: string;
	hoverIconColorClass: string;
	isHovering: boolean;
	isActive: boolean;
	tooltipText: string;
	onClick: (actionIndex: number) => void;
}
