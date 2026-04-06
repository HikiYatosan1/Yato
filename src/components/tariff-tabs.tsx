import { useSearchParams } from "react-router-dom";
import type { Tariff, TariffCategory } from "@/types/content";
import { tariffCategoryLabels } from "@/data/tariffs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TariffCard } from "@/components/tariff-card";

type TariffTabsProps = {
  tariffs: Tariff[];
  defaultCategory?: TariffCategory;
  maxItems?: number;
  showMoreLink?: boolean;
  categories?: TariffCategory[];
  labels?: Partial<Record<TariffCategory, string>>;
};

const categoryOrder: TariffCategory[] = ["house", "xpon", "ftth", "bundle"];

export function TariffTabs({
  tariffs,
  defaultCategory = "house",
  maxItems,
  showMoreLink,
  categories = categoryOrder,
  labels,
}: TariffTabsProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromQuery = searchParams.get("tab") as TariffCategory | null;
  const activeTab = tabFromQuery && categories.includes(tabFromQuery) ? tabFromQuery : defaultCategory;

  const getItems = (category: TariffCategory) => {
    const items = tariffs.filter((tariff) => tariff.category === category);
    return maxItems ? items.slice(0, maxItems) : items;
  };

  return (
    <Tabs
      className="w-full"
      value={activeTab}
      onValueChange={(value) => {
        const next = new URLSearchParams(searchParams);
        next.set("tab", value);
        setSearchParams(next, { replace: true });
      }}
    >
      <TabsList>
        {categories.map((category) => (
          <TabsTrigger key={category} value={category}>
            {labels?.[category] ?? tariffCategoryLabels[category]}
          </TabsTrigger>
        ))}
      </TabsList>

      {categories.map((category) => (
        <TabsContent key={category} value={category}>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {getItems(category).map((tariff) => (
              <TariffCard key={tariff.id} tariff={tariff} />
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
