import { cn } from "@/lib/cn";

export function ProjectFilters({
  categories,
  active,
  onChange,
}: {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
      {categories.map((category) => {
        const isActive = category === active;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            aria-pressed={isActive}
            className={cn(
              "rounded-soft border px-3 py-1.5 text-meta transition-colors duration-200",
              isActive
                ? "border-accent bg-accent-soft text-ink"
                : "border-line text-muted hover:border-accent hover:text-ink",
            )}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
