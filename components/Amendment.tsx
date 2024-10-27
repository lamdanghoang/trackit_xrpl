import { AlertCircle, CheckCircle2, Copy, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

type Props = {
  info: {
    amendment_id: string;
    introduced: string;
    name: string;
    enabled: boolean;
    majority: number | null;
    supported: boolean;
    count: number;
    threshold: number;
    validations: number;
    enabled_on?: string;
    tx_hash?: string;
  };
};

const shortenHash = (hash: any) => {
  if (!hash) return "";
  return `${hash.slice(0, 5)}...${hash.slice(-5)}`;
};

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const Amendment: React.FC<Props> = ({ info }) => {
  const votingPercentage = (info.count / info.validations) * 100;

  const copyToClipboard = (text: any) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="p-4 mt-2 ml-1 mr-2 mb-4 max-w-2xl bg-item hover:bg-gray-700 transition-colors rounded-lg text-gray-50 border-bordercolor border">
      <Link href={`amendment/${info.amendment_id}`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-blue-400">
              {info.name.length > 20
                ? `${info.name.slice(0, 20) + "..."}`
                : info.name}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span
              className={`px-3 py-1 rounded-full text-xs ${
                info.enabled
                  ? "bg-green-500/20 text-green-400"
                  : "bg-amber-500/20 text-amber-400"
              }`}
            >
              {info.enabled ? "Enabled" : "Not enabled"}
            </span>
          </div>
        </div>

        <div className="space-y-3 text-sm text-slate-300">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Amendment ID:</span>
            <div className="flex items-center space-x-2">
              <span className="font-mono">
                {shortenHash(info.amendment_id)}
              </span>
              <button
                onClick={() => copyToClipboard(info.amendment_id)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-400">Introduced:</span>
            <span>Version {info.introduced}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-400">Support:</span>
            <span>
              {info.count}/{info.validations} validators (
              {votingPercentage.toFixed(2)}%)
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-400">Threshold:</span>
            <span>{info.threshold} validators required</span>
          </div>

          {info.enabled && info.enabled_on && (
            <>
              <div className="flex justify-between">
                <span className="text-slate-400">Enabled on:</span>
                <span>{formatDate(info.enabled_on)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Transaction:</span>
                <div className="flex items-center space-x-2">
                  <span className="font-mono">{shortenHash(info.tx_hash)}</span>
                  <button
                    onClick={() => copyToClipboard(info.tx_hash)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-400">Progress</span>
            <span className="text-slate-400">
              {info.count}/{info.validations}
            </span>
          </div>
          <div className="bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ease-out ${
                info.count >= info.threshold ? "bg-green-500" : "bg-blue-500"
              }`}
              style={{ width: `${votingPercentage}%` }}
            />
          </div>
          <div className="relative h-2">
            <div
              className="absolute top-0 w-px h-3 bg-amber-500"
              style={{ left: `${(info.threshold / info.validations) * 100}%` }}
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Amendment;
