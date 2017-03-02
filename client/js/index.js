import { foo } from './test';
import Message from 'component/message-new';
// import Message from 'component/message-old';
import React from 'react';
import { render } from 'react-dom';
import 'sass/index'; // Import CSS


/*
    Ensure polyfills only load on older browsers
 */
// Covers all IE versions and Safari < 11
const browserSupportsAllFeatures = window.Promise && window.fetch;

if (browserSupportsAllFeatures) {
    initialise();
} else {
    // See 'Code Splitting' documentation for Webpack (https://webpack.js.org/guides/code-splitting-require/#dependencies)
    require.ensure([], function() {
        require('./polyfills.js');
        initialise();
    });
}


/*
    Main function
 */
function initialise() {
    console.debug('Test', foo());
    console.warn('Fill in the index.js file'); // eslint-disable-line

    render((
        <div>
            <Message />
        </div>
    ), document.getElementById('root'));
}
