export default function DataTable2() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1200px] mx-auto py-8">
        <div className="py-10">
          <div
            id="printableTable"
            className="w-full min-w-[1035px] px-14 py-6 text-gray-800"
          >
            <h1 className="text-4xl font-medium">
              2F -Parking Area <br /> Environment Repot
            </h1>

            <div className="my-10 bg-[#D8D8D8] h-1"></div>

            <table className="w-full border-collapse mb-20">
              <thead>
                <tr>
                  <th className="border border-[#666666] bg-[#D8D8D8] p-3  font-medium text-center">
                    Inspection Point
                  </th>
                  <th className="border border-[#666666]  p-3 text-left font-thin">
                    2025-02-22
                  </th>
                  <th className="border border-[#666666] bg-[#D8D8D8] p-3  font-medium text-center">
                    Report Date
                  </th>
                  <th className="border border-[#666666] p-3 text-left font-thin">
                    2025-02-23
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className="border border-[#666666] bg-[#D8D8D8] p-3  font-medium text-center">
                    Location
                  </th>
                  <th className="border border-[#666666] p-3 text-left font-thin">
                    2F, Chaiwan Office Building
                  </th>
                  <th className="border border-[#666666] bg-[#D8D8D8] p-3  font-medium text-center">
                    Inspector
                  </th>
                  <th className="border border-[#666666]  p-3 text-left font-thin">
                    ASD Robot
                  </th>
                </tr>
              </tbody>
            </table>

            <div className="flex flex-col mb-6">
              <span className="w-10 h-1 bg-[#0052D9] mb-2"></span>
              <h1 className="font-bold text-2xl">Pt.1 Overall Information</h1>
            </div>

            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-[#666666] bg-[#D8D8D8] p-3  font-medium text-center">
                    Inspection Point
                  </th>
                  <th className="border border-[#666666] bg-[#D8D8D8] p-3  font-medium text-center">
                    Inspection Mission Type
                  </th>
                  <th className="border border-[#666666] bg-[#D8D8D8] p-3  font-medium text-center">
                    Location of Inspection Points
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    rowSpan={6}
                    className="border border-[#666666] p-6 text-center font-medium align-middle text-lg"
                  >
                    Point 2
                  </td>
                  <td className="border border-[#666666] p-3 text-center">
                    IAQ
                  </td>
                  <td
                    rowSpan={6}
                    className="border border-[#666666] p-3 text-center"
                  >
                    <img
                      src="/lovable-uploads/4676769a-8ad2-4694-836d-bafa20240e81.png"
                      alt="Floor plan showing inspection point 2"
                      className="max-w-[300px] mx-auto"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-[#666666] p-3 text-center">
                    Lux
                  </td>
                </tr>
                <tr>
                  <td className="border border-[#666666] p-3 text-center">
                    Noise
                  </td>
                </tr>
                <tr>
                  <td className="border border-[#666666] p-3 text-center">
                    Temperature
                  </td>
                </tr>
                <tr>
                  <td className="border border-[#666666] p-3 text-center">
                    R. Humidity
                  </td>
                </tr>
                <tr>
                  <td className="border border-[#666666] p-3 text-center">
                    Air Flow
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={3}
                    className="border border-[#666666] bg-[#D8D8D8] p-3 text-center font-medium"
                  >
                    Field Photo
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} className="border border-[#666666] p-3">
                    <div className="flex justify-center gap-4">
                      <img
                        src="https://via.placeholder.com/350x200?text=Field+Photo+1"
                        alt="Field photo 1"
                        className="max-w-[350px]"
                      />
                      <img
                        src="https://via.placeholder.com/350x200?text=Field+Photo+2"
                        alt="Field photo 2"
                        className="max-w-[350px]"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
