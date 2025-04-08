import React from "react";

// Indoor Air Quality data for the first table
const iaqData = [
  {
    measurement: "Carbon Dioxide (ppmv)",
    excellentClass: "800",
    goodClass: "1000",
    parameter: "502",
    qualified: "Excellent",
  },
  {
    measurement: "Carbon Monoxide (ppmv)",
    excellentClass: "1.7",
    goodClass: "6.1",
    parameter: "1",
    qualified: "Excellent",
  },
  {
    measurement: "Respirable Suspended Particulates PM10 (ng/m³)",
    excellentClass: "20",
    goodClass: "100",
    parameter: "6",
    qualified: "Excellent",
  },
  {
    measurement: "Ozone (ppbv)",
    excellentClass: "25",
    goodClass: "61",
    parameter: "26",
    qualified: "Excellent",
  },
  {
    measurement: "Total Volatile Organic Compounds (ppbv)",
    excellentClass: "87",
    goodClass: "261",
    parameter: "20",
    qualified: "Excellent",
  },
  {
    measurement: "Radon (Bq/m³)",
    excellentClass: "150",
    goodClass: "167",
    parameter: "49",
    qualified: "Excellent",
  },
  {
    measurement: "Nitrogen Dioxide (ppbv)",
    excellentClass: "21",
    goodClass: "80",
    parameter: "60",
    qualified: "Good",
  },
  {
    measurement: "Nitrogen Dioxide (ppbv) [1-hour]",
    excellentClass: "53",
    goodClass: "106",
    parameter: "107",
    qualified: "Exceed",
  },
  {
    measurement: "Formaldehyde (ppbv)",
    excellentClass: "24",
    goodClass: "81",
    parameter: "30",
    qualified: "Good",
  },
  {
    measurement: "Formaldehyde (ppbv) [30-minute]",
    excellentClass: "57",
    goodClass: "81",
    parameter: "56",
    qualified: "Excellent",
  },
  {
    measurement: "Airborne Bacteria (CFU/m³)",
    excellentClass: "500",
    goodClass: "1000",
    parameter: "64",
    qualified: "Excellent",
  },
];

// Environmental data for the second table
const environmentalData = [
  {
    mission: "Lux",
    excellentClass: "300 ≤ Avg ≤ 500",
    goodClass: "200 ≤ Avg < 300 or 500 < Avg ≤800",
    parameter: "600",
    qualified: "Good",
  },
  {
    mission: "Noise",
    excellentClass: "dB ≤ 35",
    goodClass: "35 < dB ≤ 45",
    parameter: "30",
    qualified: "Excellent",
  },
  {
    mission: "Temperature",
    excellentClass: "20 ≤ °C ≤ 23",
    goodClass: "19 ≤ °C <20 or 23 < °C ≤ 24",
    parameter: "22",
    qualified: "Excellent",
  },
  {
    mission: "R. Humidity",
    excellentClass: "40 ≤ % ≤ 60",
    goodClass: "30 ≤% < 40 or 60 <% ≤ 70",
    parameter: "50",
    qualified: "Excellent",
  },
  {
    mission: "Air Flow",
    excellentClass: "0.08 ≤ m/s ≤ 0.10",
    goodClass: "0. 05≤m/s < 0.08 or 0.10 <m/s ≤ 0.15",
    parameter: "0.09",
    qualified: "Excellent",
  },
];

const DataTable = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1200px] mx-auto py-8">
        <div>
          <div
            id="printableTable"
            className="w-full min-w-[1035px] px-14 py-6 text-gray-800"
          >
            <div className="flex flex-col mb-6">
              <span className="w-10 h-1 bg-[#0052D9] mb-2"></span>
              <h1 className="font-medium text-2xl">Section Detail</h1>
            </div>

            <div className="my-8">
              <h2 className="text-left font-medium text-lg mb-4">Point 1</h2>

              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border border-gray-300 bg-gray-100 p-3 text-left font-medium">
                      Inspect Mission
                    </th>
                    <th className="border border-gray-300 bg-gray-100 p-3 text-left font-medium">
                      Measurement Items
                    </th>
                    <th className="border border-gray-300 bg-gray-100 p-3 text-center font-medium">
                      Excellent Class
                    </th>
                    <th className="border border-gray-300 bg-gray-100 p-3 text-center font-medium">
                      Good Class
                    </th>
                    <th className="border border-gray-300 bg-gray-100 p-3 text-center font-medium">
                      Parameter
                    </th>
                    <th className="border border-gray-300 bg-gray-100 p-3 text-center font-medium">
                      Qualified
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {iaqData.map((item, index) => (
                    <React.Fragment key={index}>
                      {index === 0 && (
                        <tr>
                          <td
                            rowSpan={11}
                            className="border border-gray-300 p-3 text-center font-medium align-middle"
                          >
                            IAQ
                          </td>
                          <td className="border border-gray-300 p-3">
                            {item.measurement}
                          </td>
                          <td className="border border-gray-300 p-3 text-center">
                            {item.excellentClass}
                          </td>
                          <td className="border border-gray-300 p-3 text-center">
                            {item.goodClass}
                          </td>
                          <td className="border border-gray-300 p-3 text-center">
                            {item.parameter}
                          </td>
                          <td className="border border-gray-300 p-3 text-center">
                            {item.qualified}
                          </td>
                        </tr>
                      )}
                      {index > 0 && (
                        <tr>
                          <td className="border border-gray-300 p-3">
                            {item.measurement}
                          </td>
                          <td className="border border-gray-300 p-3 text-center">
                            {item.excellentClass}
                          </td>
                          <td className="border border-gray-300 p-3 text-center">
                            {item.goodClass}
                          </td>
                          <td className="border border-gray-300 p-3 text-center">
                            {item.parameter}
                          </td>
                          <td className="border border-gray-300 p-3 text-center">
                            {item.qualified}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="my-12">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border border-gray-300 bg-gray-100 p-3 text-left font-medium">
                      Inspect Mission
                    </th>
                    <th className="border border-gray-300 bg-gray-100 p-3 text-center font-medium">
                      Excellent Class
                    </th>
                    <th className="border border-gray-300 bg-gray-100 p-3 text-center font-medium">
                      Good Class
                    </th>
                    <th className="border border-gray-300 bg-gray-100 p-3 text-center font-medium">
                      Parameter
                    </th>
                    <th className="border border-gray-300 bg-gray-100 p-3 text-center font-medium">
                      Qualified
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {environmentalData.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-3 font-medium">
                        {item.mission}
                      </td>
                      <td className="border border-gray-300 p-3 text-center">
                        {item.excellentClass}
                      </td>
                      <td className="border border-gray-300 p-3 text-center">
                        {item.goodClass}
                      </td>
                      <td className="border border-gray-300 p-3 text-center">
                        {item.parameter}
                      </td>
                      <td className="border border-gray-300 p-3 text-center">
                        {item.qualified}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
