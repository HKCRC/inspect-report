export default function PhysicalInfo() {
  return (
    <div>
      <div className="container flex flex-row justify-between gap-4 px-8">
        <div className="flex flex-col mr-16">
          <p className="text-lg font-bold">
            Other Physical <br />
            Parameters
          </p>
          <span className="w-20 h-1.5 mt-1 bg-[#0052D9] "></span>

          <div className="flex flex-col gap-2 mt-8">
            <div className="flex flex-row items-center">
              <span className="w-2.5 h-2.5 bg-[#0052D9]"></span>
              <p className="text-xs font-normal ml-1">Excellent Class</p>
            </div>

            <div className="flex flex-row items-center">
              <span className="w-2.5 h-2.5 bg-[#FFB362]"></span>
              <p className="text-xs font-normal ml-1">Good Class</p>
            </div>

            <div className="flex flex-row items-center">
              <span className="w-2.5 h-2.5 bg-[#FC9090]"></span>
              <p className="text-xs font-normal ml-1">Exceeding Class</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 flex-1 sm:group-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-5">
          <div className="flex flex-col border-1 border-[#000000] rounded-xl p-4 ">
            <p className="text-md font-blob">Lux</p>

            <div className="flex flex-row justify-center my-5 items-center">
              <span className="text-[#7DB1FF] text-[44px] font-bold">
                1000
                <i className="text-sm not-italic text-[#000000] font-normal ml-1">
                  (Avg)
                </i>
              </span>
            </div>
          </div>

          <div className="flex flex-col border-1 border-[#000000] rounded-xl p-4">
            <p className="text-md font-blob">Lux</p>

            <div className="flex flex-row justify-center my-5 items-center">
              <span className="text-[#7DB1FF] text-[44px] font-bold">
                1000
                <i className="text-sm not-italic text-[#000000] font-normal ml-1">
                  (Avg)
                </i>
              </span>
            </div>
          </div>

          <div className="flex flex-col border-1 border-[#000000] rounded-xl p-4">
            <p className="text-md font-blob">Lux</p>

            <div className="flex flex-row justify-center my-5 items-center">
              <span className="text-[#7DB1FF] text-[44px] font-bold">
                1000
                <i className="text-sm not-italic text-[#000000] font-normal ml-1">
                  (Avg)
                </i>
              </span>
            </div>
          </div>

          <div className="flex flex-col border-1 border-[#000000] rounded-xl p-4">
            <p className="text-md font-blob">Lux</p>

            <div className="flex flex-row justify-center my-5 items-center">
              <span className="text-[#7DB1FF] text-[44px] font-bold">
                1000
                <i className="text-sm not-italic text-[#000000] font-normal ml-1">
                  (Avg)
                </i>
              </span>
            </div>
          </div>

          <div className="flex flex-col border-1 border-[#000000] rounded-xl p-4">
            <p className="text-md font-blob">Lux</p>

            <div className="flex flex-row justify-center my-5 items-center">
              <span className="text-[#7DB1FF] text-[44px] font-bold">
                1000
                <i className="text-sm not-italic text-[#000000] font-normal ml-1">
                  (Avg)
                </i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
