"use client";

import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import GetSubmissions from "../services/apis/GetSubmissions";
import Loading from "../components/shared/Loading";

export default function SubmissionsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["submissions"],
    queryFn: GetSubmissions,
  });

  if (isLoading) return <Loading className="h-screen" />;

  const columns = data.columns.map((col: string) => ({
    title: col,
    dataIndex: col,
    key: col,
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Submitted Applications</h1>
      <Table columns={columns} dataSource={data.data} rowKey="id" />
    </div>
  );
}
