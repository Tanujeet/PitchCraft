"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { axiosInstance } from "@/lib/axios";

interface Pitch {
  title: string;
  createdAt: string;
}

const RecentPitches = () => {
  const [pitches, setPitches] = useState<Pitch[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPitches = async () => {
      try {
        const res = await axiosInstance.get("/recent-pitches");
        setPitches(res.data);
      } catch (e) {
        console.error("Failed to fetch recent pitches", e);
      } finally {
        setLoading(false);
      }
    };
    fetchPitches();
  }, []);

  return (
    <Card className="mt-2">
      <CardHeader>
        <CardTitle>🕓 Recently Created Pitches</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pitch Title</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className="h-4 w-32" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-24" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="h-8 w-20 inline-block mr-2" />
                      <Skeleton className="h-8 w-20 inline-block" />
                    </TableCell>
                  </TableRow>
                ))
              : pitches?.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="default" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentPitches;
