import AppIcon from "@/components/AppIcon/AppIcon";
import type { NameIcon } from "@/types";

export interface TabItem {
  id: string;
  label: string;
  icon?: NameIcon;
  count?: number;
}

interface AppTabProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export function AppTab({
  tabs,
  activeTab,
  onChange,
  className = "",
}: AppTabProps) {
  return (
    <div className={`flex w-full border-b border-border bg-card ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`relative flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-semibold transition-colors cursor-pointer ${
              isActive ? "text-text" : "text-text-secondary hover:text-text"
            }`}
          >
            {tab.icon && (
              <AppIcon
                nameIcon={tab.icon}
                size={16}
                isFilled={isActive && tab.icon === "Heart"}
                className={isActive ? "text-text" : "text-text-secondary"}
              />
            )}
            <span>{tab.label}</span>
            {typeof tab.count === "number" && (
              <span className="text-xs text-text-tertiary">({tab.count})</span>
            )}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-text" />
            )}
          </button>
        );
      })}
    </div>
  );
}

export default AppTab;
