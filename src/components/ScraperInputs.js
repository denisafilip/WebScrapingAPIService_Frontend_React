import React, {Fragment, useState} from 'react';
import HtmlElement from "./HtmlElement";
import ScraperService from "../services/ScraperService";

const HTML_ELEMENTS = [
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'p',
    'a',
    'img',
    'div',
    'span',
    'ul',
    'ol',
    'li',
    'table',
    'tr',
    'td',
    'th',
    'form',
    'input',
    'button',
    'textarea',
    'select',
    'option',
    'label',
]

const ScraperInputs = ({onScrapedDataText, onScrapedDataSentiment, onWordCountData, onScrapedDataScreenshot}) => {
    const [url, setUrl] = useState('');
    const [blogUrl, setBlogUrl] = useState('');
    const [htmlElements, setHtmlElements] = useState([]);
    const [scrapedText, setScrapedText] = useState('');
    const [includeScreenshot, setIncludeScreenshot] = useState(false);

    const onUrlChange = (event) => {
        setUrl(event.target.value);
    }

    const onBlogUrlChange = (event) => {
        setBlogUrl(event.target.value);
    }

    const handleCheckboxChange = (event) => {
        setIncludeScreenshot(event.target.checked);
    };


    const handleHtmlElementChange = (value, isChecked) => {
        setHtmlElements(prevElements => {
            if (isChecked) {
                return [...prevElements, value];
            } else {
                return prevElements.filter(element => element !== value);
            }
        });
        console.log(htmlElements);
    }

    const onSubmitScrape = (event) => {
        event.preventDefault();

        ScraperService
            .scrapeWebsite(url, htmlElements, includeScreenshot)
            .then(data => {
                if (data.error) {
                    alert('Error: ' + data.error.message);
                    setUrl('');
                    return;
                }
                if (data.text) {
                    setScrapedText(JSON.stringify(data.text));
                    onScrapedDataText(JSON.stringify(data.text));
                }
                if (data.screenshot) {
                    onScrapedDataScreenshot(data.screenshot);
                } else {
                    onScrapedDataScreenshot('');
                }
            });
    }

    const onSubmitSentiment = (event) => {
        event.preventDefault();

        ScraperService
            .getSentiment(scrapedText)
            .then(sentimentData => {
                if (sentimentData.error) {
                    alert('Error: ' + sentimentData.error.message);
                    return;
                }
                onScrapedDataSentiment(sentimentData.sentiment);
            });
    }

    const onSubmitBlogWordCount = (event) => {
        event.preventDefault();
        ScraperService
            .getBlogPostWordCount(blogUrl)
            .then(wordCountData => {
                if (wordCountData.error) {
                    alert('Error: ' + wordCountData.error.message);
                    return;
                }
                onWordCountData(wordCountData);
            });
    }

    return (
        <Fragment>
            <div
                className="m-10 block max-w-4xl p-6 bg-gray-800 border border-gray-200 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="flex flex-col items-center justify-center">
                    <div className="mb-6">
                        <label htmlFor="default-input"
                               className="block mb-2 text-lg font-medium text-white dark:text-white">
                            Enter the URL of the website you want to scrape:
                        </label>
                        <input
                            type="text"
                            id="url"
                            value={url}
                            onChange={onUrlChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    </div>

                    <div className="flex items-center pl-4 m-3 border border-gray-200 rounded dark:border-gray-700">
                        <input
                            id="bordered-checkbox-1"
                            type="checkbox"
                            checked={includeScreenshot}
                            name="bordered-checkbox"
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                            htmlFor="bordered-checkbox-1"
                            className="w-full py-4 px-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Want screenshot of scraped website?
                        </label>
                    </div>


                    <h3 className="mb-4 text-lg font-medium text-white dark:text-white">What HTML elements do you wish
                        to scrape?</h3>
                    <ul className="w-1/2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        {
                            HTML_ELEMENTS.map((value, index) => {
                                return <HtmlElement keyName={index} value={value}
                                                    onHtmlElementChange={handleHtmlElementChange}/>
                            })
                        }
                    </ul>
                    <button
                        type="button"
                        onClick={onSubmitScrape}
                        className="m-4 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-normal rounded-lg text-2xl px-28 py-2 text-center"
                    >
                        Scrape
                    </button>
                    <button
                        type="button"
                        onClick={onSubmitSentiment}
                        className="m-4 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-normal rounded-lg text-2xl px-7 py-2 text-center"
                    >
                        Get Sentiment Analysis
                    </button>
                    <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"/>
                    <div className="mb-6">
                        <label htmlFor="blog" className="block mb-2 text-lg font-medium text-white dark:text-white">Enter
                            the URL of the blog post you want to count the words of:</label>
                        <input
                            type="text"
                            id="blogUrl"
                            value={blogUrl}
                            onChange={onBlogUrlChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    </div>
                    <button
                        type="button"
                        onClick={onSubmitBlogWordCount}
                        className="m-4 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-normal rounded-lg text-2xl px-7 py-2 text-center"
                    >
                        Get Word Count
                    </button>
                </div>
            </div>
        </Fragment>
    )
}

export default ScraperInputs;