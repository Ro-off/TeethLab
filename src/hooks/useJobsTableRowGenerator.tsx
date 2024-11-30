export function useTableDataGenerator() {
  function generateJobsTableRows(rawDataArr: Array<any>) {
    console.log(rawDataArr);
    const elemDataArr = rawDataArr.map((row) => ({
      ...row,
      price: (
        <div>
          <p className="">{row.priceUah}$</p>
          <p className="text-gray-700">{row.priceUsd}₴</p>
        </div>
      ),
      clientPatient: (
        <>
          <div>
            <p className="">{row.client}</p>
            <p className="text-gray-700">{row.patient}</p>
          </div>
        </>
      ),
    }));
    return elemDataArr;
  }

  return { generateJobsTableRows };
}
