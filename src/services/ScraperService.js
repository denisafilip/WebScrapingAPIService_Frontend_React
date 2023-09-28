const API_URL = 'http://localhost:8080/';

class ScraperService {
    scrapeWebsite = (url, htmlElements, includeScreenshot) => {
        const apiUrl = new URL(API_URL + 'scrape');
        apiUrl.search = new URLSearchParams({
            url: url,
            extractRules: htmlElements.join(','),
            screenshot: includeScreenshot,
        });
        return fetch(apiUrl.toString())
            .then(response => response.json())
            .catch(console.log);
    }

    getBlogPostWordCount = (url) => {
        const apiUrl = new URL(API_URL + 'count');
        apiUrl.search = new URLSearchParams({
            url: url,
        });
        console.log(apiUrl.toString());
        return fetch(apiUrl.toString())
            .then(response => response.json())
            .catch(console.log);
    }

    getSentiment = (text) => {
        return fetch(API_URL + 'sentiment', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                text: text,
            })
        })
            .then(response => response.json())
            .catch(console.log);
    }
}

export default new ScraperService();