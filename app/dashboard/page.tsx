"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import RecentPitches from "@/components/RecentPitches";
import QuickAction from "@/components/QuickAction";
import { axiosInstance } from "@/lib/axios";

const Page = () => {
  const { user } = useUser();
  const username = user?.firstName || "Developer";
  const [summary, setSummary] = useState<{
    totalPitch: number;
    totalSlides: number;
    averageSlidesPerPitch: number;
  } | null>(null);

  useEffect(() => {
    const FetchSummary = async () => {
      try {
        const res = await axiosInstance.get("/summary");
        setSummary(res.data);
      } catch (e) {
        console.error("Failed to fetch summary", e);
      }
    };
    FetchSummary();
  }, []);

  const data = summary
    ? [
        { title: "Total Pitches", des: summary.totalPitch },
        { title: "Total Slides", des: summary.totalSlides },
        {
          title: "Avg Slides per Pitch",
          des: summary.averageSlidesPerPitch.toFixed(1),
        },
      ]
    : [];

  return (
    <main className="px-6 py-16 ">
      <section>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-center sm:text-left">
            Welcome back, {username}
          </h1>
        </div>

        {/* ✅ Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {summary === null
            ? [1, 2, 3].map((_, idx) => (
                <Card key={idx} className="shadow-md rounded-2xl p-4 space-y-4">
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-10 w-1/4" />
                </Card>
              ))
            : data.map((item, idx) => (
                <Card key={idx} className="shadow-md rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{item.des}</p>
                  </CardContent>
                </Card>
              ))}
        </div>
      </section>

      {/* ✅ Recent Activity */}
      <section className="mt-12">
        <h1 className="text-3xl font-bold">Recent Activity</h1>
        <RecentPitches />
      </section>

      {/* ✅ Quick Actions */}
      <section className="mt-12">
        <QuickAction />
      </section>
    </main>
  );
};

export default Page;
