import React from 'react';

const ScrapedData = ({scrapedText, sentiment, screenshot}) => {

    const onSubmitDownloadFile = async (event) => {
        event.preventDefault();

        const element = document.createElement("a");
        const file = new Blob([scrapedText],
            {type: 'text/plain;charset=utf-8'});
        element.href = URL.createObjectURL(file);
        element.download = "scrapedContent.json";
        document.body.appendChild(element);
        element.click();
    }

    return (
        <div
            className="m-10 block max-w-4xl p-6 bg-gray-800 border border-gray-200 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center justify-center">
                <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
                    Scraped Data and Sentiment Analysis
                </h2>
                <div className="mb-4 bg-gray-100 p-4 rounded dark:bg-gray-700">
                    <div className="text-gray-800 dark:text-white">
                        {scrapedText || 'No data scraped yet.'}
                    </div>
                </div>

                {
                    screenshot ?
                        <div>
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
                                Screenshot of Scraped Website
                            </h2>
                            <img className="h-auto max-w-lg rounded-lg" src={`data:image/jpeg;base64,${screenshot}`}
                                 alt="screenshot"/>
                        </div>
                        : ''
                }

                <div className="flex items-center">
                    <span className="mr-2 text-lg font-medium text-gray-900 dark:text-white">
                        Overall Sentiment:
                    </span>
                    <span
                        className={`text-lg font-semibold ${sentiment === 'positive' ? 'text-green-500' : sentiment === 'negative' ? 'text-red-500' : 'text-gray-500'}`}>
                        {sentiment || 'Unknown'}
                    </span>
                </div>
                <button
                    type="button"
                    onClick={onSubmitDownloadFile}
                    className="m-4 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-normal rounded-lg text-2xl px-7 py-2 text-center"
                >
                    Download Scraped Text
                </button>
            </div>
        </div>
    );
};

export default ScrapedData;
