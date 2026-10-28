import { Calculator, SelfChecks } from "./calculator";
import { Section } from "./section";

export function CalculatorSection() {
  return (
    <Section
      id="calculator"
      eyebrow="Check the maths yourself"
      title="Budget calculator"
      description="A small tool for the sums that come up when reading official budget documents. Every answer shows its inputs, formula and working, so you can redo it by hand or in a spreadsheet."
    >
      <Calculator />
      <SelfChecks />
    </Section>
  );
}
