import { CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"

interface Amendment {
    amendment_id: string
    introduced: string
    name: string
    enabled: boolean
    majority: number | null
    supported: boolean
    count: number
    threshold: number
    validations: number
    enabled_on?: string
    tx_hash?: string
  }

  const amendments = [
    {
      "amendment_id": "96FD2F293A519AE1DB6F8BED23E4AD9119342DA7CB6BAFD00953D16C54205D8B",
      "introduced": "2.2.0",
      "name": "PriceOracle",
      "enabled": false,
      "majority": 782628630,
      "supported": true,
      "count": 29,
      "threshold": 28,
      "validations": 35
    },
    {
      "amendment_id": "2BF037D90E1B676B17592A8AF55E88DB465398B4B597AE46EECEE1399AB05699",
      "introduced": "2.2.0",
      "name": "fixXChainRewardRounding",
      "enabled": false,
      "majority": null,
      "supported": true,
      "count": 22,
      "threshold": 28,
      "validations": 35
    },
    {
      "amendment_id": "755C971C29971C9F20C6F080F2ED96F87884E40AD19554A5EBECDCEC8A1F77FE",
      "introduced": "2.2.0",
      "name": "fixEmptyDID",
      "enabled": true,
      "majority": 779561310,
      "supported": true,
      "count": 31,
      "threshold": 28,
      "validations": 35,
      "enabled_on": "2024-09-27T16:58:32.000Z",
      "tx_hash": "A858AE8832981D77A4C5038D633CC9CBD54C9764BD2A3F8CA174E02D1736F472"
    },
    {
      "amendment_id": "7BB62DC13EC72B775091E9C71BF8CF97E122647693B50C5E87A80DFD6FCFAC50",
      "introduced": "2.2.0",
      "name": "fixPreviousTxnID",
      "enabled": true,
      "majority": 779561310,
      "supported": true,
      "count": 31,
      "threshold": 28,
      "validations": 35,
      "enabled_on": "2024-09-27T16:58:32.000Z",
      "tx_hash": "C7A9804E1F499ABBF38D791BAD25B1479DB1CEA4E9B6C5C08D6D4EF13F41E171"
    },
    {
      "amendment_id": "35291ADD2D79EB6991343BDA0912269C817D0F094B02226C1C14AD2858962ED4",
      "introduced": "2.2.0",
      "name": "fixAMMv1_1",
      "enabled": true,
      "majority": 779285280,
      "supported": true,
      "count": 32,
      "threshold": 28,
      "validations": 35,
      "enabled_on": "2024-09-24T12:18:31.000Z",
      "tx_hash": "8C8F5566464097BF1BAF7C645BB9E1762986844A052BBA3B9769F6564EEFAB71"
    },]

export default function TransactionPage() {
    return <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
    <h1 className="text-3xl font-bold mb-6">Amendments Overview</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {amendments.map((amendment) => (
        <Card key={amendment.amendment_id} className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{amendment.name}</span>
              {amendment.enabled ? (
                <CheckCircle className="text-green-500" />
              ) : amendment.supported ? (
                <AlertCircle className="text-yellow-500" />
              ) : (
                <XCircle className="text-red-500" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">ID:</span>{" "}
                <span className="text-sm">{`${amendment.amendment_id.slice(0, 8)}...`}</span>
              </p>
              <p>
                <span className="font-semibold">Introduced:</span> {amendment.introduced}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                <Badge
                  variant={amendment.enabled ? "default" : amendment.supported ? "secondary" : "destructive"}
                >
                  {amendment.enabled ? "Enabled" : amendment.supported ? "Supported" : "Not Supported"}
                </Badge>
              </p>
              <p>
                <span className="font-semibold">Support:</span>{" "}
                {amendment.count}/{amendment.validations} ({((amendment.count / amendment.validations) * 100).toFixed(2)}%)
              </p>
              <p>
                <span className="font-semibold">Threshold:</span> {amendment.threshold}
              </p>
              {amendment.enabled_on && (
                <p>
                  <span className="font-semibold">Enabled on:</span>{" "}
                  {new Date(amendment.enabled_on).toLocaleDateString()}
                </p>
              )}
              {amendment.tx_hash && (
                <p>
                  <span className="font-semibold">TX Hash:</span>{" "}
                  <span className="text-sm">{`${amendment.tx_hash.slice(0, 8)}...`}</span>
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
}