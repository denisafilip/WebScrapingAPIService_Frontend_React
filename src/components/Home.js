import React, {Fragment, useState} from 'react';
import ScraperInputs from "./ScraperInputs";
import ScrapedData from "./ScrapedData";
import BlogPostWordCount from "./BlogPostWordCount";

const Home = () => {
    const [scrapedText, setScrapedText] = useState('');
    const [sentiment, setSentiment] = useState('');
    const [wordCountData, setWordCountData] = useState({});
    const [scrapedDataScreenshot, setScrapedDataScreenshot] = useState('');

    const handleScrapedDataText = (text) => {
        setScrapedText(text);
    };

    const handleScrapedDataSentiment = (sentimentValue) => {
        setSentiment(sentimentValue);
    }

    const handleWordCountData = (wordCountData) => {
        setWordCountData(wordCountData);
    }

    const handleScrapedDataScreenshot = (screenshot) => {
        setScrapedDataScreenshot(screenshot);
    }


    return (
        <Fragment>

            <div className="flex flex-col items-center justify-center">
                <h1 className="m-6 mb-4 text-4xl font-extrabold text-black dark:text-black md:text-5xl lg:text-9xl">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                        Web {` `}
                    </span>
                    Scraper
                </h1>
                <p className="m-6 text-lg font-semibold text-black lg:text-2xl dark:text-black">
                    Visualise the data from any website by providing the URL and the HTML elements you want to see
                </p>

                <div className="flex flex-col md:flex-row items-start justify-center">
                    <ScraperInputs onScrapedDataText={handleScrapedDataText}
                                   onScrapedDataSentiment={handleScrapedDataSentiment}
                                   onWordCountData={handleWordCountData}
                                   onScrapedDataScreenshot={handleScrapedDataScreenshot}/>
                    <div className="flex flex-col">
                        <ScrapedData scrapedText={scrapedText} sentiment={sentiment}
                                     screenshot={scrapedDataScreenshot}/>
                        <BlogPostWordCount scrapedText={wordCountData.text} wordCount={wordCountData.wordCount}/>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default Home;