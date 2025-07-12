"use client";

import { useUser } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const page = () => {
  const { user } = useUser();
  const username = user?.firstName || "Developer";

  const data = [
    { title: "Total Pitch", des: "25" },
    { title: "Total Slides", des: "156" },
    { title: "Total Views", des: "3245" },
    { title: "Total Slides", des: "Project phoneix" },
  ];

  return (
    <main className="px-26 py-16">
      <section>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-center sm:text-left">
            Welcome back, {username}
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4">
          {data.map((item, idx) => (
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
      <section>
        <div className="mt-40">
          <h1 className="text-3xl font-bold">Recent Activity</h1>
        </div>
      </section>
    </main>
  );
};

export default page;
