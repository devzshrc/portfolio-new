"use client";

import { useEffect, useState } from "react";

interface RealTimeAgeProps {
  birthDate: Date;
}

function getBirthdayForYear(birthDate: Date, year: number) {
  return new Date(
    year,
    birthDate.getMonth(),
    birthDate.getDate(),
    birthDate.getHours(),
    birthDate.getMinutes(),
    birthDate.getSeconds(),
    birthDate.getMilliseconds()
  );
}

export function RealTimeAge({ birthDate }: RealTimeAgeProps) {
  const [orbit, setOrbit] = useState({
    completedYears: 0,
    currentYearProgress: "0.00000",
  });

  useEffect(() => {
    const updateOrbit = () => {
      const now = new Date();
      const currentYearBirthday = getBirthdayForYear(
        birthDate,
        now.getFullYear()
      );
      const lastBirthday =
        now >= currentYearBirthday
          ? currentYearBirthday
          : getBirthdayForYear(birthDate, now.getFullYear() - 1);
      const nextBirthday = getBirthdayForYear(
        birthDate,
        lastBirthday.getFullYear() + 1
      );

      const completedYears =
        lastBirthday.getFullYear() - birthDate.getFullYear();
      const currentYearProgress =
        ((now.getTime() - lastBirthday.getTime()) /
          (nextBirthday.getTime() - lastBirthday.getTime())) *
        100;

      setOrbit({
        completedYears,
        currentYearProgress: currentYearProgress.toFixed(5),
      });
    };

    updateOrbit();
    const intervalId = window.setInterval(updateOrbit, 100);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [birthDate]);

  return (
    <span>
      lap <span className="tabular-nums">{orbit.completedYears}</span> around
      the sun ·{" "}
      <span className="tabular-nums">{orbit.currentYearProgress}%</span> through
      this one
    </span>
  );
}
