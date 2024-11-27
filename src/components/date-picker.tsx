"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import { type DateRange } from "react-day-picker";

export function DatePicker() {
  const [selectedDates, setSelectedDates] = useState<DateRange | undefined>(
    undefined
  );

  useEffect(() => {
    console.log(
      "date",
      `From ${selectedDates?.from?.toLocaleDateString()} to
              ${selectedDates?.to?.toLocaleDateString()}`
    );
  }, [selectedDates]);

  return (
    <SidebarGroup className="px-0">
      <SidebarGroupContent>
        <Calendar
          mode="range"
          max={4}
          selected={selectedDates}
          onSelect={setSelectedDates}
          footer={
            selectedDates &&
            `From ${selectedDates?.from?.toLocaleDateString()} to
              ${selectedDates?.to?.toLocaleDateString()}`
          }
        />
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
