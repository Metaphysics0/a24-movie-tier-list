export interface ActionButton {
	iconClass: string;
	activeIconClass: string;
	activeIconColorClass: string;
	isHovering: boolean;
	isActive: boolean;
	tooltipText: string;
	onClick: (e: Event, idx: number) => void;
}
