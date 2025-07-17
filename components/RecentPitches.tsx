"use client";

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

const RecentPitches = () => {
  const dummy = [
    { title: "Tech Startup", created: "2024-01-15" },
    { title: "Real Estate", created: "2024-01-20" },
    { title: "Marketing Campaign", created: "2024-01-25" },
  ];

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
            {dummy.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>{item.title}</TableCell>
                <TableCell>
                  {new Date(item.created).toLocaleDateString()}
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
