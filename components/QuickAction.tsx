"use client";

import { useRouter } from "next/navigation";
import { Plus, LayoutTemplate, Settings } from "lucide-react";

const QuickAction = () => {
  const router = useRouter();

  const actions = [
    {
      title: "Generate New Pitch",
      description: "Start from scratch with AI",
      icon: Plus,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      onClick: () => router.push("/create"),
      primary: true,
    },
    {
      title: "Browse Templates",
      description: "View custom themes (Coming Soon)",
      icon: LayoutTemplate,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      onClick: () => {},
      primary: false,
    },
    {
      title: "Settings",
      description: "Manage your account & billing",
      icon: Settings,
      color: "text-neutral-400",
      bg: "bg-neutral-500/10",
      onClick: () => {}, // Link to your Clerk profile or settings page later
      primary: false,
    },
  ];

  return (
    <div className="p-4 sm:p-6 w-full h-full">
      <div className="flex flex-col gap-3">
        {actions.map((action, i) => {
          const Icon = action.icon;
          return (
            <button
              key={i}
              onClick={action.onClick}
              disabled={!action.primary}
              className={`group flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-200 ${
                action.primary
                  ? "bg-neutral-900 border-neutral-700 hover:border-purple-500/50 hover:bg-neutral-800 cursor-pointer shadow-md"
                  : "bg-neutral-900/50 border-neutral-800/50 opacity-70 cursor-not-allowed"
              }`}
            >
              <div
                className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${action.bg} ${action.color} group-hover:scale-110 transition-transform`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h4
                  className={`text-sm font-semibold mb-0.5 ${action.primary ? "text-white" : "text-neutral-300"}`}
                >
                  {action.title}
                </h4>
                <p className="text-xs text-neutral-500">{action.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickAction;
