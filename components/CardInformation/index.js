import React from "react";

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
}) => {
  if (!data || typeof data !== "object") {
    throw new Error(
      'Missing or invalid "data" prop in CardInformation component.'
    );
  }

  return (
    <div>
      <div className="bg-secondary p-4 h-[356px]">
        <div className="flex justify-between">
          <div>
            <h2 className="font-bold mb-2">{title}</h2>
            <h1 className="text-xl mb-2">{subTitle}</h1>
          </div>

          {showEditButton && (
            <div>
              <button className="py-2 px-4 bg-primary rounded-md text-white text-sm">
                Edit Supplier
              </button>
            </div>
          )}
        </div>

        <div className="px-6">
          {column?.map((e) => (
            <div className="flex" key={e.key}>
              <p className="min-w-[40%]">{e.title}</p>
              <p>: {data[e.key] != "" ? data[e.key] : "-"}</p>
            </div>
          ))}
        </div>

        {title2 ? (
          <div className="mt-6">
            <h2 className="font-bold mb-2">{title2}</h2>
            <h1 className="text-xl mb-2">{subTitle2}</h1>

            {data2 && (
              <div className="px-6">
                {column2?.map((e) => (
                  <div className="flex" key={e.key}>
                    <p className="min-w-[40%]">{e.title}</p>
                    <p>: {data2[e.key] != "" ? data2[e.key] : "-"}</p>
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
