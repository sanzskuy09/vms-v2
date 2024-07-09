import React from "react";

import dayjs from "dayjs";

const CardInformation = ({
  title,
  subTitle,
  column,
  data,
  title2,
  subTitle2,
  column2,
  data2,
  showEditButton = false,
  showEditInvButton = false,
  styleWrapper,
  editSuppButtonAction,
  editInvButtonAction,
  openModal = false,
}) => {
  if (!data || typeof data !== "object") {
    throw new Error(
      'Missing or invalid "data" prop in CardInformation component.'
    );
  }

  function formatIndonesianDate(dateString) {
    const formattedDate = dayjs(dateString)
      .subtract(1, "day")
      .format("DD-MM-YYYY");
    const [day, month, year] = formattedDate.split("-");

    const date = new Date(year, month - 1, day);

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return new Intl.DateTimeFormat("id-ID", options).format(date);
  }

  return (
    <div>
      <div
        className={`bg-secondary p-4 min-h-min ${
          styleWrapper ? styleWrapper : "h-[364px]"
        }`}
      >
        <div className="flex justify-between">
          <div>
            <h2 className="font-bold mb-2">{title}</h2>
            <h1 className="text-xl mb-2">{subTitle}</h1>
          </div>

          {showEditButton && (
            <div>
              <button
                onClick={editSuppButtonAction}
                className="py-2 px-4 bg-primary rounded-md text-white text-sm"
              >
                Edit Supplier
              </button>
            </div>
          )}

          {showEditInvButton && (
            <div>
              <button
                onClick={editInvButtonAction}
                className="py-2 px-4 bg-primary rounded-md text-white text-sm"
              >
                Edit Invoice
              </button>
            </div>
          )}
        </div>

        <div className="px-6">
          {column?.map((e) => (
            <div className="flex" key={e.key}>
              <p className="min-w-[50%]">{e.title}</p>
              <p>
                :{" "}
                {e.object
                  ? data[e.object] && data[e.object][e.key] !== ""
                    ? e.dataIndex === "date"
                      ? formatIndonesianDate(data[e.object][e.key])
                      : data[e.object][e.key]
                    : "-"
                  : data[e.key] !== ""
                  ? e.dataIndex === "date"
                    ? formatIndonesianDate(data[e.key])
                    : data[e.key]
                  : "-"}
              </p>
            </div>
          ))}
        </div>
        {/* <div className="px-6">
          {column?.map((e) => (
            <div className="flex" key={e.key}>
              <p className="min-w-[40%]">{e.title}</p>
              <p>
                :{" "}
                {data[e.key] != ""
                  ? e.dataIndex === "date"
                    ? formatIndonesianDate(data[e.key])
                    : data[e.key]
                  : "-"}
              </p>
            </div>
          ))}
        </div> */}

        {title2 ? (
          <div className="mt-6">
            <h2 className="font-bold mb-2">{title2}</h2>
            <h1 className="text-xl mb-2">{subTitle2}</h1>

            {data2 && (
              <div className="px-6">
                {column2?.map((e) => (
                  <div className="flex" key={e.key}>
                    <p className="min-w-[40%]">{e.title}</p>
                    <p>
                      :{" "}
                      {data2[e.key] != ""
                        ? e.dataIndex === "date"
                          ? formatIndonesianDate(data[e.key])
                          : data[e.key]
                        : "-"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default CardInformation;
