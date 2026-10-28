import { CalculatorSection } from "@/components/calculator-section";
import { DepartmentExplorer } from "@/components/department-explorer";
import { Evolution } from "@/components/evolution";
import { HeadlineMetrics } from "@/components/headline-metrics";
import { Methodology } from "@/components/methodology";
import { Overview } from "@/components/overview";
import { ReportingPeriod } from "@/components/reporting-period";
import { Section } from "@/components/section";
import { SpendingChartPlaceholder } from "@/components/spending-chart-placeholder";
import { Vision } from "@/components/vision";
import { WorkLog } from "@/components/work-log";

export default function Home() {
  return (
    <>
      <Overview />
      <ReportingPeriod />
      <Section
        id="spending"
        eyebrow="Spending at a glance"
        title="Headline measures"
        description="These will show the latest verified figures for the selected reporting period, each with its source. They stay empty until then."
      >
        <HeadlineMetrics />
        <SpendingChartPlaceholder />
      </Section>
      <DepartmentExplorer />
      <CalculatorSection />
      <Methodology />
      <Vision />
      <Evolution />
      <WorkLog />
    </>
  );
}
