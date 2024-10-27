"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ScanBarcode } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { XRPL_API_URL } from "@/constants/constants";
import axios from "axios";
import { AmendmentInfo } from "@/lib/interface";
import Link from "next/link";
// import Link from "next/link";

export default function AmendmentDetail() {
  const params = useParams<{ name: string }>();
  const [amendmentData, setAmendmentData] = useState<AmendmentInfo>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAmendmentInfo = async () => {
      try {
        const response = await axios.get(
          `https://api.xrpscan.com/api/v1/amendment/${params.name}`
        );
        const data = response.data;
        setAmendmentData(data);
      } catch (err) {
        setError("Failed to fetch amendments data");
        console.error("Error fetching amendments data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAmendmentInfo();
  }, []);

  return (
    <main className="container grow mx-auto px-3 py-4">
      <div className="bg-panel p-5 rounded-lg shadow mb-8">
        <div className="flex items-center text-lido gap-2">
          <ScanBarcode />
          <h3 className="flex items-center text-xl font-bold bg-panel backdrop-blur-sm">
            Amendment summary
          </h3>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center h-full text-gray-50">
            Loading...
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="w-full mx-auto mt-4 px-4 space-y-4 flex gap-20">
            <table className="text-gray-50">
              <thead>
                <tr>
                  <th className="p-3 text-left">Name:</th>
                  <th className="p-3 text-left">{amendmentData?.name}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className="p-3 text-left">Amendment ID:</th>
                  <th className="p-3 text-left">
                    {amendmentData?.amendment_id}
                  </th>
                </tr>
                <tr>
                  <th className="p-3 text-left">Introduced in:</th>
                  <th className="p-3 text-left">{amendmentData?.introduced}</th>
                </tr>
                <tr>
                  <th className="p-3 text-left">Threshold:</th>
                  <th className="p-3 text-left">
                    {amendmentData?.threshold}/{amendmentData?.validations}{" "}
                    votes
                  </th>
                </tr>
                <tr>
                  <th className="p-3 text-left">Details:</th>
                  <th className="p-3 text-left">
                    <Link
                      href={`https://xrpl.org/known-amendments.html#${amendmentData?.name.toLocaleLowerCase()}`}
                    >{`https://xrpl.org/known-amendments.html#${amendmentData?.name.toLocaleLowerCase()}`}</Link>
                  </th>
                </tr>
              </tbody>
            </table>
            <table className="text-gray-50 w-1/5">
              <thead>
                <tr>
                  <th className="p-3 text-left">Status:</th>
                  <th
                    className={`p-3 rounded-full text-xs ${
                      amendmentData?.enabled
                        ? "bg-green-500/20 text-green-400"
                        : "bg-rose-500/20 text-rose-400"
                    }`}
                  >
                    {amendmentData?.enabled ? "Enabled" : "Not enable"}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className="p-3 text-left">Yeas:</th>
                  <th className="p-3 text-left">{amendmentData?.count}</th>
                </tr>
                <tr>
                  <th className="p-3 text-left">Nays: </th>
                  <th className="p-3 text-left">
                    {amendmentData?.validations && amendmentData.count
                      ? amendmentData?.validations - amendmentData?.count
                      : ""}
                  </th>
                </tr>
                <tr
                  className={`${
                    amendmentData?.threshold &&
                    amendmentData.count &&
                    amendmentData.count >= amendmentData.threshold
                      ? "bg-green-500/20 text-green-400"
                      : "bg-rose-500/20 text-rose-400"
                  }`}
                >
                  <th className="rounded-l-lg p-3 text-left">Consensus:</th>
                  <th className="rounded-r-lg p-3 text-left">
                    {amendmentData?.validations &&
                      amendmentData.count &&
                      (
                        (amendmentData.count / amendmentData.validations) *
                        100
                      ).toFixed(2)}
                    %
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}

{
  /* <div className="w-full flex justify-between gap-4">
<div className="space-y-4">
  <div className="flex gap-4">
    <p className="text-sm text-gray-400">Name:</p>
    <p className="font-semibold text-blue-400">{amendment.name}</p>
  </div>
  <div>
    <p className="text-sm text-gray-400">Amendment ID:</p>
    <p className="font-mono text-xs break-all">
      {amendment.amendment_id}
    </p>
  </div>
  <div>
    <p className="text-sm text-gray-400">Introduced in:</p>
    <p>{amendment.introduced}</p>
  </div>
  <div>
    <p className="text-sm text-gray-400">Threshold:</p>
    <p>{amendment.threshold}</p>
  </div>
  <div>
    <p className="text-sm text-gray-400">Details:</p>
    {/* <Link
      href={amendment.details}
      className="text-blue-400 hover:underline break-all"
    >
      {amendment.details}
    </Link> 
  </div>
</div>
<div className="space-y-4">
  <div>
    <p className="text-sm text-gray-400">Status</p>
    <Badge variant="destructive" className="mt-1">
      {amendment.enabled}
    </Badge>
  </div>
  <div>
    <p className="text-sm text-gray-400">Yeas:</p>
    <p>29</p>
  </div>
  <div>
    <p className="text-sm text-gray-400">Nays:</p>
    <p>6</p>
  </div>
  <div>
    <p className="text-sm text-gray-400">ETA:</p>
    <p>{amendment.enabled_on}</p>
  </div>
  <div className="bg-green-900 p-2 rounded">
    <p className="text-sm text-gray-300">Consensus:</p>
    <p className="text-lg font-bold text-green-400">
      {amendment.count / amendment.validations}
    </p>
  </div>
</div>
</div> */
}
