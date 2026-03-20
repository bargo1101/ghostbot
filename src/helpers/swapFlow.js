// src/helpers/swapFlow.js

/**
 * Fetch quote with retry logic
 * @param {string} fromToken - Token to swap from
 * @param {string} toToken - Token to swap to
 * @param {number} amount - Amount to swap
 * @param {number} retries - Number of retries
 * @returns {Promise<Object>} - Quote data
 */
async function fetchQuoteWithRetry(fromToken, toToken, amount, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(`https://api.jupiter.com/quote?from=${fromToken}&to=${toToken}&amount=${amount}`);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            if (i === retries - 1) throw error; // Rethrow error if out of retries
        }
    }
}

/**
 * Build swap transaction
 * @param {Object} quote - Quote data
 * @returns {Object} - Transaction data
 */
function buildSwapTransaction(quote) {
    return {
        from: quote.from,
        to: quote.to,
        amount: quote.amount,
        slippage: 1,
        // Add other transaction parameters
    };
}

/**
 * Execute swap transaction
 * @param {Object} transaction - The transaction to execute
 * @param {string} wallet - User's wallet address
 * @returns {Promise<Object>} - Transaction result
 */
async function executeSwap(transaction, wallet) {
    const response = await fetch(`https://api.jupiter.com/swap`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({...transaction, wallet}),
    });
    if (!response.ok) throw new Error('Swap execution failed');
    return await response.json();
}

/**
 * Execute buy transaction
 * @param {string} fromToken - Token to swap from
 * @param {string} toToken - Token to swap to
 * @param {number} amount - Amount to buy
 * @param {string} wallet - User's wallet address
 * @returns {Promise<Object>} - Transaction result
 */
async function executeBuy(fromToken, toToken, amount, wallet) {
    const quote = await fetchQuoteWithRetry(fromToken, toToken, amount);
    const transaction = buildSwapTransaction(quote);
    return await executeSwap(transaction, wallet);
}

/**
 * Execute sell transaction
 * @param {string} fromToken - Token to swap from
 * @param {string} toToken - Token to swap to
 * @param {number} amount - Amount to sell
 * @param {string} wallet - User's wallet address
 * @returns {Promise<Object>} - Transaction result
 */
async function executeSell(fromToken, toToken, amount, wallet) {
    const quote = await fetchQuoteWithRetry(fromToken, toToken, amount);
    const transaction = buildSwapTransaction(quote);
    return await executeSwap(transaction, wallet);
}

export { fetchQuoteWithRetry, buildSwapTransaction, executeSwap, executeBuy, executeSell };