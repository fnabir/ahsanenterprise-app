import { useEffect, useMemo, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getCurrentYear } from "../../utils";

export function useYear(validYears: number[]) {
  const router = useRouter();
  const params = useLocalSearchParams();

  const currentYear = useMemo(() => getCurrentYear(), []);
  const yearParam = params.year ? Number(params.year) : undefined;

  const [year, setYear] = useState<number>(currentYear);

  useEffect(() => {
    if (yearParam === undefined) {
      if (year !== currentYear) setYear(currentYear);
      return;
    }

    if (Number.isNaN(yearParam) || !validYears.includes(yearParam)) {
      if (year !== currentYear) setYear(currentYear);

      router.setParams({ year: undefined });
      return;
    }

    if (yearParam !== year) {
      setYear(yearParam);
    }
  }, [yearParam, validYears, currentYear, year]);

  const changeYear = (newYear: number) => {
    if (newYear === year || !validYears.includes(newYear)) return;

    setYear(newYear);
    router.setParams({ year: String(newYear) });
  };

  return { year, changeYear };
}
