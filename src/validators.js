// src/validators.js

/**
 * Validates Solana address format.
 * @param {string} address - The Solana address to validate.
 * @returns {boolean} - True if valid, false otherwise.
 */
function validateSolanaAddress(address) {
    const solanaAddressRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
    return solanaAddressRegex.test(address);
}

/**
 * Validates the amount for a Solana transaction.
 * @param {number} amount - The amount to validate.
 * @returns {boolean} - True if valid, false otherwise.
 */
function validateAmount(amount) {
    return amount > 0;
}

/**
 * Validates parameters for a Solana transaction.
 * @param {Object} params - The parameters to validate.
 * @returns {boolean} - True if all parameters are valid, false otherwise.
 */
function validateParameters(params) {
    // Assuming params include { address, amount }
    return validateSolanaAddress(params.address) && validateAmount(params.amount);
}

module.exports = {
    validateSolanaAddress,
    validateAmount,
    validateParameters,
};
