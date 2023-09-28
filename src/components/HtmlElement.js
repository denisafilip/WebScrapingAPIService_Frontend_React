import React, {Fragment} from 'react';

const HtmlElement = ({keyName, value, onHtmlElementChange}) => {

    const handleCheckboxChange = (event) => {
        onHtmlElementChange(value, event.target.checked);
    };

    return (
        <Fragment>
            <li key={keyName} className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center pl-3">
                    <input
                        id={value}
                        type="checkbox"
                        value={value}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                    <label htmlFor={value}
                           className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{value}</label>
                </div>
            </li>
        </Fragment>
    );
}

export default HtmlElement;